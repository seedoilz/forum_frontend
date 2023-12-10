<template>
  <el-container style="margin:1%">
    <el-aside width="20%" style="height: 300px">
      <el-menu
        :default-active="getActivePath"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        style="width: 90%;
      justify-content: center;"
      >
        <el-menu-item :index="PATH.INFORMATION_VIEW.path">
          <i class="el-icon-location"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item :index="PATH.ACCOUNT_SET_VIEW.path">
          <i class="el-icon-menu"></i>
          <span slot="title">帐号设置</span>
        </el-menu-item>
        <el-menu-item :index="PATH.CONTENT_MANAGEMENT_VIEW.path">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item :index="PATH.MY_COLLECT_VIEW.path">
          <i class="el-icon-star-on"></i>
          <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item :index="PATH.MY_THUMBS_VIEW.path">
          <i class="el-icon-setting"></i>
          <span slot="title">我的点赞</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <router-view :key="$route.fullPath" style="width:80%"></router-view>
  </el-container>
</template>

<style>

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
  data () {
    return {
      selectedNavigation: '1',
      PATH: PATH
    }
  },
  methods: {
    handleSelect (key) {
      this.$router.push('/user/' + key).catch(err => {
        console.log(err)
      })
      // console.log(key, this.$route.path)
    }
  }
}
</script>
