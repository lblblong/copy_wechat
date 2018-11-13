import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/pages/main').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/transfer',
      name: 'main',
      component: require('@/pages/transfer').default
    }
  ]
})
