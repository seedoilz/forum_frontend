import Vue from 'vue'
import Router from 'vue-router'
import {PATH} from '@/commons/const'

const Home = () => import('../views/Home')
const SignInView = () => import('../views/SignInView/SignInView')
const RegisterView = () => import('@/views/SignInView/RegisterView')
const MainView = () => import('@/views/MainView/MainView')

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
