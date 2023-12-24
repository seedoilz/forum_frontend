<template>
<el-menu
  class="nav"
  background-color="rgba(32,32,32,1)"
  text-color="#fff"
  :router="true"
  active-text-color="#26bbff"
            default-active="1"
            mode="horizontal"
            :ellipsis="false"
            style="width: 100%;border: 0;margin: 0;padding: 0;">
          <el-menu-item
            :index="PATH.MAIN_VIEW.path">
            <i class="el-icon-s-home"></i>
            <template #title>主页</template>
          </el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item :index="PATH.USER_VIEW.path">
              <i class="el-icon-user-solid"></i>
              <template #title>{{ username }}</template>
            </el-menu-item>
          </el-menu>
</template>

<script>
import {PATH} from '@/commons/const'
import {getCurrentUser} from '@/network/any'
export default {
  name: 'NavTop',
  mounted () {
    getCurrentUser().then((res) => {
      if (res.code === 200) {
        this.username = res.data.name
      } else {
        this.$alert('System error')
      }
    })
  },
  data () {
    return {
      PATH: PATH,
      username: ''
    }
  }
}

</script>

<style scoped>
.nav{

}
</style>
