import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/PageIndex.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },

  ]
})

export default router
