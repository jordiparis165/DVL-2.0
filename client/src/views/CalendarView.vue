<script setup>
import { computed } from 'vue'

import AppTopbar from '../components/AppTopbar.vue'
import { useProtectedResource } from '../composables/useProtectedResource.js'
import { demoCalendarView, fetchCalendarView } from '../services/dashboard.js'

const {
  auth,
  data,
  errorMessage,
  handleLogout,
  loadResource,
  loading,
  openDemo,
} = useProtectedResource({
  loader: fetchCalendarView,
  demoData: demoCalendarView,
  demoRoute: '/calendar',
})

const payload = computed(() => data.value ?? demoCalendarView)

const hourStart = 8
const hourEnd = 19
const rowHeight = 58
const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const dayOrderByLabel = {
  Lun: 1,
  Mar: 2,
  Mer: 3,
  Jeu: 4,
  Ven: 5,
  Sam: 6,
}

function resolveEntryStart(entry) {
  const directDate = new Date(entry.startsAt)

  if (!Number.isNaN(directDate.getTime())) {
    return directDate
  }

  const [dayLabel = 'Lun', timeLabel = '08:00'] = (entry.time ?? '').split(' ')
  const [hours = '08', minutes = '00'] = timeLabel.split(':')
  const dayIndex = dayOrderByLabel[dayLabel] ?? 1
  const dayOfMonth = String(5 + dayIndex).padStart(2, '0')
  const fallbackDate = new Date(`2026-04-${dayOfMonth}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00+02:00`)

  return Number.isNaN(fallbackDate.getTime()) ? new Date('2026-04-06T08:00:00+02:00') : fallbackDate
}

const hydratedEntries = computed(() =>
  payload.value.entries
    .map((entry) => {
      const startsAt = resolveEntryStart(entry)
      const startHour = startsAt.getHours()
      const startMinute = startsAt.getMinutes()
      const durationMinutes = entry.title.toLowerCase().includes('point projet') ? 60 : 90

      return {
        ...entry,
        startsAt,
        timestamp: startsAt.getTime(),
        dayIndex: startsAt.getDay(),
        dayKey: startsAt.toISOString().slice(0, 10),
        dayLabel: dayNames[startsAt.getDay()],
        dateLabel: startsAt.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
        }),
        startHour,
        startMinute,
        durationMinutes,
      }
    })
    .sort((left, right) => left.timestamp - right.timestamp),
)

const visibleDayIndexes = computed(() =>
  [...new Set(hydratedEntries.value.map(entry => entry.dayIndex))]
    .filter(dayIndex => dayIndex >= 1 && dayIndex <= 6)
    .sort((left, right) => left - right),
)

const weekDays = computed(() => {
  const byIndex = new Map()

  for (const entry of hydratedEntries.value) {
    if (!byIndex.has(entry.dayIndex)) {
      byIndex.set(entry.dayIndex, {
        dayIndex: entry.dayIndex,
        dayKey: entry.dayKey,
        dayLabel: entry.dayLabel,
        dateLabel: entry.dateLabel,
      })
    }
  }

  return visibleDayIndexes.value.map(dayIndex => byIndex.get(dayIndex)).filter(Boolean)
})

const sessionsByDayIndex = computed(() => {
  const countByDay = new Map()

  for (const entry of hydratedEntries.value) {
    countByDay.set(entry.dayIndex, (countByDay.get(entry.dayIndex) ?? 0) + 1)
  }

  return countByDay
})

const dayColumnByIndex = computed(() =>
  new Map(weekDays.value.map((day, index) => [day.dayIndex, index + 2])),
)

const boardEntries = computed(() =>
  hydratedEntries.value.map((entry) => ({
    ...entry,
    style: {
      gridColumn: `${dayColumnByIndex.value.get(entry.dayIndex) ?? 2}`,
      gridRow: `${((entry.startHour - hourStart) * 2) + Math.floor(entry.startMinute / 30) + 2} / span ${Math.max(2, Math.ceil(entry.durationMinutes / 30))}`,
    },
  })),
)

const boardBodyRowSpan = computed(() => (hourEnd - hourStart + 1) * 2)

const timeSlots = computed(() =>
  Array.from({ length: hourEnd - hourStart + 1 }, (_, index) => `${String(hourStart + index).padStart(2, '0')}:00`),
)

