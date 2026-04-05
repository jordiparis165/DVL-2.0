import { apiRequest } from './api.js'

export function fetchDashboardOverview() {
  return apiRequest('/dashboard/overview')
}

export function fetchCoursesView() {
  return apiRequest('/dashboard/courses')
}

export function fetchCourseDetail(code) {
  return apiRequest(`/dashboard/courses/${code}`)
}

export function fetchCalendarView() {
  return apiRequest('/dashboard/calendar')
}

export function fetchCalendarEntryDetail(key) {
  return apiRequest(`/dashboard/calendar/${key}`)
}

export function fetchMessagesView() {
  return apiRequest('/dashboard/messages')
}

export function fetchMessageDetail(slug) {
  return apiRequest(`/dashboard/messages/${slug}`)
}

export function fetchAnnouncementsView() {
  return apiRequest('/dashboard/announcements')
}

export function fetchAnnouncementDetail(slug) {
  return apiRequest(`/dashboard/announcements/${slug}`)
}

export function fetchAssignmentsView() {
  return apiRequest('/dashboard/assignments')
}

export function fetchAssignmentDetail(slug) {
  return apiRequest(`/dashboard/assignments/${slug}`)
}

export function fetchGradesView() {
  return apiRequest('/dashboard/grades')
}

export function fetchGradeDetail(courseCode) {
  return apiRequest(`/dashboard/grades/${courseCode}`)
}

export function fetchProfileView() {
  return apiRequest('/dashboard/profile')
}

export function fetchAdminView() {
  return apiRequest('/dashboard/admin')
}

export function updateAdminResource(resource, id, payload) {
  return apiRequest(`/dashboard/admin/${resource}/${id}`, {
    method: 'PATCH',
    body: payload,
  })
}

export function createAdminResource(resource, payload) {
  return apiRequest(`/dashboard/admin/${resource}`, {
    method: 'POST',
    body: payload,
  })
}

const demoStudent = {
  name: 'Jordi',
  program: 'MS FinTech',
  cohort: 'Promotion 2026',
  email: 'jordi@demo.local',
  campus: 'La Defense',
  status: 'Etudiant actif',
  joinedAt: '2025-09-15T09:00:00+02:00',
}

const demoCourses = [
  {
    title: 'Advanced Probability',
    code: 'MESIFI470125',
    category: 'Finance',
    progress: 68,
    nextSession: 'Lun 08:30',
    deliverable: 'Quiz 4 a rendre ce soir',
    urgent: true,
    favorite: true,
    accent: '#164e63',
    glow: '#8ecae6',
  },
  {
    title: 'Blockchain Programming',
    code: 'MESIIN470625',
    category: 'Informatique',
    progress: 82,
    nextSession: 'Mar 10:15',
    deliverable: 'TP smart contract feedback',
    urgent: false,
    favorite: true,
    accent: '#1d4ed8',
    glow: '#93c5fd',
  },
  {
    title: 'Machine Learning',
    code: 'MESIIN485925',
    category: 'Informatique',
    progress: 23,
    nextSession: 'Mer 13:30',
    deliverable: 'Projet forecasting a demarrer',
    urgent: true,
    favorite: false,
    accent: '#14532d',
    glow: '#86efac',
  },
  {
    title: 'Project Methodology',
    code: 'MESIGP470325',
    category: 'Multidisciplinaire',
    progress: 74,
    nextSession: 'Jeu 17:00',
    deliverable: 'Sprint review avec le jury',
    urgent: false,
    favorite: false,
    accent: '#7c2d12',
    glow: '#fdba74',
  },
  {
    title: 'Public-key Cryptography',
    code: 'MESIIN484625',
    category: 'Informatique',
    progress: 57,
    nextSession: 'Ven 11:45',
    deliverable: 'Serie d exercices a finir',
    urgent: false,
    favorite: true,
    accent: '#5b21b6',
    glow: '#c4b5fd',
  },
  {
    title: 'Rust Programming',
    code: 'MESIIN473325',
    category: 'Informatique',
    progress: 31,
    nextSession: 'Ven 15:15',
    deliverable: 'Lab ownership et borrow checker',
    urgent: true,
    favorite: false,
    accent: '#7f1d1d',
    glow: '#fca5a5',
  },
]

