import { createRouter, createWebHistory } from 'vue-router'

const InvoiceView = () => import('../views/InvoiceView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'invoice',
      component: InvoiceView
    }
  ]
})

export default router
