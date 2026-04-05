import Announcement from './announcement-schema.js'
import Assignment from './assignment-schema.js'
import Course from './course-schema.js'
import Enrollment from './enrollment-schema.js'
import GradeEntry from './grade-entry-schema.js'
import Message from './message-schema.js'
import ScheduleEntry from './schedule-entry-schema.js'

const courseSeeds = [
  {
    title: 'Advanced Probability',
    code: 'MESIFI470125',
    category: 'Finance',
    accent: '#164e63',
    glow: '#8ecae6',
  },
  {
    title: 'Blockchain Programming',
    code: 'MESIIN470625',
    category: 'Informatique',
    accent: '#1d4ed8',
    glow: '#93c5fd',
  },
  {
    title: 'Machine Learning',
    code: 'MESIIN485925',
    category: 'Informatique',
    accent: '#14532d',
    glow: '#86efac',
  },
  {
    title: 'Project Methodology',
    code: 'MESIGP470325',
    category: 'Multidisciplinaire',
    accent: '#7c2d12',
    glow: '#fdba74',
  },
  {
    title: 'Public-key Cryptography',
    code: 'MESIIN484625',
    category: 'Informatique',
    accent: '#5b21b6',
    glow: '#c4b5fd',
  },
  {
    title: 'Rust Programming',
    code: 'MESIIN473325',
    category: 'Informatique',
    accent: '#7f1d1d',
    glow: '#fca5a5',
  },
]

const enrollmentSeeds = {
  MESIFI470125: {
    progress: 68,
    favorite: true,
    urgent: true,
    deliverable: 'Quiz 4 a rendre ce soir',
  },
  MESIIN470625: {
    progress: 82,
    favorite: true,
    urgent: false,
    deliverable: 'TP smart contract feedback',
  },
  MESIIN485925: {
    progress: 23,
    favorite: false,
    urgent: true,
    deliverable: 'Projet forecasting a demarrer',
  },
  MESIGP470325: {
    progress: 74,
    favorite: false,
    urgent: false,
    deliverable: 'Sprint review avec le jury',
  },
  MESIIN484625: {
    progress: 57,
    favorite: true,
    urgent: false,
    deliverable: 'Serie d exercices a finir',
  },
  MESIIN473325: {
    progress: 31,
    favorite: false,
    urgent: true,
    deliverable: 'Lab ownership et borrow checker',
  },
}

const scheduleSeeds = [
  {
    key: 'advanced-probability-monday',
    courseCode: 'MESIFI470125',
    title: 'Advanced Probability',
    detail: 'Amphi A502',
    startsAt: new Date('2026-04-06T08:30:00+02:00'),
    timeLabel: 'Lun 08:30',
  },
  {
    key: 'blockchain-programming-tuesday',
    courseCode: 'MESIIN470625',
    title: 'Blockchain Programming',
    detail: 'Lab innovation B108',
    startsAt: new Date('2026-04-07T10:15:00+02:00'),
    timeLabel: 'Mar 10:15',
  },
  {
    key: 'project-sync-midweek',
    courseCode: null,
    title: 'Point projet equipe',
    detail: 'Salle hybride + Zoom',
    startsAt: new Date('2026-04-08T11:00:00+02:00'),
    timeLabel: 'Mer 11:00',
  },
  {
    key: 'machine-learning-wednesday',
    courseCode: 'MESIIN485925',
    title: 'Machine Learning',
    detail: 'Campus des Terrasses T311',
    startsAt: new Date('2026-04-08T13:30:00+02:00'),
    timeLabel: 'Mer 13:30',
  },
  {
    key: 'project-methodology-thursday',
    courseCode: 'MESIGP470325',
    title: 'Project Methodology',
    detail: 'Salle innovation C114',
    startsAt: new Date('2026-04-09T17:00:00+02:00'),
    timeLabel: 'Jeu 17:00',
  },
  {
    key: 'cryptography-friday',
    courseCode: 'MESIIN484625',
    title: 'Public-key Cryptography',
    detail: 'Amphi B201',
    startsAt: new Date('2026-04-10T11:45:00+02:00'),
    timeLabel: 'Ven 11:45',
  },
  {
    key: 'rust-friday',
    courseCode: 'MESIIN473325',
    title: 'Rust Programming',
    detail: 'Lab reseau B204',
    startsAt: new Date('2026-04-10T15:15:00+02:00'),
    timeLabel: 'Ven 15:15',
  },
]

