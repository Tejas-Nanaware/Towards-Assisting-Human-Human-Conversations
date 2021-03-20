import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/router/guard'
import MainPage from '@/components/MainPage'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Chat from '@/components/Chat'
import PostChatQuestionnaire from '@/components/PostChatQuestionnaire'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainPage
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
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: Guard
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      beforeEnter: Guard
    },
    {
      path: '/postChat',
      name: 'postChat',
      component: PostChatQuestionnaire,
      beforeEnter: Guard
    }
  ]
})
