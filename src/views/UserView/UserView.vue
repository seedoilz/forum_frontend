<template>
  <el-container style="height:100%; margin:5% 20% 0 20%;">
    <el-aside width="20%" style="height: 100%">
      <el-menu
        :default-active="getActivePath"
        @select="handleSelect"
        style="width: 10%;top: 20%;left:20%;
        border-radius: 4px;
        position: fixed;
        justify-content: center;
        border: 0"
      >
        <el-menu-item class="el-menu-item" :index="PATH.INFORMATION_VIEW.path">
          <i class="el-icon-location"></i>
          <span v-if="this.$root.store.state.screenWidth>= 900" slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item :index="PATH.ACCOUNT_SET_VIEW.path">
          <i class="el-icon-menu"></i>
          <span v-if="this.$root.store.state.screenWidth>= 900" slot="title">帐号设置</span>
        </el-menu-item>
        <el-menu-item :index="PATH.CONTENT_MANAGEMENT_VIEW.path">
          <i class="el-icon-document"></i>
          <span v-if="this.$root.store.state.screenWidth>= 900" slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item :index="PATH.MY_COLLECT_VIEW.path">
          <i class="el-icon-star-on"></i>
          <span v-if="this.$root.store.state.screenWidth>= 900" slot="title">我的收藏</span>
        </el-menu-item>
<!--        <el-menu-item :index="PATH.MY_THUMBS_VIEW.path">-->
<!--          <i class="el-icon-setting"></i>-->
<!--          <span slot="title">我的点赞</span>-->
<!--        </el-menu-item>-->
      </el-menu>
    </el-aside>
    <el-main>
      <router-view :key="this.$route.fullPath" style="width:100%"></router-view>
    </el-main>
  </el-container>
</template>

<style>
.el-menu-item{
  height:80px;
  padding-left: 15px !important;
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}
</style>

<script>
import {PATH} from '../../commons/const'

export default {
  name: 'UserView',
  computed: {
    getActivePath () {
      console.log(this.activePath)
      if (this.activePath == null) {
        return this.$route.path
      } else {
        return this.activePath
      }
    }
  },
  mounted () {
    this.$router.push('/user/' + PATH.INFORMATION_VIEW.path)
  },
  data () {
    return {
      PATH: PATH
    }
  },
  methods: {
    handleSelect (key) {
      this.$router.push('/user/' + key).catch(err => {
        console.log(err)
      })
      console.log(this.$router.currentRoute.fullPath)
    }
  }
}
</script>