const announcementSeeds = [
  {
    slug: 'erreur-de-salle-corrigee',
    title: 'Erreur de salle corrigee',
    detail: 'Le cours de ML est confirme aux Terrasses, salle T311.',
    level: 'warning',
    publishedAt: new Date('2026-04-03T09:15:00+02:00'),
  },
  {
    slug: 'smart-contract-feedback-publie',
    title: 'Feedback smart contract disponible',
    detail: 'Blockchain Programming publie les retours du TP smart contract avant la seance de mardi 10:15.',
    level: 'info',
    publishedAt: new Date('2026-04-03T08:40:00+02:00'),
  },
  {
    slug: 'quiz-probability-ouvert',
    title: 'Quiz probability ouvert',
    detail: 'Advanced Probability ouvre le quiz 4 avec fermeture ce soir a 23:59.',
    level: 'warning',
    publishedAt: new Date('2026-04-02T19:00:00+02:00'),
  },
  {
    slug: 'qcm-final-publie',
    title: 'QCM final publie',
    detail: 'Machine Learning ouvre un QCM blanc avec correction instantanee.',
    level: 'info',
    publishedAt: new Date('2026-04-02T18:00:00+02:00'),
  },
  {
    slug: 'project-review-room-update',
    title: 'Sprint review deplacee',
    detail: 'Project Methodology confirme la sprint review en salle C114 jeudi a 17:00.',
    level: 'info',
    publishedAt: new Date('2026-04-02T10:30:00+02:00'),
  },
  {
    slug: 'cryptography-series-release',
    title: 'Serie cryptography disponible',
    detail: 'Public-key Cryptography publie une nouvelle serie d exercices avant vendredi 11:45.',
    level: 'info',
    publishedAt: new Date('2026-04-01T16:45:00+02:00'),
  },
  {
    slug: 'rust-lab-checklist',
    title: 'Checklist labo Rust',
    detail: 'Rust Programming partage la checklist du lab borrow checker avant vendredi 15:15.',
    level: 'info',
    publishedAt: new Date('2026-04-01T09:10:00+02:00'),
  },
  {
    slug: 'rappel-administratif-stage',
    title: 'Rappel administratif',
    detail: 'Le rapport de stage doit etre depose avant le 12 avril a 18h.',
    level: 'info',
    publishedAt: new Date('2026-04-01T12:00:00+02:00'),
  },
]

const messageSeeds = [
  {
    slug: 'ml-room-update',
    sender: 'Nadia Laurent',
    subject: 'Machine Learning : changement de salle',
    preview: 'Le cours de mercredi se tiendra finalement sur le campus des Terrasses en T311.',
    tone: 'warning',
    unread: true,
    receivedAt: new Date('2026-04-03T09:20:00+02:00'),
  },
  {
    slug: 'blockchain-feedback-window',
    sender: 'Olivier Dumas',
    subject: 'Blockchain Programming : feedback TP disponible',
    preview: 'Les retours sur le smart contract sont publies avant le slot de mardi 10:15 en B108.',
    tone: 'info',
    unread: true,
    receivedAt: new Date('2026-04-03T08:50:00+02:00'),
  },
  {
    slug: 'probability-quiz-open',
    sender: 'Advanced Probability team',
    subject: 'Quiz 4 disponible ce soir',
    preview: 'Le quiz 4 est ouvert jusqu a 23:59 avec une tentative unique.',
    tone: 'warning',
    unread: true,
    receivedAt: new Date('2026-04-02T19:15:00+02:00'),
  },
  {
    slug: 'project-review-slot',
    sender: 'Jury Project Methodology',
    subject: 'Creneau de sprint review confirme',
    preview: 'Votre passage est confirme jeudi a 17:00. Merci de preparer un support de 5 minutes.',
    tone: 'info',
    unread: true,
    receivedAt: new Date('2026-04-02T14:10:00+02:00'),
  },
  {
    slug: 'cryptography-problem-set',
    sender: 'Public-key Cryptography',
    subject: 'Nouvelle serie d exercices publiee',
    preview: 'Une nouvelle serie d exercices RSA et ElGamal est attendue avant vendredi 11:45.',
    tone: 'info',
    unread: true,
    receivedAt: new Date('2026-04-01T17:05:00+02:00'),
  },
  {
    slug: 'rust-lab-checklist-message',
    sender: 'Rust Programming',
    subject: 'Checklist de preparation du lab',
    preview: 'Merci de verifier votre environnement cargo et les exercices ownership avant le lab.',
    tone: 'info',
    unread: true,
    receivedAt: new Date('2026-04-01T09:30:00+02:00'),
  },
  {
    slug: 'internship-report-reminder',
    sender: 'Administration stages',
    subject: 'Depot du rapport de stage',
    preview: 'Le depot numerique doit etre termine avant le 12 avril a 18h, sans exception.',
    tone: 'danger',
    unread: false,
    receivedAt: new Date('2026-04-01T11:00:00+02:00'),
  },
]

