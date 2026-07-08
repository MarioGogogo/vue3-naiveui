import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'
import VirtualList from '../views/VirtualList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/virtual-list',
    name: 'VirtualList',
    component: VirtualList
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
