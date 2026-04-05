<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import SchoolLockup from '../components/SchoolLockup.vue'
import { registerUser, resendVerificationEmail } from '../services/auth.js'

const form = reactive({
  username: '',
  email: '',
  password: '',
})

const pending = ref(false)
const resendPending = ref(false)
const errorMessage = ref('')
const resendMessage = ref('')
const successPayload = ref(null)

async function submitRegistration() {
  pending.value = true
  errorMessage.value = ''
  resendMessage.value = ''

  try {
    successPayload.value = await registerUser(form)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    pending.value = false
  }
}

async function resendVerification() {
  resendPending.value = true
  resendMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await resendVerificationEmail({
      email: successPayload.value?.email ?? form.email,
    })
    resendMessage.value = response.message
    if (response.verificationUrl) {
      successPayload.value = {
        ...successPayload.value,
        ...response,
      }
    }
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    resendPending.value = false
  }
}
</script>

<template>
  <main class="register-shell">
    <section class="intro-card">
      <div class="brand-block">
        <SchoolLockup />
      </div>

      <p class="eyebrow">
        Nouvelle inscription
      </p>
      <h1>Onboarding plus propre que le DVL actuel.</h1>
      <p class="hero-copy">
        Cree un compte, valide ton email, puis accede au dashboard. En dev, le
        lien de verification est affiche directement pour aller vite.
      </p>

      <ul class="benefit-list">
        <li>Compte securise avec verification email obligatoire.</li>
        <li>Dashboard personnel pret des la premiere connexion.</li>
        <li>Flux utilisable meme sans SMTP reel grace au debug local.</li>
      </ul>
    </section>

    <section class="form-column">
      <form v-if="!successPayload" class="register-card" @submit.prevent="submitRegistration">
        <div>
          <p class="eyebrow">
            Creation de compte
          </p>
          <h2>Rejoindre DVL Next</h2>
        </div>

        <label class="field">
          <span>Username</span>
          <input
            v-model="form.username"
            data-testid="register-username"
            type="text"
            placeholder="jordi"
            required
          >
        </label>

        <label class="field">
          <span>Email</span>
          <input
            v-model="form.email"
            data-testid="register-email"
            type="email"
            placeholder="prenom.nom@edu.devinci.fr"
            required
          >
        </label>

        <label class="field">
          <span>Mot de passe</span>
          <input
            v-model="form.password"
            data-testid="register-password"
            type="password"
            placeholder="Choisis un mot de passe solide"
            required
          >
        </label>

        <p v-if="errorMessage" class="error-banner">
          {{ errorMessage }}
        </p>

        <button class="primary-action" type="submit" :disabled="pending">
          {{ pending ? 'Creation...' : 'Creer mon compte' }}
        </button>

        <RouterLink class="secondary-link" to="/login">
          J ai deja un compte
        </RouterLink>
      </form>

      <article v-else class="register-card success-card">
        <div>
          <p class="eyebrow">
            Compte cree
          </p>
          <h2>Verification email en attente</h2>
          <p class="hero-copy">
            {{ successPayload.message }}
          </p>
          <p class="meta-line">
            Compte : <strong>{{ successPayload.email }}</strong>
          </p>
        </div>

        <a
          v-if="successPayload.verificationUrl"
          class="primary-action"
          :href="successPayload.verificationUrl"
        >
          Valider mon email maintenant
        </a>

        <button class="secondary-link button-link" type="button" :disabled="resendPending" @click="resendVerification">
          {{ resendPending ? 'Renvoi...' : 'Renvoyer le mail de verification' }}
        </button>

        <p v-if="resendMessage" class="success-banner">
          {{ resendMessage }}
        </p>

        <p class="debug-note">
          En local, le lien de verification est expose pour accelerer les tests du parcours.
        </p>

        <RouterLink class="secondary-link" to="/login">
          Retour a la connexion
        </RouterLink>
      </article>
    </section>
  </main>
</template>

<style scoped>
.register-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 520px);
  gap: 24px;
  align-items: center;
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0;
}

.intro-card,
.register-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 28px 64px rgba(148, 163, 184, 0.18);
}

.intro-card {
  padding: 36px;
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

.intro-card h1,
.register-card h2 {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
}

.intro-card h1 {
  font-size: clamp(2.4rem, 4.6vw, 4.4rem);
  line-height: 1;
}

.hero-copy,
.meta-line,
.debug-note {
  color: #475569;
  line-height: 1.65;
}

.benefit-list {
  display: grid;
  gap: 12px;
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
}

.benefit-list li {
  padding: 16px 18px;
  border-radius: 20px;
  background: #f8fafc;
  color: #334155;
}

.register-card {
  display: grid;
  gap: 18px;
  padding: 30px;
}

.success-card {
  align-content: start;
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

.secondary-link {
  background: rgba(255, 255, 255, 0.72);
  color: #111827;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}

.button-link {
  border: 0;
  cursor: pointer;
}

.button-link:disabled,
.primary-action:disabled {
  opacity: 0.7;
  cursor: wait;
}

.error-banner,
.success-banner {
  margin: 0;
  padding: 14px 16px;
  border-radius: 16px;
}

.error-banner {
  background: #fef2f2;
  color: #b91c1c;
}

.success-banner {
  background: #ecfdf5;
  color: #047857;
}

@media (max-width: 960px) {
  .register-shell {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .register-shell {
    width: min(100%, calc(100% - 24px));
    padding: 12px 0;
  }

  .intro-card,
  .register-card {
    padding: 22px;
  }
}
</style>
