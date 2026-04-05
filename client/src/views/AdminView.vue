<script setup>
import { computed, ref, watch } from 'vue'

import AppTopbar from '../components/AppTopbar.vue'
import { useProtectedResource } from '../composables/useProtectedResource.js'
import {
  createAdminResource,
  demoAdminView,
  fetchAdminView,
  updateAdminResource,
} from '../services/dashboard.js'

const resourceConfig = {
  assignments: {
    label: 'Devoirs',
    identifier: 'slug',
    fields: ['slug', 'courseCode', 'title', 'detail', 'status', 'priority', 'dueAt', 'submittedAt'],
    defaults: {
      slug: '',
      courseCode: '',
      title: '',
      detail: '',
      status: 'not_started',
      priority: 'medium',
      dueAt: new Date().toISOString(),
      submittedAt: '',
    },
  },
  courses: {
    label: 'Cours',
    identifier: 'code',
    fields: ['code', 'title', 'category', 'accent', 'glow'],
    defaults: {
      code: '',
      title: '',
      category: '',
      accent: '#111827',
      glow: '#93c5fd',
    },
  },
  grades: {
    label: 'Notes',
    identifier: 'slug',
    fields: ['slug', 'courseCode', 'title', 'type', 'score', 'outOf', 'coefficient', 'status', 'returnedAt'],
    defaults: {
      slug: '',
      courseCode: '',
      title: '',
      type: 'quiz',
      score: '',
      outOf: 20,
      coefficient: 1,
      status: 'pending',
      returnedAt: '',
    },
  },
  announcements: {
    label: 'Annonces',
    identifier: 'slug',
    fields: ['slug', 'title', 'detail', 'level', 'publishedAt'],
    defaults: {
      slug: '',
      title: '',
      detail: '',
      level: 'info',
      publishedAt: new Date().toISOString(),
    },
  },
  schedule: {
    label: 'Calendrier',
    identifier: 'key',
    fields: ['key', 'courseCode', 'title', 'detail', 'timeLabel', 'startsAt'],
    defaults: {
      key: '',
      courseCode: '',
      title: '',
      detail: '',
      timeLabel: '',
      startsAt: new Date().toISOString(),
    },
  },
  messages: {
    label: 'Messages',
    identifier: 'slug',
    fields: ['slug', 'sender', 'subject', 'preview', 'tone', 'unread', 'receivedAt'],
    defaults: {
      slug: '',
      sender: '',
      subject: '',
      preview: '',
      tone: 'info',
      unread: true,
      receivedAt: new Date().toISOString(),
    },
  },
}

const activeResource = ref('courses')
const selectedId = ref('')
const draft = ref({})
const isCreating = ref(false)
const feedback = ref('')
const savePending = ref(false)

const {
  auth,
  data,
  errorMessage,
  handleLogout,
  loadResource,
  loading,
  openDemo,
} = useProtectedResource({
  forbiddenRedirect: '/forbidden',
  loader: fetchAdminView,
  demoData: demoAdminView,
  demoRoute: '/admin',
  requiredRole: 'admin',
})

const payload = computed(() => data.value ?? demoAdminView)
const resourceItems = computed(() => payload.value.sections[activeResource.value] ?? [])
const currentConfig = computed(() => resourceConfig[activeResource.value])

const selectedItem = computed(() => {
  const key = currentConfig.value.identifier
  return resourceItems.value.find(item => item[key] === selectedId.value) ?? null
})

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function syncDraftFromSelection() {
  feedback.value = ''

  if (isCreating.value) {
    draft.value = clone(currentConfig.value.defaults)
    return
  }

  if (!selectedItem.value && resourceItems.value.length > 0) {
    selectedId.value = resourceItems.value[0][currentConfig.value.identifier]
  }

  draft.value = selectedItem.value ? clone(selectedItem.value) : clone(currentConfig.value.defaults)
}

watch(
  [activeResource, resourceItems],
  () => {
    if (!resourceItems.value.some(item => item[currentConfig.value.identifier] === selectedId.value)) {
      selectedId.value = resourceItems.value[0]?.[currentConfig.value.identifier] ?? ''
    }

    if (!isCreating.value) {
      syncDraftFromSelection()
    }
  },
  { immediate: true },
)

watch(selectedItem, () => {
  if (!isCreating.value) {
    syncDraftFromSelection()
  }
})

function selectItem(id) {
  isCreating.value = false
  selectedId.value = id
  syncDraftFromSelection()
}

function startCreate() {
  isCreating.value = true
  feedback.value = ''
  draft.value = clone(currentConfig.value.defaults)
}