const demoTimeline = [
  { key: 'advanced-probability-monday', time: 'Lun 08:30', title: 'Advanced Probability', detail: 'Amphi A502' },
  { key: 'blockchain-programming-tuesday', time: 'Mar 10:15', title: 'Blockchain Programming', detail: 'Lab innovation B108' },
  { key: 'project-sync-midweek', time: 'Mer 11:00', title: 'Point projet equipe', detail: 'Salle hybride + Zoom' },
  { key: 'machine-learning-wednesday', time: 'Mer 13:30', title: 'Machine Learning', detail: 'Campus des Terrasses T311' },
  { key: 'project-methodology-thursday', time: 'Jeu 17:00', title: 'Project Methodology', detail: 'Salle innovation C114' },
  { key: 'cryptography-friday', time: 'Ven 11:45', title: 'Public-key Cryptography', detail: 'Amphi B201' },
  { key: 'rust-friday', time: 'Ven 15:15', title: 'Rust Programming', detail: 'Lab reseau B204' },
]

const demoAnnouncements = [
  {
    slug: 'erreur-de-salle-corrigee',
    title: 'Erreur de salle corrigee',
    detail: 'Le cours de ML est confirme aux Terrasses, salle T311.',
    level: 'warning',
    publishedAt: '2026-04-03T09:15:00+02:00',
  },
  {
    slug: 'smart-contract-feedback-publie',
    title: 'Feedback smart contract disponible',
    detail: 'Blockchain Programming publie les retours du TP smart contract avant la seance de mardi 10:15.',
    level: 'info',
    publishedAt: '2026-04-03T08:40:00+02:00',
  },
  {
    slug: 'quiz-probability-ouvert',
    title: 'Quiz probability ouvert',
    detail: 'Advanced Probability ouvre le quiz 4 avec fermeture ce soir a 23:59.',
    level: 'warning',
    publishedAt: '2026-04-02T19:00:00+02:00',
  },
  {
    slug: 'qcm-final-publie',
    title: 'QCM final publie',
    detail: 'Machine Learning ouvre un QCM blanc avec correction instantanee.',
    level: 'info',
    publishedAt: '2026-04-02T18:00:00+02:00',
  },
  {
    slug: 'project-review-room-update',
    title: 'Sprint review deplacee',
    detail: 'Project Methodology confirme la sprint review en salle C114 jeudi a 17:00.',
    level: 'info',
    publishedAt: '2026-04-02T10:30:00+02:00',
  },
  {
    slug: 'cryptography-series-release',
    title: 'Serie cryptography disponible',
    detail: 'Public-key Cryptography publie une nouvelle serie d exercices avant vendredi 11:45.',
    level: 'info',
    publishedAt: '2026-04-01T16:45:00+02:00',
  },
  {
    slug: 'rust-lab-checklist',
    title: 'Checklist labo Rust',
    detail: 'Rust Programming partage la checklist du lab borrow checker avant vendredi 15:15.',
    level: 'info',
    publishedAt: '2026-04-01T09:10:00+02:00',
  },
  {
    slug: 'rappel-administratif-stage',
    title: 'Rappel administratif',
    detail: 'Le rapport de stage doit etre depose avant le 12 avril a 18h.',
    level: 'info',
    publishedAt: '2026-04-01T12:00:00+02:00',
  },
]