const assignmentSeeds = [
  {
    slug: 'advanced-probability-quiz-4',
    courseCode: 'MESIFI470125',
    title: 'Quiz 4',
    detail: 'Quiz final a completer avant 23:59 avec une seule tentative autorisee.',
    status: 'due_soon',
    priority: 'high',
    dueAt: new Date('2026-04-03T23:59:00+02:00'),
    submittedAt: null,
  },
  {
    slug: 'blockchain-smart-contract-feedback',
    courseCode: 'MESIIN470625',
    title: 'TP Smart Contract Feedback',
    detail: 'Prendre en compte le feedback du contrat puis republier la version corrigee.',
    status: 'in_review',
    priority: 'medium',
    dueAt: new Date('2026-04-07T10:15:00+02:00'),
    submittedAt: new Date('2026-04-03T08:10:00+02:00'),
  },
  {
    slug: 'machine-learning-forecasting-kickoff',
    courseCode: 'MESIIN485925',
    title: 'Projet Forecasting Kickoff',
    detail: 'Initialiser le notebook, charger les donnees et documenter la strategie de baseline.',
    status: 'not_started',
    priority: 'high',
    dueAt: new Date('2026-04-08T20:00:00+02:00'),
    submittedAt: null,
  },
  {
    slug: 'project-methodology-sprint-deck',
    courseCode: 'MESIGP470325',
    title: 'Sprint Review Deck',
    detail: 'Preparer cinq slides de synthese pour le jury et repeter la demo.',
    status: 'submitted',
    priority: 'medium',
    dueAt: new Date('2026-04-09T16:30:00+02:00'),
    submittedAt: new Date('2026-04-08T21:00:00+02:00'),
  },
  {
    slug: 'cryptography-problem-set-2',
    courseCode: 'MESIIN484625',
    title: 'Problem Set 2',
    detail: 'Serie RSA et ElGamal a rendre avant le cours de vendredi.',
    status: 'due_soon',
    priority: 'medium',
    dueAt: new Date('2026-04-10T11:00:00+02:00'),
    submittedAt: null,
  },
  {
    slug: 'rust-borrow-checker-lab',
    courseCode: 'MESIIN473325',
    title: 'Borrow Checker Lab',
    detail: 'Finaliser les exercices ownership et joindre les captures de tests cargo.',
    status: 'not_started',
    priority: 'high',
    dueAt: new Date('2026-04-10T18:00:00+02:00'),
    submittedAt: null,
  },
]

const gradeEntrySeeds = [
  {
    slug: 'advanced-probability-quiz-3-grade',
    courseCode: 'MESIFI470125',
    title: 'Quiz 3',
    type: 'quiz',
    score: 15,
    outOf: 20,
    coefficient: 1,
    status: 'published',
    returnedAt: new Date('2026-03-28T18:00:00+02:00'),
  },
  {
    slug: 'advanced-probability-midterm-grade',
    courseCode: 'MESIFI470125',
    title: 'Midterm',
    type: 'exam',
    score: 14,
    outOf: 20,
    coefficient: 2,
    status: 'published',
    returnedAt: new Date('2026-03-20T18:00:00+02:00'),
  },
  {
    slug: 'blockchain-smart-contract-grade',
    courseCode: 'MESIIN470625',
    title: 'Smart Contract TP',
    type: 'lab',
    score: 17,
    outOf: 20,
    coefficient: 2,
    status: 'published',
    returnedAt: new Date('2026-04-03T08:30:00+02:00'),
  },
  {
    slug: 'machine-learning-anomaly-lab-grade',
    courseCode: 'MESIIN485925',
    title: 'Anomaly Detection Lab',
    type: 'lab',
    score: 14,
    outOf: 20,
    coefficient: 1,
    status: 'published',
    returnedAt: new Date('2026-03-29T16:00:00+02:00'),
  },
  {
    slug: 'machine-learning-final-qcm',
    courseCode: 'MESIIN485925',
    title: 'QCM Blanc Final',
    type: 'quiz',
    score: null,
    outOf: 20,
    coefficient: 1,
    status: 'pending',
    returnedAt: null,
  },
  {
    slug: 'project-methodology-sprint-review-grade',
    courseCode: 'MESIGP470325',
    title: 'Sprint Review',
    type: 'presentation',
    score: 16,
    outOf: 20,
    coefficient: 2,
    status: 'published',
    returnedAt: new Date('2026-04-02T15:00:00+02:00'),
  },
  {
    slug: 'cryptography-problem-set-1-grade',
    courseCode: 'MESIIN484625',
    title: 'Problem Set 1',
    type: 'exercise',
    score: 13,
    outOf: 20,
    coefficient: 1,
    status: 'published',
    returnedAt: new Date('2026-03-31T17:00:00+02:00'),
  },
  {
    slug: 'rust-ownership-lab-grade',
    courseCode: 'MESIIN473325',
    title: 'Ownership Lab',
    type: 'lab',
    score: 18,
    outOf: 20,
    coefficient: 1,
    status: 'published',
    returnedAt: new Date('2026-03-30T18:30:00+02:00'),
  },
]

