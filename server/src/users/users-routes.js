import publicUserFields from './public-user-fields.js'
import User from './user-schema.js'

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
function usersRoutes(app) {
  app.get('/verify-email', async (request, reply) => {
    const { token } = request.query

    if (!token || typeof token !== 'string') {
      return reply.status(400).send({ error: 'Token de validation requis' })
    }

    const user = await User.findOne({ validationToken: token })
      .select('+validationToken')

    if (!user) {
      return reply.status(404).send({ error: 'Token de validation invalide ou expire' })
    }

    if (user.emailVerified) {
      return reply.status(409).send({ error: 'Adresse email deja validee' })
    }

    user.emailVerified = true
    user.validationToken = null
    await user.save()

    return reply.send({
      message: 'Adresse email validee avec succes',
      email: user.email,
    })
  })

  app.get('/me', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    return reply.send({ user: request.currentUser })
  })

  app.get('', {
    onRequest: [app.authenticate, app.authorizeAdmin],
  }, async (_request, reply) => {
    const users = await User.find({})
      .select(publicUserFields)
      .sort({ createdAt: -1 })
      .lean()

    return reply.send({ users })
  })

  app.get('/:id', {
    onRequest: [app.authenticate, app.authorizeAdmin],
  }, async (request, reply) => {
    const { id } = request.params
    const user = await User.findById(id)
      .select(publicUserFields)
      .lean()

    if (!user) {
      return reply.status(404).send({ error: 'Utilisateur introuvable' })
    }

    return reply.send({ user })
  })

  app.delete('/:id', {
    onRequest: [app.authenticate, app.authorizeAdmin],
  }, async (request, reply) => {
    const { id } = request.params
    const deletedUser = await User.findByIdAndDelete(id)
      .select(publicUserFields)
      .lean()

    if (!deletedUser) {
      return reply.status(404).send({ error: 'Utilisateur introuvable' })
    }

    return reply.send({
      message: 'Utilisateur supprime',
      user: deletedUser,
    })
  })
}

export default usersRoutes