const demoMessages = [
  {
    slug: 'ml-room-update',
    sender: 'Nadia Laurent',
    subject: 'Machine Learning : changement de salle',
    preview: 'Le cours de mercredi se tiendra finalement sur le campus des Terrasses en T311.',
    tone: 'warning',
    unread: true,
    receivedAt: '2026-04-03T09:20:00+02:00',
  },
  {
    slug: 'blockchain-feedback-window',
    sender: 'Olivier Dumas',
    subject: 'Blockchain Programming : feedback TP disponible',
    preview: 'Les retours sur le smart contract sont publies avant le slot de mardi 10:15 en B108.',
    tone: 'info',
    unread: true,
    receivedAt: '2026-04-03T08:50:00+02:00',
  },
  {
    slug: 'probability-quiz-open',
    sender: 'Advanced Probability team',
    subject: 'Quiz 4 disponible ce soir',
    preview: 'Le quiz 4 est ouvert jusqu a 23:59 avec une tentative unique.',
    tone: 'warning',
    unread: true,
    receivedAt: '2026-04-02T19:15:00+02:00',
  },
  {
    slug: 'project-review-slot',
    sender: 'Jury Project Methodology',
    subject: 'Creneau de sprint review confirme',
    preview: 'Votre passage est confirme jeudi a 17:00. Merci de preparer un support de 5 minutes.',
    tone: 'info',
    unread: true,
    receivedAt: '2026-04-02T14:10:00+02:00',
  },
  {
    slug: 'cryptography-problem-set',
    sender: 'Public-key Cryptography',
    subject: 'Nouvelle serie d exercices publiee',
    preview: 'Une nouvelle serie d exercices RSA et ElGamal est attendue avant vendredi 11:45.',
    tone: 'info',
    unread: true,
    receivedAt: '2026-04-01T17:05:00+02:00',
  },
  {
    slug: 'rust-lab-checklist-message',
    sender: 'Rust Programming',
    subject: 'Checklist de preparation du lab',
    preview: 'Merci de verifier votre environnement cargo et les exercices ownership avant le lab.',
    tone: 'info',
    unread: true,
    receivedAt: '2026-04-01T09:30:00+02:00',
  },
  {
    slug: 'internship-report-reminder',
    sender: 'Administration stages',
    subject: 'Depot du rapport de stage',
    preview: 'Le depot numerique doit etre termine avant le 12 avril a 18h, sans exception.',
    tone: 'danger',
    unread: false,
    receivedAt: '2026-04-01T11:00:00+02:00',
  },
]

const demoAssignments = [
  {
    slug: 'advanced-probability-quiz-4',
    courseCode: 'MESIFI470125',
    title: 'Quiz 4',
    detail: 'Quiz final a completer avant 23:59 avec une seule tentative autorisee.',
    status: 'due_soon',
    priority: 'high',
    dueAt: '2026-04-03T23:59:00+02:00',
    submittedAt: null,
  },
  {
    slug: 'blockchain-smart-contract-feedback',
    courseCode: 'MESIIN470625',
    title: 'TP Smart Contract Feedback',
    detail: 'Prendre en compte le feedback du contrat puis republier la version corrigee.',
    status: 'in_review',
    priority: 'medium',
    dueAt: '2026-04-07T10:15:00+02:00',
    submittedAt: '2026-04-03T08:10:00+02:00',
  },
  {
    slug: 'machine-learning-forecasting-kickoff',
    courseCode: 'MESIIN485925',
    title: 'Projet Forecasting Kickoff',
    detail: 'Initialiser le notebook, charger les donnees et documenter la strategie de baseline.',
    status: 'not_started',
    priority: 'high',
    dueAt: '2026-04-08T20:00:00+02:00',
    submittedAt: null,
  },
  {
    slug: 'project-methodology-sprint-deck',
    courseCode: 'MESIGP470325',
    title: 'Sprint Review Deck',
    detail: 'Preparer cinq slides de synthese pour le jury et repeter la demo.',
    status: 'submitted',
    priority: 'medium',
    dueAt: '2026-04-09T16:30:00+02:00',
    submittedAt: '2026-04-08T21:00:00+02:00',
  },
  {
    slug: 'cryptography-problem-set-2',
    courseCode: 'MESIIN484625',
    title: 'Problem Set 2',
    detail: 'Serie RSA et ElGamal a rendre avant le cours de vendredi.',
    status: 'due_soon',
    priority: 'medium',
    dueAt: '2026-04-10T11:00:00+02:00',
    submittedAt: null,
  },
  {
    slug: 'rust-borrow-checker-lab',
    courseCode: 'MESIIN473325',
    title: 'Borrow Checker Lab',
    detail: 'Finaliser les exercices ownership et joindre les captures de tests cargo.',
    status: 'not_started',
    priority: 'high',
    dueAt: '2026-04-10T18:00:00+02:00',
    submittedAt: null,
  },
]