const boardColumns = computed(() => `96px repeat(${Math.max(weekDays.value.length, 1)}, minmax(190px, 1fr))`)
const boardRows = computed(() => `68px repeat(${(hourEnd - hourStart + 1) * 2}, ${rowHeight / 2}px)`)

const nextEntries = computed(() => hydratedEntries.value.slice(0, 5))
const upcomingEntry = computed(() => hydratedEntries.value[0] ?? null)

const busiestDay = computed(() => {
  let selectedDay = null
  let maxSessions = 0

  for (const day of weekDays.value) {
    const count = sessionsByDayIndex.value.get(day.dayIndex) ?? 0

    if (count > maxSessions) {
      maxSessions = count
      selectedDay = day
    }
  }

  return selectedDay
})

const weekRangeLabel = computed(() => {
  if (weekDays.value.length === 0) {
    return 'Aucune session cette semaine'
  }

  const firstDay = weekDays.value[0]
  const lastDay = weekDays.value.at(-1)

  return `${firstDay.dayLabel} ${firstDay.dateLabel} au ${lastDay.dayLabel} ${lastDay.dateLabel}`
})

function entryLocation(key) {
  return auth.isDemo
    ? { path: `/calendar/${key}`, query: { demo: '1' } }
    : { path: `/calendar/${key}` }
}

function announcementLocation(slug) {
  return auth.isDemo
    ? { path: `/announcements/${slug}`, query: { demo: '1' } }
    : { path: `/announcements/${slug}` }
}

function dayThemeClass(dayIndex) {
  return `calendar-theme-${dayIndex}`
}
</script>