function updateLocalSummary(resource) {
  const sections = payload.value.sections
  payload.value.summary = {
    assignments: sections.assignments.length,
    courses: sections.courses.length,
    grades: sections.grades.length,
    announcements: sections.announcements.length,
    schedule: sections.schedule.length,
    messages: sections.messages.length,
  }
  activeResource.value = resource
}

async function saveDraft() {
  const resource = activeResource.value
  const key = currentConfig.value.identifier

  savePending.value = true
  feedback.value = ''

  try {
    if (auth.isDemo) {
      if (isCreating.value) {
        payload.value.sections[resource].unshift(clone(draft.value))
        isCreating.value = false
        selectedId.value = draft.value[key]
      } else {
        const index = payload.value.sections[resource]
          .findIndex(item => item[key] === selectedId.value)

        payload.value.sections[resource][index] = clone(draft.value)
        selectedId.value = draft.value[key]
      }

      updateLocalSummary(resource)
      feedback.value = 'Modification sauvegardee en mode demo.'
      return
    }

    if (isCreating.value) {
      const response = await createAdminResource(resource, draft.value)
      payload.value.sections[resource].unshift(response.document)
      selectedId.value = response.document[key]
      isCreating.value = false
    } else {
      const response = await updateAdminResource(resource, selectedId.value, draft.value)
      const index = payload.value.sections[resource]
        .findIndex(item => item[key] === selectedId.value)

      payload.value.sections[resource][index] = response.document
      selectedId.value = response.document[key]
    }

    updateLocalSummary(resource)
    feedback.value = 'Modification sauvegardee.'
  } catch (error) {
    feedback.value = error.message
  } finally {
    savePending.value = false
  }
}
</script>

<template>
  <main class="shell">
    <AppTopbar :student="payload.student" :mode="auth.mode" @logout="handleLogout" />

    <section v-if="loading" class="hero single">
      <div class="panel">
        <p class="eyebrow">
          Chargement
        </p>
        <h1>Ouverture de l espace admin...</h1>
      </div>
    </section>

    <section v-else-if="errorMessage" class="hero single">
      <div class="panel">
        <p class="eyebrow">
          API indisponible
        </p>
        <h1>Impossible de charger l administration.</h1>
        <p class="copy">
          {{ errorMessage }}
        </p>
        <div class="actions">
          <button class="primary-action" type="button" @click="loadResource">
            Reessayer
          </button>
          <button class="secondary-action" type="button" @click="openDemo">
            Ouvrir la demo
          </button>
        </div>
      </div>
    </section>

    <template v-else>
      <section class="hero">
        <div class="panel panel-wide">
          <p class="eyebrow">
            Operations
          </p>
          <h1>Admin content studio</h1>
          <p class="copy">
            Pilote les contenus structurants de la plateforme sans retourner dans le code.
          </p>
        </div>

        <div class="stat-grid">
          <article class="stat-card">
            <span>Devoirs</span>
            <strong>{{ payload.summary.assignments }}</strong>
          </article>
          <article class="stat-card">
            <span>Cours</span>
            <strong>{{ payload.summary.courses }}</strong>
          </article>
          <article class="stat-card">
            <span>Notes</span>
            <strong>{{ payload.summary.grades }}</strong>
          </article>
          <article class="stat-card">
            <span>Calendrier</span>
            <strong>{{ payload.summary.schedule }}</strong>
          </article>
          <article class="stat-card">
            <span>Messages</span>
            <strong>{{ payload.summary.messages }}</strong>
          </article>
          <article class="stat-card stat-card-alert">
            <span>Annonces</span>
            <strong>{{ payload.summary.announcements }}</strong>
          </article>
        </div>
      </section>

      <section class="workspace">
        <aside class="panel sidebar">
          <div class="section-heading">
            <div>
              <p class="eyebrow">
                Ressources
              </p>
              <h2>Collections</h2>
            </div>
            <button class="secondary-action compact" type="button" @click="startCreate">
              Nouveau
            </button>
          </div>

          <div class="resource-tabs">
            <button
              v-for="(config, key) in resourceConfig"
              :key="key"
              type="button"
              class="resource-tab"
              :class="{ active: activeResource === key }"
              @click="activeResource = key; isCreating = false"
            >
              {{ config.label }}
            </button>
          </div>

          <div class="record-list">
            <button
              v-for="item in resourceItems"
              :key="item[currentConfig.identifier]"
              type="button"
              class="record-item"
              :class="{ active: !isCreating && selectedId === item[currentConfig.identifier] }"
              @click="selectItem(item[currentConfig.identifier])"
            >
              <strong>{{ item.title ?? item.subject ?? item.key ?? item.code ?? item.slug }}</strong>
              <small>{{ item[currentConfig.identifier] }}</small>
            </button>
          </div>
        </aside>

        <section class="panel editor">
          <div class="section-heading">
            <div>
              <p class="eyebrow">
                Edition
              </p>
              <h2>{{ isCreating ? 'Nouveau document' : 'Document selectionne' }}</h2>
            </div>
          </div>

          <div class="form-grid">
            <label
              v-for="field in currentConfig.fields"
              :key="field"
              class="field"
            >
              <span>{{ field }}</span>
              <textarea
                v-if="field === 'detail' || field === 'preview'"
                v-model="draft[field]"
                rows="4"
              />
              <input
                v-else-if="field !== 'unread'"
                v-model="draft[field]"
                :type="field.includes('At') ? 'datetime-local' : 'text'"
              >
              <input
                v-else
                v-model="draft[field]"
                type="checkbox"
                class="checkbox"
              >
            </label>
          </div>

          <p v-if="feedback" class="feedback">
            {{ feedback }}
          </p>

          <div class="actions">
            <button class="primary-action" type="button" :disabled="savePending" @click="saveDraft">
              {{ savePending ? 'Sauvegarde...' : isCreating ? 'Creer' : 'Sauvegarder' }}
            </button>
            <button class="secondary-action" type="button" @click="syncDraftFromSelection">
              Reinitialiser
            </button>
          </div>
        </section>
      </section>
    </template>
  </main>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  padding: 24px;
}

