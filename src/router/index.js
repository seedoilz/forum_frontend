import Vue from 'vue'
import Router from 'vue-router'
import {PATH} from '@/commons/const'

const Home = () => import('../views/Home')
const SignInView = () => import('../views/SignInView/SignInView')
const RegisterView = () => import('@/views/SignInView/RegisterView')
const MainView = () => import('@/views/MainView/MainView')
const UserView = () => import('@/views/UserView/UserView')
const PostView = () => import('@/views/PostView/PostView')

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: PATH.SIGN_IN_VIEW.path,
    component: SignInView
  },
  {
    path: PATH.REGISTER_VIEW.path,
    component: RegisterView
  },
  {
    path: PATH.MAIN_VIEW.path,
    component: MainView
  },
  {
    path: PATH.USER_VIEW.path,
    component: UserView
  },
  {
    path: PATH.POST_VIEW.path,
    component: PostView
  },
  {
    path: '*',
    redirect: '/error'
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