const discoveryItems = [
  'Resume IA de chaque cours en 30 secondes',
  'Agenda qui regroupe cours, rendus et examens',
  'Alerte unique quand un enseignant change de salle',
]

const courseRelations = {
  MESIFI470125: {
    entryKeys: ['advanced-probability-monday'],
    announcementSlugs: ['quiz-probability-ouvert'],
  },
  MESIIN470625: {
    entryKeys: ['blockchain-programming-tuesday'],
    announcementSlugs: ['smart-contract-feedback-publie'],
  },
  MESIIN485925: {
    entryKeys: ['machine-learning-wednesday'],
    announcementSlugs: ['erreur-de-salle-corrigee', 'qcm-final-publie'],
  },
  MESIGP470325: {
    entryKeys: ['project-methodology-thursday'],
    announcementSlugs: ['project-review-room-update'],
  },
  MESIIN484625: {
    entryKeys: ['cryptography-friday'],
    announcementSlugs: ['cryptography-series-release'],
  },
  MESIIN473325: {
    entryKeys: ['rust-friday'],
    announcementSlugs: ['rust-lab-checklist'],
  },
}

const announcementRelations = {
  'erreur-de-salle-corrigee': {
    messageSlugs: ['ml-room-update'],
    entryKeys: ['machine-learning-wednesday'],
  },
  'smart-contract-feedback-publie': {
    messageSlugs: ['blockchain-feedback-window'],
    entryKeys: ['blockchain-programming-tuesday'],
  },
  'quiz-probability-ouvert': {
    messageSlugs: ['probability-quiz-open'],
    entryKeys: ['advanced-probability-monday'],
  },
  'qcm-final-publie': {
    messageSlugs: ['ml-room-update'],
    entryKeys: ['machine-learning-wednesday'],
  },
  'project-review-room-update': {
    messageSlugs: ['project-review-slot'],
    entryKeys: ['project-methodology-thursday'],
  },
  'cryptography-series-release': {
    messageSlugs: ['cryptography-problem-set'],
    entryKeys: ['cryptography-friday'],
  },
  'rust-lab-checklist': {
    messageSlugs: ['rust-lab-checklist-message'],
    entryKeys: ['rust-friday'],
  },
  'rappel-administratif-stage': {
    messageSlugs: ['internship-report-reminder'],
    entryKeys: [],
  },
}

const assignmentAnnouncementRelations = {
  'advanced-probability-quiz-4': ['quiz-probability-ouvert'],
  'blockchain-smart-contract-feedback': ['smart-contract-feedback-publie'],
  'machine-learning-forecasting-kickoff': ['erreur-de-salle-corrigee', 'qcm-final-publie'],
  'project-methodology-sprint-deck': ['project-review-room-update'],
  'cryptography-problem-set-2': ['cryptography-series-release'],
  'rust-borrow-checker-lab': ['rust-lab-checklist'],
}

async function upsertMany(model, uniqueKey, documents) {
  await Promise.all(documents.map(document => model.updateOne(
    { [uniqueKey]: document[uniqueKey] },
    { $setOnInsert: document },
    { upsert: true },
  )))
}

export async function ensureGlobalDashboardData() {
  await Promise.all([
    upsertMany(Assignment, 'slug', assignmentSeeds),
    upsertMany(Course, 'code', courseSeeds),
    upsertMany(GradeEntry, 'slug', gradeEntrySeeds),
    upsertMany(ScheduleEntry, 'key', scheduleSeeds),
    upsertMany(Announcement, 'slug', announcementSeeds),
    upsertMany(Message, 'slug', messageSeeds),
  ])
}

