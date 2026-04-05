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
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmailView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesView,
    },
    {
      path: '/courses/:code',
      name: 'course-detail',
      component: CourseDetailView,
    },
    {
      path: '/grades',
      name: 'grades',
      component: GradesView,
    },
    {
      path: '/grades/:courseCode',
      name: 'grade-detail',
      component: GradeDetailView,
    },
    {
      path: '/assignments',
      name: 'assignments',
      component: AssignmentsView,
    },
    {
      path: '/assignments/:slug',
      name: 'assignment-detail',
      component: AssignmentDetailView,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/calendar/:key',
      name: 'calendar-entry-detail',
      component: CalendarEntryDetailView,
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView,
    },
    {
      path: '/messages/:slug',
      name: 'message-detail',
      component: MessageDetailView,
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: AnnouncementsView,
    },
    {
      path: '/announcements/:slug',
      name: 'announcement-detail',
      component: AnnouncementDetailView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

export default router
