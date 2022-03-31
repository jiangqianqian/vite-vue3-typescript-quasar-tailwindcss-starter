import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/Home.vue')
  },

  {
    path: '/other',
    name: 'Other',
    component: () => import('@/pages/other/Other.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
