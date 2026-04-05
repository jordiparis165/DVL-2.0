<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import SchoolLockup from './SchoolLockup.vue'

const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    default: 'authenticated',
  },
})

const emit = defineEmits(['logout'])
const route = useRoute()

const initials = computed(() => props.student.name
  ?.split(' ')
  .map(part => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase() ?? 'DV')

const navigation = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Cours', to: '/courses' },
  { label: 'Notes', to: '/grades' },
  { label: 'Devoirs', to: '/assignments' },
  { label: 'Calendrier', to: '/calendar' },
  { label: 'Messages', to: '/messages' },
  { label: 'Annonces', to: '/announcements' },
  { label: 'Admin', to: '/admin' },
]

const visibleNavigation = computed(() =>
  navigation.filter(item => item.to !== '/admin' || props.mode === 'demo' || props.student.role === 'admin'),
)

function isActive(target) {
  return route.path === target || route.path.startsWith(`${target}/`)
}

function profileLocation() {
  return props.mode === 'demo'
    ? '/profile?demo=1'
    : '/profile'
}
</script>

<template>
  <header class="topbar">
    <div class="brand-block">
      <SchoolLockup compact />
    </div>

    <nav class="nav-links" aria-label="Navigation principale">
      <RouterLink
        v-for="item in visibleNavigation"
        :key="item.to"
        class="nav-link"
        :class="{ active: isActive(item.to) }"
        :to="mode === 'demo' ? `${item.to}?demo=1` : item.to"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="topbar-actions">
      <RouterLink
        class="icon-button"
        :aria-label="mode === 'demo' ? 'Mode demo' : 'Messages'"
        :to="mode === 'demo' ? '/messages?demo=1' : '/messages'"
      >
        {{ mode === 'demo' ? 'Demo' : 'Inbox' }}
      </RouterLink>
      <RouterLink
        class="profile-chip"
        data-testid="profile-link"
        :to="profileLocation()"
      >
        <span>{{ initials }}</span>
        <small>{{ student.program }}</small>
      </RouterLink>
      <button class="logout-button" type="button" @click="emit('logout')">
        {{ mode === 'demo' ? 'Quitter la demo' : 'Deconnexion' }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 18px 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(20px);
  box-shadow: 0 24px 60px rgba(148, 163, 184, 0.18);
}

.brand-block,
.topbar-actions,
.profile-chip {
  display: flex;
  align-items: center;
}

.brand-block {
  gap: 14px;
}

.nav-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.nav-link {
  padding: 10px 14px;
  border-radius: 999px;
  color: #475569;
  text-decoration: none;
  font-weight: 600;
}

.nav-link.active,
.nav-link:hover {
  background: #111827;
  color: #f8fafc;
}

.topbar-actions {
  gap: 12px;
}

.icon-button,
.profile-chip,
.logout-button {
  border: 0;
  cursor: pointer;
  transition:
    transform 160ms ease,
    background 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;
}

.icon-button:hover,
.profile-chip:hover,
.logout-button:hover {
  transform: translateY(-1px);
}

.icon-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 48px;
  height: 48px;
  padding: 0 16px;
  border-radius: 14px;
  background: #f59e0b;
  color: #111827;
  font-weight: 800;
  text-decoration: none;
}

.profile-chip {
  gap: 10px;
  padding: 8px 12px;
  border-radius: 18px;
  background: #fff;
  color: #111827;
  text-decoration: none;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}

.profile-chip span {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: #e2e8f0;
  font-weight: 700;
}

.profile-chip small {
  display: block;
  color: #64748b;
  font-size: 0.78rem;
}

.logout-button {
  padding: 0 16px;
  height: 48px;
  border-radius: 14px;
  background: #111827;
  color: #f8fafc;
  font-weight: 700;
}

@media (max-width: 1080px) {
  .topbar {
    grid-template-columns: 1fr;
  }

  .nav-links {
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  .topbar,
  .topbar-actions {
    align-items: stretch;
  }

  .topbar-actions {
    flex-direction: column;
  }

  .profile-chip {
    justify-content: center;
  }
}
</style>
