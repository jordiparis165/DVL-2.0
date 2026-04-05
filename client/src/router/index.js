import { createRouter, createWebHistory } from 'vue-router'

import AdminView from '../views/AdminView.vue'
import AssignmentDetailView from '../views/AssignmentDetailView.vue'
import AssignmentsView from '../views/AssignmentsView.vue'
import AnnouncementsView from '../views/AnnouncementsView.vue'
import AnnouncementDetailView from '../views/AnnouncementDetailView.vue'
import CalendarEntryDetailView from '../views/CalendarEntryDetailView.vue'
import CalendarView from '../views/CalendarView.vue'
import CourseDetailView from '../views/CourseDetailView.vue'
import CoursesView from '../views/CoursesView.vue'
import DashboardView from '../views/DashboardView.vue'
import ForbiddenView from '../views/ForbiddenView.vue'
import GradeDetailView from '../views/GradeDetailView.vue'
import GradesView from '../views/GradesView.vue'
import LoginView from '../views/LoginView.vue'
import MessageDetailView from '../views/MessageDetailView.vue'
import MessagesView from '../views/MessagesView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import VerifyEmailView from '../views/VerifyEmailView.vue'

const baseTitle = 'DVL Next | ESILV'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Connexion' },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: 'Inscription' },
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmailView,
      meta: { title: 'Verification email' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { title: 'Dashboard' },
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
      meta: { title: 'Acces refuse' },
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView,
      meta: { title: 'Cours' },
    },
    {
      path: '/courses/:code',
      name: 'course-detail',
      component: CourseDetailView,
      meta: { title: 'Detail du cours' },
    },
    {
      path: '/grades',
      name: 'grades',
      component: GradesView,
      meta: { title: 'Notes' },
    },
    {
      path: '/grades/:courseCode',
      name: 'grade-detail',
      component: GradeDetailView,
      meta: { title: 'Detail des notes' },
    },
    {
      path: '/assignments',
      name: 'assignments',
      component: AssignmentsView,
      meta: { title: 'Devoirs' },
    },
    {
      path: '/assignments/:slug',
      name: 'assignment-detail',
      component: AssignmentDetailView,
      meta: { title: 'Detail du devoir' },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      meta: { title: 'Calendrier' },
    },
    {
      path: '/calendar/:key',
      name: 'calendar-entry-detail',
      component: CalendarEntryDetailView,
      meta: { title: 'Detail planning' },
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView,
      meta: { title: 'Messages' },
    },
    {
      path: '/messages/:slug',
      name: 'message-detail',
      component: MessageDetailView,
      meta: { title: 'Detail du message' },
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: AnnouncementsView,
      meta: { title: 'Annonces' },
    },
    {
      path: '/announcements/:slug',
      name: 'announcement-detail',
      component: AnnouncementDetailView,
      meta: { title: 'Detail de l annonce' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { title: 'Profil' },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { title: 'Administration' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

router.afterEach((to) => {
  const pageTitle = typeof to.meta.title === 'string'
    ? `${to.meta.title} | ESILV | DVL Next`
    : baseTitle

  document.title = pageTitle
})

export default router
