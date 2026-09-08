import { createRouter, createWebHistory } from 'vue-router'
import Konektor from '../pages/Konektor.vue'
import AdminDashboard from '../pages/admin/AdminDashboard.vue'


const routes = [
  {
    path: '/',          
    name: 'Home',
    component: Konektor 
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
