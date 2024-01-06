<template>
  <div>
    <el-menu
  v-if="this.$root.store.state.screenWidth>= 1000"
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
            <template slot="title">主页</template>
          </el-menu-item>
      <el-menu-item
        :index="PATH.POST_VIEW.path">
        <i class="el-icon-plus"></i>
        <template slot="title">发帖</template>
      </el-menu-item>
<!--            <el-submenu index="2">-->
<!--              <template slot="title"><i class="el-icon-menu"></i>我的工作台</template>-->
<!--              <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--              <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--              <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--              <el-submenu index="2-4">-->
<!--                <template slot="title">选项4</template>-->
<!--                <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--                <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--                <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--              </el-submenu>-->
<!--            </el-submenu>-->
            <el-menu-item :index="PATH.MESSAGE_VIEW.path">
              <i class="el-icon-message-solid"></i>消息</el-menu-item>
<!--            <el-menu-item :index="PATH.USER_VIEW.path" style="right: 0">-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--              <template #title>{{ username }}</template>-->
<!--            </el-menu-item>-->
          <div style="position:absolute;left: 35%; width: 30%">
            <el-input
              style="justify-content: center;align-items: center;margin-top: 10px;border-radius: 50%;"
              type="text"
              size="large"
              prefix-icon="el-icon-search"
              resize="none"
              placeholder="搜索一下"
              v-model="search">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>

<!--          <div style="right: 3%;position: absolute;display: flex;flex-direction: row; justify-content: center;align-items: center">-->
<!--            <el-avatar :src="this.avatarUrl" style="margin-right: 10px; margin-top:10px;cursor: pointer;z-index: 1001"-->
<!--                       @click.native="$router.push(PATH.USER_VIEW.path)"></el-avatar>-->
<!--            <h3 style="color: #fff; cursor: pointer"-->
<!--            @click="$router.push(PATH.USER_VIEW.path)">{{ username }}</h3>-->
<!--          </div>-->
      <div style="right: 3%;position: absolute;display: flex;flex-direction: row; justify-content: center;align-items: center">
        <el-avatar :src="this.avatarUrl" style="margin-right: 10px; margin-top:10px;cursor: pointer;z-index: 1001"
                   @click.native="$router.push(PATH.USER_VIEW.path)"></el-avatar>
        <h3 style="color: #fff; cursor: pointer"
            @click="drawer = true">{{ username }}</h3>
      </div>
          </el-menu>
    <el-menu
      v-if="this.$root.store.state.screenWidth < 1000 && this.$root.store.state.screenWidth >= 400"
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
      </el-menu-item>
      <el-menu-item
        :index="PATH.POST_VIEW.path">
        <i class="el-icon-plus"></i>
      </el-menu-item>
      <el-menu-item :index="PATH.MESSAGE_VIEW.path">
        <i class="el-icon-message-solid"></i>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-search"></i></template>
          <el-input
            style="justify-content: center;align-items: center;"
            type="text"
            size="large"
            prefix-icon="el-icon-search"
            resize="none"
            placeholder="搜索一下"
            v-model="search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
      </el-submenu>

      <div style="right: 3%;position: absolute;display: flex;flex-direction: row; justify-content: center;align-items: center">
        <el-avatar :src="this.avatarUrl" style="margin-right: 10px; margin-top: 10px; cursor: pointer;z-index: 1001"
                   @click.native="$router.push(PATH.USER_VIEW.path)"></el-avatar>
      </div>
    </el-menu>
    <el-menu
      v-if="this.$root.store.state.screenWidth < 400"
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
      </el-menu-item>
      <el-menu-item
        :index="PATH.POST_VIEW.path">
        <i class="el-icon-plus"></i>
      </el-menu-item>
      <el-menu-item :index="PATH.MESSAGE_VIEW.path">
        <i class="el-icon-message-solid"></i>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-search"></i></template>
        <el-input
          style="justify-content: center;align-items: center;"
          type="text"
          size="large"
          prefix-icon="el-icon-search"
          resize="none"
          placeholder="搜索一下"
          v-model="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-submenu>
      <el-menu-item :index="PATH.USER_VIEW.path">
        <el-avatar :src="this.avatarUrl"></el-avatar>
      </el-menu-item>
    </el-menu>
    <el-drawer
      :title="username"
      :with-header="false"
      style="z-index: 3000;border-radius: 4px"
      :visible.sync="drawer"
      direction="rtl"
      size="20%"
      :before-close="handleClose"
      :modal="false"
      >
      <div style="display: flex;align-items: center;justify-content: center;padding: 10%;flex-direction: column">
          <el-avatar :src="this.avatarUrl" style="margin-right: 10px; margin-top:10px;"></el-avatar>
          <h3 style="color: #fff">{{ username }}</h3>
        <div style="display: flex;flex-direction: row;justify-content: space-between; align-items: center">
          <el-button @click="$router.push(PATH.USER_VIEW.path)" class="user-button" icon="el-icon-s-tools" circle></el-button>
          <el-badge :is-dot="messages.length!==0" class="user-button">
            <el-button class="user-button" icon="el-icon-message-solid" circle @click="$router.push(PATH.MESSAGE_VIEW.path)"></el-button>
          </el-badge>
<!--          <el-button class="user-button" icon="el-icon-delete-solid" circle></el-button>-->
        </div>
        <el-card v-for="message in messages" :key="message.id" style="width: 100%">
          <el-link type="primary" @click="$router.push('/post_detail/'+message.targetId);readMessage(message.id)">{{message.postName}}</el-link>
          <el-row>
            <el-col><i>{{message.name1}}</i></el-col>
            <el-col>{{message.opName}}了你的发布</el-col>
          </el-row>
          <div></div>
        </el-card>
      </div>

    </el-drawer>
  </div>
</template>

<script>
import {PATH} from '@/commons/const'
import {getCurrentUser, listMessage, updateMessage} from '@/network/any'
export default {
  name: 'NavTop',
  async mounted () {
    await getCurrentUser().then((res) => {
      if (res.code === 200) {
        console.log(res.data)
        this.username = res.data.name
        this.avatarUrl = res.data.avatar_url
        this.$root.store.name = res.data.name
        this.$root.store.avatarUrl = res.data.avatar_url
      } else {
        this.$alert('System error')
      }
    })
    await listMessage({params: {
      state: 0,
      page: 1,
      size: 99
    }}).then(res => {
      if (res.code === 200) {
        this.messages = res.data.list
        console.log(this.messages)
      } else {
        this.$message({
          message: '获取消息失败',
          type: 'error'
        })
      }
    })
  },
  data () {
    return {
      drawer: false,
      PATH: PATH,
      username: '',
      avatarUrl: '',
      search: '',
      messages: []
    }
  },
  methods: {
    handleClose (done) {
      done()
    },
    readMessage (id) {
      updateMessage({params: {
        id: id
      }}).then(res => {
        if (res.code === 200) {

        } else {
          this.$message({
            message: '失败',
            type: 'error'
          })
        }
      })
    }
  }
}

</script>

<style scoped>
.user-button{
font-size: 2rem;
  border: 0;
}
</style>