export async function ensureUserEnrollments(userId) {
  const courses = await Course.find({})
    .sort({ title: 1 })
    .lean()

  await Promise.all(courses.map(course => Enrollment.updateOne(
    {
      userId,
      courseId: course._id,
    },
    {
      $setOnInsert: {
        userId,
        courseId: course._id,
        progress: enrollmentSeeds[course.code]?.progress ?? 0,
        favorite: enrollmentSeeds[course.code]?.favorite ?? false,
        urgent: enrollmentSeeds[course.code]?.urgent ?? false,
        deliverable: enrollmentSeeds[course.code]?.deliverable ?? 'Aucune action immediate',
      },
    },
    { upsert: true },
  )))
}

function buildStudentProfile(user) {
  return {
    name: user.username,
    program: 'MS FinTech',
    cohort: 'Promotion 2026',
    email: user.email,
    role: user.role ?? 'student',
    campus: 'La Defense',
    status: 'Etudiant actif',
    joinedAt: new Date('2025-09-15T09:00:00+02:00'),
  }
}

async function loadWorkspaceCollections(user) {
  await ensureGlobalDashboardData()
  await ensureUserEnrollments(user._id)

  const [assignments, courses, enrollments, grades, schedule, announcements, messages] = await Promise.all([
    Assignment.find({})
      .sort({ dueAt: 1 })
      .lean(),
    Course.find({})
      .sort({ title: 1 })
      .lean(),
    Enrollment.find({ userId: user._id })
      .sort({ updatedAt: -1 })
      .lean(),
    GradeEntry.find({})
      .sort({ returnedAt: -1, createdAt: -1 })
      .lean(),
    ScheduleEntry.find({})
      .sort({ startsAt: 1 })
      .lean(),
    Announcement.find({})
      .sort({ publishedAt: -1 })
      .lean(),
    Message.find({})
      .sort({ receivedAt: -1 })
      .limit(20)
      .lean(),
  ])

  return {
    assignments,
    courses,
    enrollments,
    grades,
    schedule,
    announcements,
    messages,
  }
}

function hydrateCourses(courses, enrollments, schedule) {
  const enrollmentByCourseId = new Map(
    enrollments.map(enrollment => [enrollment.courseId.toString(), enrollment]),
  )
  const nextScheduleByCourseCode = new Map()

  for (const item of schedule) {
    if (item.courseCode && !nextScheduleByCourseCode.has(item.courseCode)) {
      nextScheduleByCourseCode.set(item.courseCode, item)
    }
  }

  return courses.map((course) => {
    const enrollment = enrollmentByCourseId.get(course._id.toString())
    const nextSchedule = nextScheduleByCourseCode.get(course.code)

    return {
      title: course.title,
      code: course.code,
      category: course.category,
      progress: enrollment?.progress ?? 0,
      nextSession: nextSchedule?.timeLabel ?? 'A planifier',
      deliverable: enrollment?.deliverable ?? 'Aucune action immediate',
      urgent: enrollment?.urgent ?? false,
      favorite: enrollment?.favorite ?? false,
      accent: course.accent,
      glow: course.glow,
    }
  })
}

function hydrateCalendar(schedule) {
  return schedule.map(item => ({
    key: item.key,
    courseCode: item.courseCode,
    title: item.title,
    detail: item.detail,
    time: item.timeLabel,
    startsAt: item.startsAt,
  }))
}

function hydrateMessages(messages) {
  return messages.map(item => ({
    slug: item.slug,
    sender: item.sender,
    subject: item.subject,
    preview: item.preview,
    tone: item.tone,
    unread: item.unread,
    receivedAt: item.receivedAt,
  }))
}

function hydrateAnnouncements(announcements) {
  return announcements.map(item => ({
    slug: item.slug,
    title: item.title,
    detail: item.detail,
    level: item.level,
    publishedAt: item.publishedAt,
  }))
}

function hydrateAssignments(assignments) {
  return assignments.map(item => ({
    slug: item.slug,
    courseCode: item.courseCode,
    title: item.title,
    detail: item.detail,
    status: item.status,
    priority: item.priority,
    dueAt: item.dueAt,
    submittedAt: item.submittedAt,
  }))
}

function hydrateGrades(grades) {
  return grades.map(item => ({
    slug: item.slug,
    courseCode: item.courseCode,
    title: item.title,
    type: item.type,
    score: item.score,
    outOf: item.outOf,
    coefficient: item.coefficient,
    status: item.status,
    returnedAt: item.returnedAt,
  }))
}

