import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth.js'

function clonePayload(payload) {
  return JSON.parse(JSON.stringify(payload))
}

export function useProtectedResource(options) {
  const auth = useAuthStore()
  const route = useRoute()
  const router = useRouter()

  const loading = ref(true)
  const errorMessage = ref('')
  const data = ref(null)

  function loadDemo() {
    const payload = clonePayload(options.demoData)
    auth.enableDemo(payload.student)
    data.value = payload
    errorMessage.value = ''
  }

  async function loadResource() {
    loading.value = true
    errorMessage.value = ''

    if (route.query.demo === '1') {
      loadDemo()
      loading.value = false
      return
    }

    try {
      await auth.restoreSession()

      if (!auth.isAuthenticated) {
        await router.replace('/login')
        return
      }

      if (options.requiredRole && auth.user?.role !== options.requiredRole) {
        if (options.forbiddenRedirect) {
          await router.replace(options.forbiddenRedirect)
          return
        }

        errorMessage.value = options.forbiddenMessage ?? 'Acces refuse'
        return
      }

      data.value = await options.loader()
    } catch (error) {
      if (error.status === 401) {
        await router.replace('/login')
        return
      }

      if (error.status === 403 && options.forbiddenRedirect) {
        await router.replace(options.forbiddenRedirect)
        return
      }

      errorMessage.value = error.message
    } finally {
      loading.value = false
    }
  }

  async function openDemo() {
    loadDemo()
    loading.value = false
    await router.replace(`${options.demoRoute}?demo=1`)
  }

  async function handleLogout() {
    await auth.logout()
    await router.push('/login')
  }

  onMounted(loadResource)

  return {
    auth,
    data,
    errorMessage,
    handleLogout,
    loadResource,
    loading,
    openDemo,
  }
}
