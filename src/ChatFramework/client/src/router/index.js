import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import MainPage from '@/components/MainPage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }
  ]
})
