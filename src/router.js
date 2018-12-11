import Vue from 'vue'
import Router from 'vue-router'

import Welcome from './views/Welcome.vue'
import Enter from './views/Index.vue'
import Thanks from './views/Thanks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/index',
      name: 'index',
      component: Enter
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: Thanks
    }
  ]
})