const demoGrades = [
  {
    slug: 'advanced-probability-quiz-3-grade',
    courseCode: 'MESIFI470125',
    title: 'Quiz 3',
    type: 'quiz',
    score: 15,
    outOf: 20,
    coefficient: 1,
    status: 'published',
    returnedAt: '2026-03-28T18:00:00+02:00',
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
    returnedAt: '2026-03-20T18:00:00+02:00',
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
    returnedAt: '2026-04-03T08:30:00+02:00',
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
    returnedAt: '2026-03-29T16:00:00+02:00',
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
    returnedAt: '2026-04-02T15:00:00+02:00',
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
    returnedAt: '2026-03-31T17:00:00+02:00',
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
    returnedAt: '2026-03-30T18:30:00+02:00',
  },
]

const demoDiscovery = [
  'Resume IA de chaque cours en 30 secondes',
  'Agenda qui regroupe cours, rendus et examens',
  'Alerte unique quand un enseignant change de salle',
]

export const demoOverview = {
  student: demoStudent,
  summary: {
    averageProgress: 56,
    urgentCount: 3,
    completedCount: 2,
    unreadCount: 2,
  },
  courses: demoCourses,
  timeline: demoTimeline,
  announcements: demoAnnouncements.slice(0, 4),
  messages: demoMessages.slice(0, 3),
  discovery: demoDiscovery,
}

export const demoCoursesView = {
  student: demoStudent,
  courses: demoCourses,
  summary: {
    total: demoCourses.length,
    favorites: demoCourses.filter(course => course.favorite).length,
    urgent: demoCourses.filter(course => course.urgent).length,
  },
}

export const demoCalendarView = {
  student: demoStudent,
  entries: demoTimeline,
  announcements: demoAnnouncements,
}

export const demoMessagesView = {
  student: demoStudent,
  messages: demoMessages,
  summary: {
    total: demoMessages.length,
    unread: demoMessages.filter(message => message.unread).length,
  },
}

export const demoAnnouncementsView = {
  student: demoStudent,
  announcements: demoAnnouncements,
  summary: {
    total: demoAnnouncements.length,
    warning: demoAnnouncements.filter(item => item.level === 'warning').length,
    info: demoAnnouncements.filter(item => item.level === 'info').length,
  },
}

function computeAverage(entries) {
  const gradedEntries = entries.filter(entry => typeof entry.score === 'number')

  if (!gradedEntries.length) {
    return null
  }

  const totals = gradedEntries.reduce((accumulator, entry) => ({
    coefficient: accumulator.coefficient + entry.coefficient,
    score: accumulator.score + ((entry.score / entry.outOf) * 20 * entry.coefficient),
  }), { coefficient: 0, score: 0 })

  return Number((totals.score / totals.coefficient).toFixed(1))
}

