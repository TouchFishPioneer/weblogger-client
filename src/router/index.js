import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../views/Welcome.vue'
import Main from '../views/Main.vue'
import Thanks from '../views/Thanks.vue'
import Status from '../views/Status.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: Thanks
  },
  {
    path: '/status',
    name: 'status',
    component: Status
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
