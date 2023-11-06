// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import '@/assets/css/global.css'
import '../theme/index.css'
import { setCookie, getCookie, checkCookie, clearCookie } from '@/network/request'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 用于取代Vuex实现组件之间的消息传递
Vue.prototype.$getCookie = getCookie
Vue.prototype.$setCookie = setCookie
Vue.prototype.$checkCookie = checkCookie
Vue.prototype.$clearCookie = clearCookie

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
