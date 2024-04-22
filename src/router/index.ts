import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views/PageIndex.vue'

import eric from '../router/eric.ts'
import eliza from '../router/eliza.ts'
import amy from '../router/amy.ts'

const routes = [
  {path: '/',name: 'index',component: index},
  ...eric,
  ...eliza,
  ...amy

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