function buildCourseQuickSummary(course, relatedEntries, relatedAnnouncements) {
  const progressTone = course.progress >= 70
    ? 'Tu es en avance sur ce module.'
    : course.progress >= 40
      ? 'Le module est sous controle, mais il faut garder le rythme.'
      : 'Le module demande une relance rapide cette semaine.'

  const priorityTone = course.urgent
    ? `Point chaud: ${course.deliverable}.`
    : `Priorite actuelle: ${course.deliverable}.`

  const sessionTone = relatedEntries[0]
    ? `Prochaine seance: ${relatedEntries[0].time} en ${relatedEntries[0].detail}.`
    : `Aucune seance planifiee a court terme pour l'instant.`

  const alertTone = relatedAnnouncements[0]
    ? `A surveiller: ${relatedAnnouncements[0].title}.`
    : 'Aucune alerte specifique remontee pour ce cours.'

  return {
    headline: `${course.title} en 30 secondes`,
    bullets: [
      progressTone,
      priorityTone,
      sessionTone,
      alertTone,
    ],
  }
}

function computeCourseAverage(entries) {
  const gradedEntries = entries.filter(entry => typeof entry.score === 'number')

  if (!gradedEntries.length) {
    return null
  }

  const totals = gradedEntries.reduce((accumulator, entry) => {
    const normalizedScore = (entry.score / entry.outOf) * 20
    const weightedScore = normalizedScore * entry.coefficient

    return {
      coefficient: accumulator.coefficient + entry.coefficient,
      score: accumulator.score + weightedScore,
    }
  }, { coefficient: 0, score: 0 })

  return Number((totals.score / totals.coefficient).toFixed(1))
}

function buildGradeCourseSummaries(courses, grades) {
  return courses.map((course) => {
    const entries = grades.filter(entry => entry.courseCode === course.code)
    const publishedCount = entries.filter(entry => entry.status === 'published').length
    const pendingCount = entries.filter(entry => entry.status !== 'published').length
    const average = computeCourseAverage(entries)

    return {
      average,
      courseCode: course.code,
      courseTitle: course.title,
      lastReturnedAt: entries.find(entry => entry.returnedAt)?.returnedAt ?? null,
      pendingCount,
      publishedCount,
    }
  })
}

export async function getDashboardOverview(user) {
  const collections = await loadWorkspaceCollections(user)
  const dashboardCourses = hydrateCourses(
    collections.courses,
    collections.enrollments,
    collections.schedule,
  )

  const averageProgress = dashboardCourses.length
    ? Math.round(
        dashboardCourses.reduce((sum, course) => sum + course.progress, 0) / dashboardCourses.length,
      )
    : 0

  return {
    student: buildStudentProfile(user),
    summary: {
      averageProgress,
      urgentCount: dashboardCourses.filter(course => course.urgent).length,
      completedCount: dashboardCourses.filter(course => course.progress >= 70).length,
      unreadCount: collections.messages.filter(message => message.unread).length,
    },
    courses: dashboardCourses,
    timeline: hydrateCalendar(collections.schedule).slice(0, 4),
    announcements: hydrateAnnouncements(collections.announcements).slice(0, 4),
    messages: hydrateMessages(collections.messages).slice(0, 3),
    discovery: discoveryItems,
  }
}

export async function getCoursesViewData(user) {
  const collections = await loadWorkspaceCollections(user)
  const courses = hydrateCourses(
    collections.courses,
    collections.enrollments,
    collections.schedule,
  )

  return {
    student: buildStudentProfile(user),
    courses,
    summary: {
      total: courses.length,
      favorites: courses.filter(course => course.favorite).length,
      urgent: courses.filter(course => course.urgent).length,
    },
  }
}

export async function getCalendarViewData(user) {
  const collections = await loadWorkspaceCollections(user)

  return {
    student: buildStudentProfile(user),
    entries: hydrateCalendar(collections.schedule),
    announcements: hydrateAnnouncements(collections.announcements),
  }
}

export async function getMessagesViewData(user) {
  const collections = await loadWorkspaceCollections(user)

  return {
    student: buildStudentProfile(user),
    messages: hydrateMessages(collections.messages),
    summary: {
      total: collections.messages.length,
      unread: collections.messages.filter(message => message.unread).length,
    },
  }
}

export async function getAnnouncementsViewData(user) {
  const collections = await loadWorkspaceCollections(user)
  const announcements = hydrateAnnouncements(collections.announcements)

  return {
    student: buildStudentProfile(user),
    announcements,
    summary: {
      total: announcements.length,
      warning: announcements.filter(item => item.level === 'warning').length,
      info: announcements.filter(item => item.level === 'info').length,
    },
  }
}

