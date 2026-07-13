import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import VirtualList from '../views/VirtualList.vue'
import MessageDemo from '../views/MessageDemo.vue'
import MessageTest from '../views/MessageTest.vue'
import VersionTest from '../views/VersionTest.vue'
import ComingSoon from '../views/ComingSoon.vue'
import TreeView from '../views/TreeView.vue'
import FormView from '../views/FormView.vue'
import FoodDelivery from '../views/FoodDelivery.vue'
import DataTable from '../views/DataTable.vue'

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
  },
  {
    path: '/coming-soon',
    name: 'ComingSoon',
    component: ComingSoon
  },
  {
    path: '/tree',
    name: 'TreeView',
    component: TreeView
  },
  {
    path: '/form',
    name: 'FormView',
    component: FormView
  },
  {
    path: '/food-delivery',
    name: 'FoodDelivery',
    component: FoodDelivery
  },
  {
    path: '/data-table',
    name: 'DataTable',
    component: DataTable
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
