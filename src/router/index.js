import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'
import VirtualList from '../views/VirtualList.vue'
import MessageDemo from '../views/MessageDemo.vue'
import MessageTest from '../views/MessageTest.vue'
import VersionTest from '../views/VersionTest.vue'

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
  },
  {
    path: '/message-demo',
    name: 'MessageDemo',
    component: MessageDemo
  },
  {
    path: '/message-test',
    name: 'MessageTest',
    component: MessageTest
  },
  {
    path: '/version-test',
    name: 'VersionTest',
    component: VersionTest
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
