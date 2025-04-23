// Composables
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/index.vue'),
      },
    ],
  },
    // Ruta de captura para cualquier ruta no definida (404)
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue'), // Puedes crear una página de error 404
    },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

export default router
