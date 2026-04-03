import { randomBytes } from 'node:crypto'

import config from '../config.js'
import { sendRegistrationEmail } from '../services/mailer.js'
import { hashPassword, needsPasswordRehash, verifyPassword } from '../utils/crypto.js'
import publicUserFields from './public-user-fields.js'
import User from './user-schema.js'

const emailRegex = /^(?:[^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*|".+")@(?:\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]|(?:[a-z\-0-9]+\.)+[a-z]{2,})$/i
const passwordMinLength = 12
const lowercaseRegex = /[a-z]/
const uppercaseRegex = /[A-Z]/
const digitRegex = /\d/
const specialCharacterRegex = /[^a-z0-9]/i

function getPasswordValidationError(password) {
  if (typeof password !== 'string' || password.length < passwordMinLength) {
    return `Le mot de passe doit contenir au moins ${passwordMinLength} caracteres`
  }

  if (!lowercaseRegex.test(password)) {
    return 'Le mot de passe doit contenir au moins une minuscule'
  }

  if (!uppercaseRegex.test(password)) {
    return 'Le mot de passe doit contenir au moins une majuscule'
  }

  if (!digitRegex.test(password)) {
    return 'Le mot de passe doit contenir au moins un chiffre'
  }

  if (!specialCharacterRegex.test(password)) {
    return 'Le mot de passe doit contenir au moins un caractere special'
  }

  return null
}

function buildVerificationUrl(validationToken) {
  return `${config.frontBaseUrl}/verify-email?token=${validationToken}`
}

function withVerificationDebugData(payload, validationToken) {
  if (config.env === 'production') {
    return payload
  }

  return {
    ...payload,
    verificationToken: validationToken,
    verificationUrl: buildVerificationUrl(validationToken),
  }
}

async function sendVerificationEmail(app, email, validationToken) {
  const verificationUrl = buildVerificationUrl(validationToken)
  const emailInfo = await sendRegistrationEmail({
    email,
    verificationUrl,
  })

  app.log.info({
    msg: 'Registration email sent',
    email,
    messageId: emailInfo.messageId,
  })
}

async function getPublicUser(userId) {
  return User.findById(userId)
    .select(publicUserFields)
    .lean()
}

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
function authRoutes(app) {
  app.post('/register', async (request, reply) => {
    const { email, password, username } = request.body

    if (!email || !password || !username) {
      return reply.status(400).send({ error: 'Email, password et username requis' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedUsername = username.trim()

    if (!emailRegex.test(normalizedEmail)) {
      return reply.status(400).send({ error: 'Email invalide' })
    }

    if (normalizedUsername.length < 3) {
      return reply.status(400).send({ error: 'Le username doit contenir au moins 3 caracteres' })
    }

    const passwordValidationError = getPasswordValidationError(password)

    if (passwordValidationError) {
      return reply.status(400).send({ error: passwordValidationError })
    }

    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { username: normalizedUsername },
      ],
    }).lean()

    if (existingUser?.email === normalizedEmail) {
      return reply.status(409).send({ error: 'Cet email est deja utilise' })
    }

    if (existingUser?.username === normalizedUsername) {
      return reply.status(409).send({ error: 'Ce username est deja utilise' })
    }

    const passwordHash = await hashPassword(password)
    const validationToken = randomBytes(32).toString('hex')

    const user = await User.create({
      email: normalizedEmail,
      username: normalizedUsername,
      passwordHash,
      validationToken,
    })

    try {
      await sendVerificationEmail(app, normalizedEmail, validationToken)
    } catch (error) {
      app.log.error({
        err: error,
        email: normalizedEmail,
      }, 'Failed to send registration email')

      return reply.status(503).send(withVerificationDebugData({
        error: 'Compte cree, mais l email de validation n a pas pu etre envoye. Reessayez plus tard.',
        email: user.email,
      }, validationToken))
    }

    return reply.status(201).send(withVerificationDebugData({
      message: 'Utilisateur cree avec succes. Verifiez votre email pour confirmer votre compte.',
      email: user.email,
    }, validationToken))
  })

  app.post('/resend-verification-email', async (request, reply) => {
    const { email } = request.body

    if (!email) {
      return reply.status(400).send({ error: 'Email requis' })
    }

    const normalizedEmail = email.trim().toLowerCase()

    if (!emailRegex.test(normalizedEmail)) {
      return reply.status(400).send({ error: 'Email invalide' })
    }

    const user = await User.findOne({ email: normalizedEmail })
      .select('+validationToken')

    if (!user) {
      return reply.status(404).send({ error: 'Utilisateur introuvable' })
    }

    if (user.emailVerified) {
      return reply.status(409).send({ error: 'Adresse email deja validee' })
    }

    if (!user.validationToken) {
      user.validationToken = randomBytes(32).toString('hex')
      await user.save()
    }

    try {
      await sendVerificationEmail(app, user.email, user.validationToken)
    } catch (error) {
      app.log.error({
        err: error,
        email: user.email,
      }, 'Failed to resend registration email')

      return reply.status(503).send(withVerificationDebugData({
        error: 'L email de validation n a pas pu etre envoye. Reessayez plus tard.',
      }, user.validationToken))
    }

    return reply.send(withVerificationDebugData({
      message: 'Email de validation renvoye avec succes.',
      email: user.email,
    }, user.validationToken))
  })

  app.post('/login', async (request, reply) => {
    const { email, password } = request.body

    if (!email || !password) {
      return reply.status(400).send({ error: 'Email et mot de passe requis' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: normalizedEmail })
      .select('+passwordHash')

    if (!user) {
      return reply.status(401).send({ error: 'Identifiants invalides' })
    }

    const passwordMatches = await verifyPassword(password, user.passwordHash)

    if (!passwordMatches) {
      return reply.status(401).send({ error: 'Identifiants invalides' })
    }

    if (needsPasswordRehash(user.passwordHash)) {
      user.passwordHash = await hashPassword(password)
      await user.save()
    }

    if (!user.emailVerified) {
      return reply.status(403).send({
        error: 'Veuillez valider votre adresse email avant de vous connecter',
      })
    }

    const token = await reply.jwtSign({
      sub: user._id.toString(),
      email: user.email,
      username: user.username,
    }, {
      expiresIn: '300s',
    })

    reply.setCookie(config.jwt.cookieName, token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: config.env === 'production',
    })

    const publicUser = await getPublicUser(user._id)

    return reply.send({
      message: 'Authentification reussie',
      user: publicUser,
    })
  })

  app.get('/session', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    return reply.send({ user: request.currentUser })
  })

  app.post('/logout', async (_request, reply) => {
    reply.clearCookie(config.jwt.cookieName, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: config.env === 'production',
    })

    return reply.send({ message: 'Deconnexion reussie' })
  })
}

export default authRoutes
