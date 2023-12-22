import Vue from 'vue'
import Router from 'vue-router'
import {PATH} from '@/commons/const'

const Home = () => import('../views/Home')
const SignInView = () => import('../views/SignInView/SignInView')
const RegisterView = () => import('@/views/SignInView/RegisterView')
const MainView = () => import('@/views/MainView/MainView')
const UserView = () => import('@/views/UserView/UserView')
const PostView = () => import('@/views/PostView/PostView')
const AccountSetView = () => import('@/views/UserView/AccountSet')
const ContentManagementView = () => import('@/views/UserView/ContentManagement')
const InformationView = () => import('@/views/UserView/Information')
const MyCollectView = () => import('@/views/UserView/MyCollect')
const MyThumbsView = () => import('@/views/UserView/MyThumbs')
const PostDetailView = () => import('@/views/PostDetailView/PostDetailView')
const TagSearchView = () => import('@/views/TagSearchView/TagSearchView')

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
    path: PATH.POST_DETAIL_VIEW.path,
    name: 'PostDetailView',
    component: PostDetailView
  },
  {
    path: PATH.TAG_SEARCH_VIEW.path,
    component: TagSearchView
  },
  {
    path: PATH.USER_VIEW.path,
    children: [
      {
        path: PATH.INFORMATION_VIEW.path,
        component: InformationView
      },
      {
        path: PATH.ACCOUNT_SET_VIEW.path,
        component: AccountSetView
      },
      {
        path: PATH.CONTENT_MANAGEMENT_VIEW.path,
        component: ContentManagementView
      },
      {
        path: PATH.MY_COLLECT_VIEW.path,
        component: MyCollectView
      },
      {
        path: PATH.MY_THUMBS_VIEW.path,
        component: MyThumbsView
      }
    ],
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
