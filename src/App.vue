<template>
<!--    <router-view/>-->
  <div id="app">
    <FloatingButton style="z-index: 1000"></FloatingButton>
    <NavMenu v-if="this.$root.store.state.screenWidth>800 && this.$route.path !== PATH.SIGN_IN_VIEW.path && this.$route.path !== PATH.REGISTER_VIEW.path"
             style="position: fixed;z-index: 1005"
    >
    </NavMenu>
    <NavTop v-if="this.$route.path !== PATH.SIGN_IN_VIEW.path && this.$route.path !== PATH.REGISTER_VIEW.path" style="position: fixed;top: 0;width: 100%;z-index: 1005"></NavTop>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" ></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import NavTop from './components/NavTop.vue'
import {PATH} from './commons/const'
import FloatingButton from '@/components/FloatingButton'

export default {
  mounted () {
    let that = this
    window.onresize = function () {
      that.$root.store.state.screenWidth = document.documentElement.clientWidth // 窗口宽度
      that.$root.store.state.screenHeight = document.documentElement.clientHeight // 窗口高度
    }
  },
  computed: {
    PATH () {
      return PATH
    }
  },
  components: {FloatingButton, NavTop, NavMenu}
}
</script>

<style>
</style>