export async function getProfileViewData(user) {
  const collections = await loadWorkspaceCollections(user)
  const courses = hydrateCourses(
    collections.courses,
    collections.enrollments,
    collections.schedule,
  )
  const upcomingEntries = hydrateCalendar(collections.schedule).slice(0, 3)

  const averageProgress = courses.length
    ? Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)
    : 0

  return {
    student: buildStudentProfile(user),
    summary: {
      averageProgress,
      favorites: courses.filter(course => course.favorite).length,
      urgent: courses.filter(course => course.urgent).length,
      unreadMessages: collections.messages.filter(message => message.unread).length,
      announcements: collections.announcements.length,
    },
    focusCourses: courses.filter(course => course.favorite || course.urgent).slice(0, 4),
    upcomingEntries,
  }
}

export async function getAssignmentsViewData(user) {
  const collections = await loadWorkspaceCollections(user)
  const assignments = hydrateAssignments(collections.assignments)

  return {
    student: buildStudentProfile(user),
    assignments,
    summary: {
      total: assignments.length,
      dueSoon: assignments.filter(item => item.status === 'due_soon').length,
      inReview: assignments.filter(item => item.status === 'in_review').length,
      completed: assignments.filter(item => item.status === 'submitted').length,
    },
  }
}

export async function getAssignmentDetailData(user, slug) {
  const collections = await loadWorkspaceCollections(user)
  const assignments = hydrateAssignments(collections.assignments)
  const assignment = assignments.find(item => item.slug === slug)

  if (!assignment) {
    return null
  }

  const relatedCourse = hydrateCourses(
    collections.courses,
    collections.enrollments,
    collections.schedule,
  ).find(course => course.code === assignment.courseCode) ?? null
  const relatedAnnouncements = hydrateAnnouncements(collections.announcements)
    .filter(item => (assignmentAnnouncementRelations[slug] ?? []).includes(item.slug))

  return {
    student: buildStudentProfile(user),
    assignment,
    relatedAnnouncements,
    relatedCourse,
  }
}

export async function getGradesViewData(user) {
  const collections = await loadWorkspaceCollections(user)
  const courses = hydrateCourses(
    collections.courses,
    collections.enrollments,
    collections.schedule,
  )
  const grades = hydrateGrades(collections.grades)
  const courseSummaries = buildGradeCourseSummaries(courses, grades)
  const publishedGrades = grades.filter(entry => entry.status === 'published')

  return {
    student: buildStudentProfile(user),
    courses: courseSummaries,
    recentGrades: publishedGrades.slice(0, 5),
    summary: {
      globalAverage: computeCourseAverage(
        publishedGrades.map(entry => ({ ...entry, coefficient: entry.coefficient })),
      ),
      pending: grades.filter(entry => entry.status !== 'published').length,
      returned: publishedGrades.length,
    },
  }
}

export async function getGradeDetailData(user, courseCode) {
  const collections = await loadWorkspaceCollections(user)
  const courses = hydrateCourses(
    collections.courses,
    collections.enrollments,
    collections.schedule,
  )
  const course = courses.find(item => item.code === courseCode)

  if (!course) {
    return null
  }

  const evaluations = hydrateGrades(collections.grades)
    .filter(entry => entry.courseCode === courseCode)
  const relatedAssignments = hydrateAssignments(collections.assignments)
    .filter(item => item.courseCode === courseCode)

  return {
    student: buildStudentProfile(user),
    course,
    evaluations,
    average: computeCourseAverage(evaluations),
    relatedAssignments,
  }
}

export async function getCourseDetailData(user, code) {
  const collections = await loadWorkspaceCollections(user)
  const courses = hydrateCourses(
    collections.courses,
    collections.enrollments,
    collections.schedule,
  )
  const course = courses.find(item => item.code === code)

  if (!course) {
    return null
  }

  const relations = courseRelations[code] ?? { announcementSlugs: [], entryKeys: [] }
  const relatedEntries = hydrateCalendar(collections.schedule)
    .filter(item => relations.entryKeys.includes(item.key))
  const relatedAnnouncements = hydrateAnnouncements(collections.announcements)
    .filter(item => relations.announcementSlugs.includes(item.slug))

  return {
    student: buildStudentProfile(user),
    course,
    quickSummary: buildCourseQuickSummary(course, relatedEntries, relatedAnnouncements),
    relatedEntries,
    relatedAnnouncements,
  }
}

export async function getCalendarEntryDetailData(user, key) {
  const collections = await loadWorkspaceCollections(user)
  const entries = hydrateCalendar(collections.schedule)
  const entry = entries.find(item => item.key === key)

  if (!entry) {
    return null
  }

  const relatedCourse = hydrateCourses(
    collections.courses,
    collections.enrollments,
    collections.schedule,
  ).find(course => course.code === entry.courseCode) ?? null
  const relatedAnnouncementSlugs = Object.entries(announcementRelations)
    .filter(([, relations]) => relations.entryKeys.includes(key))
    .map(([slug]) => slug)

  return {
    student: buildStudentProfile(user),
    entry,
    relatedCourse,
    announcements: hydrateAnnouncements(collections.announcements)
      .filter(item => relatedAnnouncementSlugs.includes(item.slug)),
  }
}

