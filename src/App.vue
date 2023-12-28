<template>
<!--    <router-view/>-->
  <div id="app">
    <FloatingButton style="z-index: 1000"></FloatingButton>
    <NavTop v-if="this.$route.path !== PATH.SIGN_IN_VIEW.path && this.$route.path !== PATH.REGISTER_VIEW.path" style="position: fixed;top: 0;width: 100%;z-index: 1005"></NavTop>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" ></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import NavTop from './components/NavTop.vue'
import {PATH} from './commons/const'
import FloatingButton from '@/components/FloatingButton'

export default {
  computed: {
    PATH () {
      return PATH
    }
  },
  components: {FloatingButton, NavTop}
}
</script>

<style>
</style>