.hero,
.workspace {
  width: min(1360px, 100%);
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.9fr);
  gap: 20px;
  padding: 24px 0 20px;
}

.single {
  grid-template-columns: 1fr;
}

.panel,
.stat-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 28px 64px rgba(148, 163, 184, 0.16);
}

.panel {
  padding: 28px;
}

.panel-wide h1,
.section-heading h2 {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
}

.panel-wide h1 {
  font-size: clamp(2.2rem, 5vw, 4rem);
}

.eyebrow {
  margin: 0 0 6px;
  color: #92400e;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.copy,
.feedback {
  color: #475569;
  line-height: 1.65;
}

.actions,
.section-heading,
.resource-tabs {
  display: flex;
  gap: 12px;
  align-items: center;
}

.primary-action,
.secondary-action,
.resource-tab,
.record-item {
  border: 0;
  cursor: pointer;
  border-radius: 16px;
}

.primary-action,
.secondary-action,
.resource-tab {
  padding: 12px 16px;
  font-weight: 700;
}

.compact {
  padding: 10px 14px;
}

.primary-action {
  background: #111827;
  color: #f8fafc;
}

.secondary-action {
  background: rgba(255, 255, 255, 0.72);
  color: #111827;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}

.stat-grid {
  display: grid;
  gap: 16px;
}

.stat-card {
  padding: 22px;
}

.stat-card span {
  color: #64748b;
}

.stat-card strong {
  display: block;
  margin-top: 10px;
  font-size: 2rem;
  font-family: 'Space Grotesk', sans-serif;
}

.stat-card-alert {
  background: linear-gradient(135deg, #fff7ed, #ffedd5);
}

.workspace {
  display: grid;
  grid-template-columns: minmax(280px, 360px) 1fr;
  gap: 20px;
}

.sidebar,
.editor {
  display: grid;
  align-content: start;
  gap: 18px;
}

.resource-tabs {
  flex-wrap: wrap;
}

.resource-tab {
  background: rgba(255, 255, 255, 0.76);
  color: #334155;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.2);
}

.resource-tab.active {
  background: #111827;
  color: #f8fafc;
}

.record-list {
  display: grid;
  gap: 10px;
  max-height: 520px;
  overflow: auto;
}

.record-item {
  display: grid;
  gap: 4px;
  padding: 14px;
  background: #f8fafc;
  text-align: left;
}

.record-item strong {
  color: #111827;
}

.record-item small {
  color: #64748b;
}

.record-item.active {
  box-shadow: inset 3px 0 0 #f59e0b;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: grid;
  gap: 10px;
}

.field span {
  font-weight: 700;
  color: #334155;
  text-transform: capitalize;
}

.field input,
.field textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 16px;
  background: rgba(248, 250, 252, 0.82);
  outline: none;
}

.field textarea {
  resize: vertical;
}

.checkbox {
  width: 20px;
  height: 20px;
}

@media (max-width: 1080px) {
  .hero,
  .workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .shell {
    padding: 14px;
  }

  .panel {
    padding: 18px;
  }

  .actions,
  .section-heading {
    flex-direction: column;
    align-items: stretch;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