export const demoProfileView = {
  student: demoStudent,
  summary: {
    averageProgress: 56,
    favorites: demoCourses.filter(course => course.favorite).length,
    urgent: demoCourses.filter(course => course.urgent).length,
    unreadMessages: demoMessages.filter(message => message.unread).length,
    announcements: demoAnnouncements.length,
  },
  focusCourses: demoCourses.filter(course => course.favorite || course.urgent).slice(0, 4),
  upcomingEntries: demoTimeline.slice(0, 3),
}

const demoGradeCourses = demoCourses.map(course => {
  const evaluations = demoGrades.filter(entry => entry.courseCode === course.code)

  return {
    average: computeAverage(evaluations),
    courseCode: course.code,
    courseTitle: course.title,
    lastReturnedAt: evaluations.find(entry => entry.returnedAt)?.returnedAt ?? null,
    pendingCount: evaluations.filter(entry => entry.status !== 'published').length,
    publishedCount: evaluations.filter(entry => entry.status === 'published').length,
  }
})

export const demoAssignmentsView = {
  student: demoStudent,
  assignments: demoAssignments,
  summary: {
    total: demoAssignments.length,
    dueSoon: demoAssignments.filter(item => item.status === 'due_soon').length,
    inReview: demoAssignments.filter(item => item.status === 'in_review').length,
    completed: demoAssignments.filter(item => item.status === 'submitted').length,
  },
}