<template>
  <main class="shell">
    <AppTopbar :student="payload.student" :mode="auth.mode" @logout="handleLogout" />

    <section v-if="loading" class="hero single">
      <div class="panel state-panel">
        <p class="eyebrow">
          Chargement
        </p>
        <h1>Preparation du calendrier...</h1>
        <p class="copy">
          Recuperation des sessions et de la vue semaine.
        </p>
      </div>
    </section>

    <section v-else-if="errorMessage" class="hero single">
      <div class="panel state-panel">
        <p class="eyebrow">
          API indisponible
        </p>
        <h1>Impossible de charger le calendrier.</h1>
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
        <div class="panel hero-panel">
          <div class="hero-copy-block">
            <p class="eyebrow">
              Semaine orchestree
            </p>
            <h1>Calendrier</h1>
            <p class="copy">
              Une vue semaine lisible, avec une vraie grille horaire, des colonnes distinctes par jour et les cours qui restent faciles a cliquer.
            </p>
          </div>

          <div class="hero-badge-row">
            <article class="hero-badge-card">
              <span>Periode</span>
              <strong>{{ weekRangeLabel }}</strong>
            </article>
            <article v-if="upcomingEntry" class="hero-badge-card">
              <span>Prochain slot</span>
              <strong>{{ upcomingEntry.dayLabel }} {{ upcomingEntry.time.slice(-5) }}</strong>
            </article>
          </div>
        </div>

        <div class="stat-grid">
          <article class="stat-card">
            <span>Sessions planifiees</span>
            <strong>{{ hydratedEntries.length }}</strong>
          </article>
          <article class="stat-card">
            <span>Jour le plus dense</span>
            <strong>{{ busiestDay?.dayLabel ?? 'N/A' }}</strong>
            <small>{{ busiestDay ? `${sessionsByDayIndex.get(busiestDay.dayIndex)} sessions ce jour-la` : 'Aucune charge detectee' }}</small>
          </article>
          <article class="stat-card stat-card-alert">
            <span>Annonces liees</span>
            <strong>{{ payload.announcements.length }}</strong>
          </article>
        </div>
      </section>

      <div class="content-grid">
        <section class="panel calendar-panel">
          <div class="section-heading">
            <div>
              <p class="eyebrow">
                Planning
              </p>
              <h2>Vue semaine</h2>
            </div>
            <p class="section-meta">
              {{ weekRangeLabel }}
            </p>
          </div>

          <div class="legend-row">
            <div
              v-for="day in weekDays"
              :key="day.dayKey"
              class="legend-chip"
              :class="dayThemeClass(day.dayIndex)"
            >
              <span class="legend-dot" />
              <strong>{{ day.dayLabel }}</strong>
              <small>{{ sessionsByDayIndex.get(day.dayIndex) ?? 0 }} sessions</small>
            </div>
          </div>

          <div class="calendar-board-wrap">
            <div
              class="calendar-board"
              :style="{ gridTemplateColumns: boardColumns, gridTemplateRows: boardRows }"
            >
              <div class="board-corner">
                UTC+2
              </div>

              <div
                v-for="(day, dayPosition) in weekDays"
                :key="`${day.dayKey}-wash`"
                class="day-column-wash"
                :class="dayThemeClass(day.dayIndex)"
                :style="{ gridColumn: `${dayPosition + 2}`, gridRow: `2 / span ${boardBodyRowSpan}` }"
              />

              <div
                v-for="(day, dayPosition) in weekDays"
                :key="day.dayKey"
                class="day-header"
                :class="dayThemeClass(day.dayIndex)"
                :style="{ gridColumn: `${dayPosition + 2}`, gridRow: '1' }"
              >
                <small class="day-header-count">{{ sessionsByDayIndex.get(day.dayIndex) ?? 0 }} sessions</small>
                <strong>{{ day.dayLabel }}</strong>
                <span>{{ day.dateLabel }}</span>
              </div>

              <template v-for="(slot, slotIndex) in timeSlots" :key="slot">
                <div class="time-label" :style="{ gridColumn: '1', gridRow: `${(slotIndex * 2) + 2}` }">
                  {{ slot }}
                </div>
                <div class="hour-line" :style="{ gridColumn: `2 / span ${Math.max(weekDays.length, 1)}`, gridRow: `${(slotIndex * 2) + 2}` }" />
                <div
                  v-if="slotIndex < timeSlots.length - 1"
                  class="half-hour-line"
                  :style="{ gridColumn: `2 / span ${Math.max(weekDays.length, 1)}`, gridRow: `${(slotIndex * 2) + 3}` }"
                />
              </template>

              <RouterLink
                v-for="entry in boardEntries"
                :key="entry.key"
                data-testid="calendar-entry"
                class="calendar-event"
                :class="dayThemeClass(entry.dayIndex)"
                :style="entry.style"
                :to="entryLocation(entry.key)"
              >
                <div class="calendar-event-top">
                  <small>{{ entry.dayLabel }} {{ entry.time.slice(-5) }}</small>
                  <span class="event-duration">{{ entry.durationMinutes }} min</span>
                </div>
                <strong>{{ entry.title }}</strong>
                <span>{{ entry.detail }}</span>
              </RouterLink>
            </div>
          </div>
        </section>

        <aside class="sidebar-stack">
          <section class="panel side-panel">
            <div class="section-heading compact">
              <div>
                <p class="eyebrow">
                  A venir
                </p>
                <h2>Agenda compact</h2>
              </div>
            </div>

            <ul class="agenda-list">
              <li v-for="entry in nextEntries" :key="entry.key">
                <RouterLink class="agenda-link" :to="entryLocation(entry.key)">
                  <strong>{{ entry.dayLabel }} {{ entry.time.slice(-5) }}</strong>
                  <div>
                    <p>{{ entry.title }}</p>
                    <small>{{ entry.detail }}</small>
                  </div>
                </RouterLink>
              </li>
            </ul>
          </section>

          <section class="panel side-panel">
            <div class="section-heading compact">
              <div>
                <p class="eyebrow">
                  Rappels campus
                </p>
                <h2>Annonces</h2>
              </div>
            </div>

            <ul class="announcement-list">
              <li v-for="item in payload.announcements" :key="item.slug">
                <RouterLink class="announcement-link" :to="announcementLocation(item.slug)">
                  <span class="announcement-pill" :class="`announcement-pill-${item.level}`">
                    {{ item.level }}
                  </span>
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.detail }}</p>
                </RouterLink>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </template>
  </main>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  padding: 24px;
}

.hero,
.content-grid {
  width: min(1420px, 100%);
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
  gap: 20px;
  padding: 24px 0 20px;
}

.single {
  grid-template-columns: 1fr;
}

.panel,
.stat-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 24px 60px rgba(148, 163, 184, 0.18);
}