export async function getMessageDetailData(user, slug) {
  const collections = await loadWorkspaceCollections(user)
  const messages = hydrateMessages(collections.messages)
  const message = messages.find(item => item.slug === slug)

  if (!message) {
    return null
  }

  const relatedAnnouncementSlugs = Object.entries(announcementRelations)
    .filter(([, relations]) => relations.messageSlugs.includes(slug))
    .map(([announcementSlug]) => announcementSlug)

  return {
    student: buildStudentProfile(user),
    message,
    relatedAnnouncements: hydrateAnnouncements(collections.announcements)
      .filter(item => relatedAnnouncementSlugs.includes(item.slug)),
  }
}

export async function getAnnouncementDetailData(user, slug) {
  const collections = await loadWorkspaceCollections(user)
  const announcements = hydrateAnnouncements(collections.announcements)
  const announcement = announcements.find(item => item.slug === slug)

  if (!announcement) {
    return null
  }

  const relatedMessages = hydrateMessages(collections.messages)
    .filter(message => announcementRelations[slug]?.messageSlugs.includes(message.slug))
  const relatedEntries = hydrateCalendar(collections.schedule)
    .filter(entry => announcementRelations[slug]?.entryKeys.includes(entry.key))

  return {
    student: buildStudentProfile(user),
    announcement,
    relatedMessages,
    relatedEntries,
  }
}

function buildAdminSections(collections) {
  return {
    assignments: collections.assignments.map(item => ({
      slug: item.slug,
      courseCode: item.courseCode,
      title: item.title,
      detail: item.detail,
      status: item.status,
      priority: item.priority,
      dueAt: item.dueAt,
      submittedAt: item.submittedAt,
    })),
    courses: collections.courses.map(course => ({
      code: course.code,
      title: course.title,
      category: course.category,
      accent: course.accent,
      glow: course.glow,
    })),
    grades: collections.grades.map(item => ({
      slug: item.slug,
      courseCode: item.courseCode,
      title: item.title,
      type: item.type,
      score: item.score,
      outOf: item.outOf,
      coefficient: item.coefficient,
      status: item.status,
      returnedAt: item.returnedAt,
    })),
    announcements: collections.announcements.map(item => ({
      slug: item.slug,
      title: item.title,
      detail: item.detail,
      level: item.level,
      publishedAt: item.publishedAt,
    })),
    schedule: collections.schedule.map(item => ({
      key: item.key,
      courseCode: item.courseCode,
      title: item.title,
      detail: item.detail,
      timeLabel: item.timeLabel,
      startsAt: item.startsAt,
    })),
    messages: collections.messages.map(item => ({
      slug: item.slug,
      sender: item.sender,
      subject: item.subject,
      preview: item.preview,
      tone: item.tone,
      unread: item.unread,
      receivedAt: item.receivedAt,
    })),
  }
}

export async function getAdminViewData(user) {
  const collections = await loadWorkspaceCollections(user)

  return {
    student: buildStudentProfile(user),
    sections: buildAdminSections(collections),
    summary: {
      assignments: collections.assignments.length,
      courses: collections.courses.length,
      grades: collections.grades.length,
      announcements: collections.announcements.length,
      schedule: collections.schedule.length,
      messages: collections.messages.length,
    },
  }
}

function getModelForResource(resource) {
  switch (resource) {
    case 'assignments':
      return { model: Assignment, uniqueKey: 'slug' }
    case 'courses':
      return { model: Course, uniqueKey: 'code' }
    case 'grades':
      return { model: GradeEntry, uniqueKey: 'slug' }
    case 'announcements':
      return { model: Announcement, uniqueKey: 'slug' }
    case 'schedule':
      return { model: ScheduleEntry, uniqueKey: 'key' }
    case 'messages':
      return { model: Message, uniqueKey: 'slug' }
    default:
      return null
  }
}

export async function createAdminResource(resource, payload) {
  const target = getModelForResource(resource)

  if (!target) {
    throw new Error('Resource unsupported')
  }

  return target.model.create(payload)
}

export async function updateAdminResource(resource, id, payload) {
  const target = getModelForResource(resource)

  if (!target) {
    throw new Error('Resource unsupported')
  }

  return target.model.findOneAndUpdate(
    { [target.uniqueKey]: id },
    { $set: payload },
    { new: true, runValidators: true },
  ).lean()
}
