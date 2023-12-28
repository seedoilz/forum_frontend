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
            style="width: 100%;border: 0;margin: 0;padding: 0; display: flex;flex-direction: row">
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
<!--            <el-menu-item :index="PATH.USER_VIEW.path" style="right: 0">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <template #title>{{ username }}</template>-->
<!--            </el-menu-item>-->
          <div style="position:absolute;left: 35%; width: 30%">
            <el-input
              style="justify-content: center;align-items: center;margin-top: 10px"
              type="text"
              size="large"
              prefix-icon="el-icon-search"
              resize="none"
              placeholder="搜索一下"
              v-model="search">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>

          <div style="right: 3%;position: absolute;display: flex;flex-direction: row; justify-content: center;align-items: center">
            <el-avatar :src="this.avatarUrl" style="margin-right: 10px"></el-avatar>
            <h3 style="color: #fff; cursor: pointer"
            @click="$router.push(PATH.USER_VIEW.path)">{{ username }}</h3>
          </div>
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
        console.log(res.data)
        this.username = res.data.name
        this.avatarUrl = res.data.avatar_url
      } else {
        this.$alert('System error')
      }
    })
  },
  data () {
    return {
      PATH: PATH,
      username: '',
      avatarUrl: '',
      search: ''
    }
  }
}

</script>

<style scoped>
.nav{

}
</style>
