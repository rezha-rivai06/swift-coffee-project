import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',          
    name: 'Home',
    component: () => import('../pages/Konektor.vue')
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../pages/admin/AdminDashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
