<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import SchoolLockup from '../components/SchoolLockup.vue'
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const pending = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  try {
    await auth.restoreSession()
    if (auth.isAuthenticated) {
      await router.replace('/dashboard')
    }
  } catch {
    auth.bootstrapped = true
  }
})

async function submitLogin() {
  errorMessage.value = ''
  pending.value = true

  try {
    await auth.login(form)
    await router.push('/dashboard')
  } catch (error) {
    if (error.status === 429) {
      errorMessage.value = 'Trop de tentatives. Attends un peu avant de reessayer.'
      return
    }

    errorMessage.value = error.message
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <main class="login-shell">
    <section class="brand-column">
      <div class="brand-block">
        <SchoolLockup />
      </div>

      <div class="hero-card">
        <p class="eyebrow">
          Repenser l experience etudiante
        </p>
        <h1>Connexion etudiante, mais avec une vraie priorisation.</h1>
        <p class="hero-text">
          On garde la logique DVL, mais on retire le bruit. Les rendus, les
          changements de salle et les cours critiques passent en premier.
        </p>

        <ul class="feature-list">
          <li>Dashboard alimente par l API une fois connecte.</li>
          <li>Vue demo disponible pour iterer sans dependance serveur.</li>
          <li>Structure front deja prete pour brancher vraies pages et vraies donnees.</li>
        </ul>
      </div>
    </section>

    <section class="login-column">
      <form class="login-card" @submit.prevent="submitLogin">
        <div>
          <p class="eyebrow">
            Authentification
          </p>
          <h2>Acceder a votre espace</h2>
          <p class="card-copy">
            Connecte-toi avec le back Fastify. Si l API n est pas lancee, ouvre la demo.
          </p>
        </div>

        <label class="field">
          <span>Email</span>
          <input
            v-model="form.email"
            data-testid="login-email"
            type="email"
            autocomplete="email"
            placeholder="prenom.nom@edu.devinci.fr"
            required
          >
        </label>

        <label class="field">
          <span>Mot de passe</span>
          <input
            v-model="form.password"
            data-testid="login-password"
            type="password"
            autocomplete="current-password"
            placeholder="Votre mot de passe"
            required
          >
        </label>

        <p v-if="errorMessage" class="error-banner">
          {{ errorMessage }}
        </p>

        <button class="primary-action" type="submit" :disabled="pending">
          {{ pending ? 'Connexion...' : 'Se connecter' }}
        </button>

        <RouterLink class="secondary-link" to="/dashboard?demo=1">
          Explorer la demo
        </RouterLink>

        <RouterLink class="text-link" to="/register">
          Creer un compte
        </RouterLink>
      </form>
    </section>
  </main>
</template>

<style scoped>
.login-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(360px, 480px);
  gap: 24px;
  align-items: center;
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0;
}

.brand-column,
.login-column {
  min-width: 0;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #92400e;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-card,
.login-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 28px 64px rgba(148, 163, 184, 0.18);
}

.hero-card {
  padding: 36px;
}

.hero-card h1,
.login-card h2 {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
}

.hero-card h1 {
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  line-height: 0.98;
}

.hero-text,
.card-copy {
  margin: 18px 0 0;
  color: #475569;
  line-height: 1.7;
}

.feature-list {
  display: grid;
  gap: 14px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.feature-list li {
  position: relative;
  padding: 16px 18px 16px 44px;
  border-radius: 20px;
  background: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.feature-list li::before {
  content: '';
  position: absolute;
  top: 23px;
  left: 18px;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.login-card {
  display: grid;
  gap: 18px;
  padding: 30px;
}

.field {
  display: grid;
  gap: 10px;
}

.field span {
  font-weight: 700;
  color: #334155;
}

.field input {
  width: 100%;
  padding: 15px 18px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.82);
  outline: none;
}

.field input:focus {
  border-color: rgba(245, 158, 11, 0.9);
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.14);
}

.primary-action,
.secondary-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 14px 18px;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 700;
}

.primary-action {
  border: 0;
  cursor: pointer;
  background: #111827;
  color: #f8fafc;
  box-shadow: 0 18px 30px rgba(17, 24, 39, 0.18);
}

.primary-action:disabled {
  opacity: 0.7;
  cursor: wait;
}

.secondary-link {
  background: rgba(255, 255, 255, 0.72);
  color: #111827;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}

.text-link {
  color: #475569;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
}

.error-banner {
  margin: 0;
  padding: 14px 16px;
  border-radius: 16px;
  background: #fef2f2;
  color: #b91c1c;
}

@media (max-width: 960px) {
  .login-shell {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .login-shell {
    width: min(100%, calc(100% - 24px));
    padding: 12px 0;
  }

  .hero-card,
  .login-card {
    padding: 22px;
  }
}
</style>
