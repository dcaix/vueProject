import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/user/Welcome'
import Users from '@/components/user/Users.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: 'welcome',
      children: [
        { path: 'welcome', name: 'welcome', component: Welcome },
        { path: 'users', name: 'users', component: Users }
      ]
    }
  ]
})
