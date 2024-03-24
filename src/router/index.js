import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import AuthView from '@/views/AuthView.vue'

// Importar la store de usuario para ver si hay usuario
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/auth',
      component: AuthView,
      children: [
        {
          path: '', // Ruta por defecto para /auth
          redirect: '/auth/login' // Redirige a /auth/login
        },
        {
          path: 'login', // Subruta /auth/login
          name: 'auth-login',
          component: () => import('@/components/SignInComponent.vue')
        },
        {
          path: 'signup', // Subruta /auth/signup
          name: 'auth-signup',
          component: () => import('@/components/SignUpComponent.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }

  if (userStore.user === null && to.path !== '/auth/login' && to.path !== '/auth/signup') {
    next({ path: '/auth/login' })
  } else {
    next()
  }
})

export default router
