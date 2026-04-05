import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fp from 'fastify-plugin'

import config from '../config.js'
import publicUserFields from '../users/public-user-fields.js'
import User from '../users/user-schema.js'

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
async function authPlugin(app) {
  await app.register(fastifyCookie)
  await app.register(fastifyJwt, {
    secret: config.jwt.secret,
    cookie: {
      cookieName: config.jwt.cookieName,
      signed: false,
    },
  })

  app.decorateRequest('currentUser', null)

  app.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true })
    } catch {
      return reply.status(401).send({ error: 'Authentification requise' })
    }

    const user = await User.findById(request.user.sub)
      .select(publicUserFields)
      .lean()

    if (!user) {
      return reply.status(401).send({ error: 'Utilisateur introuvable' })
    }

    request.currentUser = user
  })

  app.decorate('authorizeAdmin', async (request, reply) => {
    if ((request.currentUser?.role ?? 'student') !== 'admin') {
      return reply.status(403).send({ error: 'Acces reserve aux administrateurs' })
    }
  })
}

export default fp(authPlugin)
