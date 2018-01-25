import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/user/Welcome'
import Users from '@/components/user/Users.vue'
import Right from '@/components/right/Right'
import Role from '@/components/right/Role'
import Category from '@/components/product/Category'
import Param from '@/components/product/Param'

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
        { path: 'users', name: 'users', component: Users },
        { path: 'rights', name: 'right', component: Right },
        { path: 'roles', name: 'role', component: Role },
        { path: 'categories', name: 'categorie', component: Category },
        { path: 'params', name: 'param', component: Param }
      ]
    }
  ]
})
