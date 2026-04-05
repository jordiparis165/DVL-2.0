import {
  createAdminResource,
  getAdminViewData,
  getAnnouncementDetailData,
  getAnnouncementsViewData,
  getAssignmentDetailData,
  getAssignmentsViewData,
  getCalendarEntryDetailData,
  getCalendarViewData,
  getCourseDetailData,
  getCoursesViewData,
  getDashboardOverview,
  getGradeDetailData,
  getGradesViewData,
  getMessageDetailData,
  getMessagesViewData,
  getProfileViewData,
  updateAdminResource,
} from './dashboard-service.js'

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
function dashboardRoutes(app) {
  app.get('/overview', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const overview = await getDashboardOverview(request.currentUser)
    return reply.send(overview)
  })

  app.get('/courses', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getCoursesViewData(request.currentUser)
    return reply.send(payload)
  })

  app.get('/courses/:code', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getCourseDetailData(request.currentUser, request.params.code)

    if (!payload) {
      return reply.status(404).send({ error: 'Cours introuvable' })
    }

    return reply.send(payload)
  })

  app.get('/calendar', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getCalendarViewData(request.currentUser)
    return reply.send(payload)
  })

  app.get('/calendar/:key', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getCalendarEntryDetailData(request.currentUser, request.params.key)

    if (!payload) {
      return reply.status(404).send({ error: 'Entree calendrier introuvable' })
    }

    return reply.send(payload)
  })

  app.get('/messages', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getMessagesViewData(request.currentUser)
    return reply.send(payload)
  })

  app.get('/messages/:slug', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getMessageDetailData(request.currentUser, request.params.slug)

    if (!payload) {
      return reply.status(404).send({ error: 'Message introuvable' })
    }

    return reply.send(payload)
  })

  app.get('/announcements', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getAnnouncementsViewData(request.currentUser)
    return reply.send(payload)
  })

  app.get('/assignments', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getAssignmentsViewData(request.currentUser)
    return reply.send(payload)
  })

  app.get('/assignments/:slug', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getAssignmentDetailData(request.currentUser, request.params.slug)

    if (!payload) {
      return reply.status(404).send({ error: 'Devoir introuvable' })
    }

    return reply.send(payload)
  })

  app.get('/grades', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getGradesViewData(request.currentUser)
    return reply.send(payload)
  })

  app.get('/grades/:courseCode', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getGradeDetailData(request.currentUser, request.params.courseCode)

    if (!payload) {
      return reply.status(404).send({ error: 'Notes du cours introuvables' })
    }

    return reply.send(payload)
  })

  app.get('/announcements/:slug', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getAnnouncementDetailData(request.currentUser, request.params.slug)

    if (!payload) {
      return reply.status(404).send({ error: 'Annonce introuvable' })
    }

    return reply.send(payload)
  })

  app.get('/profile', {
    onRequest: [app.authenticate],
  }, async (request, reply) => {
    const payload = await getProfileViewData(request.currentUser)
    return reply.send(payload)
  })

  app.get('/admin', {
    onRequest: [app.authenticate, app.authorizeAdmin],
  }, async (request, reply) => {
    const payload = await getAdminViewData(request.currentUser)
    return reply.send(payload)
  })

  app.post('/admin/:resource', {
    onRequest: [app.authenticate, app.authorizeAdmin],
  }, async (request, reply) => {
    const { resource } = request.params

    try {
      const document = await createAdminResource(resource, request.body)
      return reply.status(201).send({ document })
    } catch (error) {
      if (error.message === 'Resource unsupported') {
        return reply.status(404).send({ error: 'Ressource admin inconnue' })
      }

      return reply.status(400).send({ error: 'Creation admin invalide' })
    }
  })

  app.patch('/admin/:resource/:id', {
    onRequest: [app.authenticate, app.authorizeAdmin],
  }, async (request, reply) => {
    const { id, resource } = request.params

    try {
      const document = await updateAdminResource(resource, id, request.body)

      if (!document) {
        return reply.status(404).send({ error: 'Document admin introuvable' })
      }

      return reply.send({ document })
    } catch (error) {
      if (error.message === 'Resource unsupported') {
        return reply.status(404).send({ error: 'Ressource admin inconnue' })
      }

      return reply.status(400).send({ error: 'Mise a jour admin invalide' })
    }
  })
}

export default dashboardRoutes
