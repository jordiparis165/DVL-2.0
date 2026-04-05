<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import SchoolLockup from '../components/SchoolLockup.vue'
import { verifyEmailToken } from '../services/auth.js'

const route = useRoute()

const status = ref('loading')
const message = ref('')
const email = ref('')

const token = computed(() => {
  const value = route.query.token
  return typeof value === 'string' ? value : ''
})

async function runVerification() {
  if (!token.value) {
    status.value = 'error'
    message.value = 'Token de verification manquant.'
    return
  }

  status.value = 'loading'
  message.value = ''

  try {
    const response = await verifyEmailToken(token.value)
    status.value = 'success'
    message.value = response.message
    email.value = response.email
  } catch (error) {
    status.value = 'error'
    message.value = error.message
  }
}

onMounted(runVerification)
</script>

<template>
  <main class="verify-shell">
    <section class="verify-card">
      <div class="brand-block">
        <SchoolLockup />
      </div>

      <p class="eyebrow">
        Verification email
      </p>

      <template v-if="status === 'loading'">
        <h1>Validation en cours...</h1>
        <p class="copy">
          On verifie ton token et on active le compte.
        </p>
      </template>

      <template v-else-if="status === 'success'">
        <h1>Email valide.</h1>
        <p class="copy">
          {{ message }}
        </p>
        <p class="copy">
          Compte active : <strong>{{ email }}</strong>
        </p>
        <RouterLink class="primary-link" to="/login">
          Aller a la connexion
        </RouterLink>
      </template>

      <template v-else>
        <h1>Verification impossible.</h1>
        <p class="copy">
          {{ message }}
        </p>
        <div class="actions">
          <button class="primary-link button-link" type="button" @click="runVerification">
            Reessayer
          </button>
          <RouterLink class="secondary-link" to="/register">
            Retour a l inscription
          </RouterLink>
        </div>
      </template>
    </section>
  </main>
</template>

<style scoped>
.verify-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  width: min(100%, calc(100% - 24px));
  margin: 0 auto;
  padding: 24px 0;
}

.verify-card {
  width: min(100%, 620px);
  padding: 34px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 28px 64px rgba(148, 163, 184, 0.18);
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

.verify-card h1 {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1;
}

.copy {
  color: #475569;
  line-height: 1.65;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.primary-link,
.secondary-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 14px 18px;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 700;
}

.primary-link {
  border: 0;
  background: #111827;
  color: #f8fafc;
}

.secondary-link {
  background: rgba(255, 255, 255, 0.72);
  color: #111827;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}

.button-link {
  cursor: pointer;
}

@media (max-width: 720px) {
  .verify-card {
    padding: 22px;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
