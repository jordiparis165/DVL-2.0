import { beforeEach, describe, expect, it, vi } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

import App from '../App.vue'
import router from '../router/index.js'
import { demoOverview } from '../services/dashboard.js'

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the login view on /login', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(
      JSON.stringify({ error: 'Authentification requise' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      },
    )))

    await router.push('/login')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Connexion etudiante')
    expect(wrapper.text()).toContain('Explorer la demo')
  })

  it('renders the register view on /register', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/register')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Onboarding plus propre')
    expect(wrapper.get('[data-testid="register-email"]')).toBeTruthy()
  })

  it('renders the dashboard in demo mode and filters courses', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/dashboard?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()
    await wrapper.get('[data-testid="search-input"]').setValue('rust')

    expect(wrapper.text()).toContain('Bonjour, Jordi')
    expect(wrapper.findAll('[data-testid="course-card"]')).toHaveLength(1)
    expect(wrapper.text()).toContain('Rust Programming')
  })

  it('hides the admin navigation for a student session', async () => {
    const studentOverview = JSON.parse(JSON.stringify(demoOverview))
    studentOverview.student.role = 'student'

    vi.stubGlobal('fetch', vi.fn(async (input) => {
      const url = typeof input === 'string' ? input : input.url

      if (url.endsWith('/auth/session')) {
        return new Response(
          JSON.stringify({
            user: {
              _id: 'student-1',
              email: 'student@example.com',
              emailVerified: true,
              role: 'student',
              username: 'Jordi',
            },
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      if (url.endsWith('/dashboard/overview')) {
        return new Response(JSON.stringify(studentOverview), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }))

    await router.push('/dashboard')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.find('a[href="/admin"]').exists()).toBe(false)
  })

  it('renders the calendar view in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/calendar?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Calendrier')
    expect(wrapper.findAll('[data-testid="calendar-entry"]')).toHaveLength(7)
  })

  it('renders the course detail page in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/courses/MESIIN473325?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Rust Programming')
    expect(wrapper.text()).toContain('Sessions liees')
  })

  it('renders the grades view in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/grades?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Mes notes')
    expect(wrapper.findAll('[data-testid="grade-card"]')).toHaveLength(6)
  })

  it('renders the assignments view in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/assignments?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Devoirs')
    expect(wrapper.findAll('[data-testid="assignment-card"]')).toHaveLength(6)
  })

  it('fills the blockchain course detail with linked schedule and announcements', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/courses/MESIIN470625?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Blockchain Programming')
    expect(wrapper.text()).toContain('Mar 10:15')
    expect(wrapper.text()).toContain('Feedback smart contract disponible')
    expect(wrapper.text()).toContain('Chaque cours en 30 secondes')
    expect(wrapper.text()).toContain('Priorite actuelle: TP smart contract feedback.')
  })

  it('renders the grade detail page in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/grades/MESIIN470625?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Blockchain Programming')
    expect(wrapper.text()).toContain('Smart Contract TP')
    expect(wrapper.text()).toContain('TP Smart Contract Feedback')
  })

  it('renders the assignment detail page in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/assignments/blockchain-smart-contract-feedback?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('TP Smart Contract Feedback')
    expect(wrapper.text()).toContain('Feedback smart contract disponible')
  })

  it('verifies an email token from the verification route', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(
      JSON.stringify({
        message: 'Adresse email validee avec succes',
        email: 'jordi@demo.local',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )))

    await router.push('/verify-email?token=abc123')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Email valide.')
    expect(wrapper.text()).toContain('jordi@demo.local')
  })

  it('renders the messages view in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/messages?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Messages')
    expect(wrapper.findAll('[data-testid="message-card"]')).toHaveLength(7)
  })

  it('renders the announcements view in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/announcements?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Annonces')
    expect(wrapper.findAll('[data-testid="announcement-card"]')).toHaveLength(8)
  })

  it('renders the message detail page in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/messages/ml-room-update?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Machine Learning : changement de salle')
    expect(wrapper.text()).toContain('Annonces associees')
  })

  it('renders the announcement detail page in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/announcements/erreur-de-salle-corrigee?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Erreur de salle corrigee')
    expect(wrapper.text()).toContain('Conversations associees')
  })

  it('renders the profile view in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/profile?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Jordi')
    expect(wrapper.text()).toContain('Profil etudiant')
    expect(wrapper.text()).toContain('Cours a garder en vue')
  })

  it('renders the forbidden view', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/forbidden')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Acces refuse')
    expect(wrapper.text()).toContain('Retour au dashboard')
  })

  it('renders the admin view in demo mode', async () => {
    vi.stubGlobal('fetch', vi.fn())

    await router.push('/admin?demo=1')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Admin content studio')
    expect(wrapper.text()).toContain('Collections')
    expect(wrapper.text()).toContain('Advanced Probability')
  })
})