.panel {
  padding: 28px;
}

.state-panel,
.hero-panel {
  background:
    radial-gradient(circle at top left, rgba(250, 204, 21, 0.16), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.84));
}

.hero-panel {
  display: grid;
  gap: 24px;
}

.hero-copy-block h1,
.section-heading h2,
.state-panel h1 {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
}

.hero-copy-block h1,
.state-panel h1 {
  font-size: clamp(2.3rem, 5vw, 4.1rem);
  line-height: 0.98;
}

.eyebrow {
  margin: 0 0 6px;
  color: #92400e;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.copy {
  max-width: 60ch;
  color: #475569;
  line-height: 1.7;
}

.hero-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-badge-card {
  min-width: 220px;
  padding: 16px 18px;
  border-radius: 22px;
  background: rgba(248, 250, 252, 0.9);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.14);
}

.hero-badge-card span,
.stat-card span,
.section-meta,
.calendar-event small,
.agenda-link small,
.announcement-list p,
.day-header span,
.day-header-count,
.time-label {
  color: #64748b;
}

.hero-badge-card span {
  display: block;
  margin-bottom: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.hero-badge-card strong,
.stat-card strong,
.section-heading h2,
.calendar-event strong,
.agenda-link strong,
.announcement-link strong,
.day-header strong {
  font-family: 'Space Grotesk', sans-serif;
}

.actions,
.section-heading {
  display: flex;
  gap: 12px;
  align-items: center;
}

.compact {
  margin-bottom: 16px;
}

.primary-action,
.secondary-action {
  border: 0;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 16px;
  font-weight: 700;
  transition:
    transform 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease;
}

.primary-action {
  background: #111827;
  color: #f8fafc;
  box-shadow: 0 18px 30px rgba(17, 24, 39, 0.18);
}

.secondary-action {
  background: rgba(255, 255, 255, 0.82);
  color: #111827;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}

.primary-action:hover,
.secondary-action:hover,
.calendar-event:hover,
.agenda-link:hover,
.announcement-link:hover {
  transform: translateY(-1px);
}

.stat-grid {
  display: grid;
  gap: 16px;
}

.stat-card {
  padding: 22px;
}

.stat-card strong {
  display: block;
  margin: 10px 0 8px;
  font-size: 2rem;
}

.stat-card small {
  color: #475569;
  line-height: 1.5;
}

.stat-card-alert {
  background: linear-gradient(135deg, #fff7ed, #ffedd5);
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(320px, 0.72fr);
  gap: 20px;
}

.calendar-panel,
.sidebar-stack {
  display: grid;
  gap: 18px;
}

.section-heading {
  justify-content: space-between;
}

.section-heading h2 {
  font-size: 1.7rem;
}

.section-meta {
  font-weight: 700;
}

.legend-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.legend-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  background: #f8fafc;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.18);
}

.legend-chip strong {
  color: #0f172a;
}

.legend-chip small {
  color: #475569;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: currentColor;
}

.calendar-board-wrap {
  overflow-x: auto;
  padding-bottom: 6px;
}

.calendar-board {
  position: relative;
  display: grid;
  min-width: 1080px;
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(246, 248, 252, 0.98), rgba(238, 243, 250, 0.98));
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.12);
}

.board-corner,
.day-column-wash,
.day-header,
.time-label,
.hour-line,
.half-hour-line,
.calendar-event {
  position: relative;
}

.board-corner {
  display: grid;
  place-items: center;
  grid-column: 1;
  grid-row: 1;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #334155;
  background: linear-gradient(180deg, rgba(226, 232, 240, 0.95), rgba(241, 245, 249, 0.9));
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
}

.day-column-wash {
  margin: 0 8px 8px;
  border-radius: 24px;
  opacity: 0.5;
  pointer-events: none;
}

.day-header {
  display: grid;
  align-content: center;
  gap: 2px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  border-left: 1px solid rgba(148, 163, 184, 0.08);
  background: rgba(255, 255, 255, 0.72);
}

.day-header strong {
  font-size: 1.5rem;
  line-height: 1;
}

.day-header span {
  font-size: 1rem;
}

.day-header-count {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
}

