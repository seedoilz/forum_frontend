// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import '@/assets/css/global.css'
import '../theme/index.css'
import { setCookie, getCookie, checkCookie, clearCookie } from '@/network/request'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
import {gsap} from 'gsap'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 用于取代Vuex实现组件之间的消息传递
Vue.prototype.$getCookie = getCookie
Vue.prototype.$setCookie = setCookie
Vue.prototype.$checkCookie = checkCookie
Vue.prototype.$clearCookie = clearCookie
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
const store = {
  debug: true,
  state: {
    screenWidth: document.documentElement.clientWidth, // 屏幕宽度
    screenHeight: document.documentElement.clientHeight // 屏幕高度
  }
}

new Vue({
  router,
  data: {
    store: store
  },
  render: h => h(App)
}).$mount('#app')