export const demoGradesView = {
  student: demoStudent,
  courses: demoGradeCourses,
  recentGrades: demoGrades.filter(entry => entry.status === 'published').slice(0, 5),
  summary: {
    globalAverage: computeAverage(demoGrades),
    pending: demoGrades.filter(entry => entry.status !== 'published').length,
    returned: demoGrades.filter(entry => entry.status === 'published').length,
  },
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
    : 'Aucune seance planifiee a court terme pour l instant.'

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

export const demoCourseDetails = Object.fromEntries(demoCourses.map(course => [
  course.code,
  {
    student: demoStudent,
    course,
    quickSummary: null,
    relatedEntries: [],
    relatedAnnouncements: [],
  },
]))

export const demoCalendarEntryDetails = Object.fromEntries(demoTimeline.map(entry => [
  entry.key,
  {
    student: demoStudent,
    entry,
    relatedCourse: demoCourses.find(course => course.title === entry.title) ?? null,
    announcements: [],
  },
]))

export const demoMessageDetails = Object.fromEntries(demoMessages.map(message => [
  message.slug,
  {
    student: demoStudent,
    message,
    relatedAnnouncements: [],
  },
]))

const demoCourseRelations = {
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

const demoAnnouncementRelations = {
  'erreur-de-salle-corrigee': {
    messageSlugs: ['ml-room-update'],
    entryKeys: ['machine-learning-wednesday'],
  },
  'qcm-final-publie': {
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

const demoAssignmentAnnouncementRelations = {
  'advanced-probability-quiz-4': ['quiz-probability-ouvert'],
  'blockchain-smart-contract-feedback': ['smart-contract-feedback-publie'],
  'machine-learning-forecasting-kickoff': ['erreur-de-salle-corrigee', 'qcm-final-publie'],
  'project-methodology-sprint-deck': ['project-review-room-update'],
  'cryptography-problem-set-2': ['cryptography-series-release'],
  'rust-borrow-checker-lab': ['rust-lab-checklist'],
}

for (const [courseCode, relations] of Object.entries(demoCourseRelations)) {
  if (demoCourseDetails[courseCode]) {
    demoCourseDetails[courseCode].relatedEntries = demoTimeline.filter(entry =>
      relations.entryKeys.includes(entry.key),
    )
    demoCourseDetails[courseCode].relatedAnnouncements = demoAnnouncements.filter(item =>
      relations.announcementSlugs.includes(item.slug),
    )
    demoCourseDetails[courseCode].quickSummary = buildCourseQuickSummary(
      demoCourseDetails[courseCode].course,
      demoCourseDetails[courseCode].relatedEntries,
      demoCourseDetails[courseCode].relatedAnnouncements,
    )
  }
}

for (const entry of demoTimeline) {
  const relatedAnnouncementSlugs = Object.entries(demoAnnouncementRelations)
    .filter(([, relations]) => relations.entryKeys.includes(entry.key))
    .map(([slug]) => slug)

  if (demoCalendarEntryDetails[entry.key]) {
    demoCalendarEntryDetails[entry.key].announcements = demoAnnouncements.filter(item =>
      relatedAnnouncementSlugs.includes(item.slug),
    )
  }
}

for (const message of demoMessages) {
  const relatedAnnouncementSlugs = Object.entries(demoAnnouncementRelations)
    .filter(([, relations]) => relations.messageSlugs.includes(message.slug))
    .map(([slug]) => slug)

  if (demoMessageDetails[message.slug]) {
    demoMessageDetails[message.slug].relatedAnnouncements = demoAnnouncements.filter(item =>
      relatedAnnouncementSlugs.includes(item.slug),
    )
  }
}

export const demoAssignmentDetails = Object.fromEntries(demoAssignments.map(assignment => [
  assignment.slug,
  {
    student: demoStudent,
    assignment,
    relatedAnnouncements: demoAnnouncements.filter(item =>
      (demoAssignmentAnnouncementRelations[assignment.slug] ?? []).includes(item.slug),
    ),
    relatedCourse: demoCourses.find(course => course.code === assignment.courseCode) ?? null,
  },
]))

export const demoGradeDetails = Object.fromEntries(demoCourses.map(course => {
  const evaluations = demoGrades.filter(entry => entry.courseCode === course.code)

  return [
    course.code,
    {
      student: demoStudent,
      course,
      evaluations,
      average: computeAverage(evaluations),
      relatedAssignments: demoAssignments.filter(item => item.courseCode === course.code),
    },
  ]
}))

export const demoAnnouncementDetails = Object.fromEntries(demoAnnouncements.map(announcement => [
  announcement.slug,
  {
    student: demoStudent,
    announcement,
    relatedMessages: demoMessages.filter(message =>
      demoAnnouncementRelations[announcement.slug]?.messageSlugs.includes(message.slug),
    ),
    relatedEntries: demoTimeline.filter(entry =>
      demoAnnouncementRelations[announcement.slug]?.entryKeys.includes(entry.key),
    ),
  },
]))

export const demoAdminView = {
  student: demoStudent,
  summary: {
    assignments: demoAssignments.length,
    courses: demoCourses.length,
    grades: demoGrades.length,
    announcements: demoAnnouncements.length,
    schedule: demoTimeline.length,
    messages: demoMessages.length,
  },
  sections: {
    assignments: demoAssignments,
    courses: demoCourses.map(course => ({
      code: course.code,
      title: course.title,
      category: course.category,
      accent: course.accent,
      glow: course.glow,
    })),
    grades: demoGrades,
    announcements: demoAnnouncements.map(item => ({
      slug: item.slug,
      title: item.title,
      detail: item.detail,
      level: item.level,
      publishedAt: item.publishedAt,
    })),
    schedule: demoTimeline.map(item => ({
      key: item.key,
      courseCode: item.title.includes('Machine Learning')
        ? 'MESIIN485925'
        : item.title.includes('Blockchain')
          ? 'MESIIN470625'
          : item.title.includes('Project Methodology')
            ? 'MESIGP470325'
            : item.title.includes('Public-key Cryptography')
              ? 'MESIIN484625'
        : item.title.includes('Rust')
          ? 'MESIIN473325'
          : item.title.includes('Advanced Probability')
            ? 'MESIFI470125'
            : null,
      title: item.title,
      detail: item.detail,
      timeLabel: item.time,
      startsAt: `2026-04-0${item.time.startsWith('Lun') ? '6' : item.time.startsWith('Mer') ? '8' : '10'}T08:30:00+02:00`,
    })),
    messages: demoMessages,
  },
}