.time-label {
  display: grid;
  place-items: start end;
  padding: 8px 16px 0 0;
  font-size: 0.84rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.7));
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

.hour-line {
  border-top: 1px solid rgba(148, 163, 184, 0.14);
}

.half-hour-line {
  border-top: 1px dashed rgba(148, 163, 184, 0.18);
}

.calendar-event {
  display: grid;
  gap: 8px;
  margin: 8px;
  padding: 14px 16px;
  border-radius: 22px;
  color: #0f172a;
  text-decoration: none;
  box-shadow:
    0 12px 28px rgba(15, 23, 42, 0.09),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.calendar-event-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.calendar-event small {
  font-weight: 700;
}

.calendar-event strong {
  font-size: 1.05rem;
  line-height: 1.15;
}

.calendar-event span {
  color: #334155;
  line-height: 1.45;
}

.event-duration {
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.calendar-theme-1 {
  color: #0f766e;
}

.calendar-theme-1.day-column-wash,
.calendar-theme-1.calendar-event {
  background: linear-gradient(180deg, rgba(204, 251, 241, 0.76), rgba(236, 253, 245, 0.9));
}

.calendar-theme-1.day-header {
  background: linear-gradient(180deg, rgba(240, 253, 250, 0.92), rgba(255, 255, 255, 0.72));
}

.calendar-theme-2 {
  color: #1d4ed8;
}

.calendar-theme-2.day-column-wash,
.calendar-theme-2.calendar-event {
  background: linear-gradient(180deg, rgba(219, 234, 254, 0.82), rgba(239, 246, 255, 0.92));
}

.calendar-theme-2.day-header {
  background: linear-gradient(180deg, rgba(239, 246, 255, 0.92), rgba(255, 255, 255, 0.72));
}

.calendar-theme-3 {
  color: #15803d;
}

.calendar-theme-3.day-column-wash,
.calendar-theme-3.calendar-event {
  background: linear-gradient(180deg, rgba(220, 252, 231, 0.8), rgba(240, 253, 244, 0.92));
}

.calendar-theme-3.day-header {
  background: linear-gradient(180deg, rgba(240, 253, 244, 0.92), rgba(255, 255, 255, 0.72));
}

.calendar-theme-4 {
  color: #c2410c;
}

.calendar-theme-4.day-column-wash,
.calendar-theme-4.calendar-event {
  background: linear-gradient(180deg, rgba(255, 237, 213, 0.84), rgba(255, 247, 237, 0.94));
}

.calendar-theme-4.day-header {
  background: linear-gradient(180deg, rgba(255, 247, 237, 0.94), rgba(255, 255, 255, 0.72));
}

.calendar-theme-5 {
  color: #7c3aed;
}

.calendar-theme-5.day-column-wash,
.calendar-theme-5.calendar-event {
  background: linear-gradient(180deg, rgba(237, 233, 254, 0.84), rgba(245, 243, 255, 0.94));
}

.calendar-theme-5.day-header {
  background: linear-gradient(180deg, rgba(245, 243, 255, 0.94), rgba(255, 255, 255, 0.72));
}

.sidebar-stack {
  align-content: start;
}

.side-panel {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.9));
}

.agenda-list,
.announcement-list {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.agenda-list li,
.announcement-list li {
  border-radius: 22px;
  background: #f8fafc;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.14);
}

.agenda-link,
.announcement-link {
  display: grid;
  gap: 8px;
  padding: 16px;
  color: inherit;
  text-decoration: none;
}

.agenda-link {
  grid-template-columns: 92px 1fr;
  align-items: start;
}

.agenda-link p,
.announcement-link p {
  margin: 0;
}

.agenda-link strong:first-child {
  color: #111827;
}

.announcement-pill {
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.announcement-pill-warning {
  background: #fff7ed;
  color: #c2410c;
}

.announcement-pill-info {
  background: #eff6ff;
  color: #1d4ed8;
}

@media (max-width: 1180px) {
  .hero,
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .shell {
    padding: 14px;
  }

  .panel,
  .stat-card {
    padding: 18px;
  }

  .actions,
  .section-heading {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-badge-row,
  .legend-row {
    display: grid;
  }

  .agenda-link {
    grid-template-columns: 1fr;
  }

  .calendar-board {
    min-width: 980px;
  }
}
</style>
