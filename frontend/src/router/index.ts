import { createRouter, createWebHistory } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { useAuth } from '@/uses'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sidebar',
      component: () => import('@/views/BaseView.vue'),
      redirect: () =>'dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/CryptoTabs.vue'),
          meta: { title: 'Cryptocurrency' },
        },
        {
          path: '/crypto/:id',
          name: 'cryptoview',
          component: () => import('@/views/CryptoView.vue'),
        },
        {
          path: '/cryptonews',
          name: 'cryptonews',
          component: () => import('../views/CryptoNews.vue'),
          meta: { title: 'Cryptocurrency articles' },
        },
        {
          path: '/profilpage',
          name: 'profilpage',
          component: () => import('../views/ProfilPage.vue'),
          meta: { title: 'Your profil page' },
        },
        {
          path: '/adminpage',
          name: 'adminpage',
          component: () => import('../views/AdminPage.vue'),
          meta: { title: 'Administration page' },
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInPage.vue')
    }
  ]
})

const DEFAULT_TITLE = 'Count of money'

router.afterEach((to) => {
  const title = useTitle()
  title.value = `${DEFAULT_TITLE} | ${to.meta.title}`
})

// router.beforeEach(async (to) => {
//   const { jwt } = await useAuth()
//   if (!jwt.value && to.name !== 'login' && to.name !== 'signin') return { name: 'login' }
//   if ((jwt.value && to.name === 'login') || (jwt.value && to.name === 'signin')) return { name: 'dashboard' }
// })

export default router
