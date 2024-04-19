import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/PageIndex.vue'

import eric from '../router/eric.ts'


const routes = [
  {path: '/',name: 'index',component: index},
  ...eric

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
