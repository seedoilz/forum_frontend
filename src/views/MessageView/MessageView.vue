<template>
  <el-container style="height:100%; margin:5% 20% 0 20%;">
    <el-aside width="20%" style="height: 100%">
      <el-menu
        @select="handleSelect"
        style="width: 10%;top: 20%;left:20%;
        border-radius: 4px;
        position: fixed;
        justify-content: center;
        border: 0"
      >
        <el-menu-item index="unread">
          <div>
            <i class="el-icon-bell"></i>
            <span v-if="this.$root.store.state.screenWidth>= 1200" slot="title">未读消息</span>
          </div>

          <el-badge class="mark" :value="unread" v-if="this.$root.store.state.screenWidth>= 700 && unread>0"></el-badge>
        </el-menu-item >
        <el-menu-item index="all">
          <div>
            <i class="el-icon-message-solid"></i>
            <span v-if="this.$root.store.state.screenWidth>= 1200" slot="title">所有消息</span>
          </div>
        </el-menu-item>
      </el-menu>
      <el-button class="button" icon="el-icon-delete-solid" circle @click="clear"></el-button>
    </el-aside>
    <el-main style="overflow-x: hidden">
      <el-card class="message" v-for="message in messages" :key="message.id" style="width: 100%">
        <el-link type="primary" @click="$router.push('/post_detail/'+message.targetId);readMessage(message.id)">{{message.postName}}</el-link>
        <el-row>
          <el-col><i>{{message.name1}}</i></el-col>
          <el-col>{{message.opName}}了你的发布</el-col>
        </el-row>
        <div></div>
      </el-card>
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="20"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<style>
.el-menu-item{
  height:80px;
  padding-left: 15px !important;
  display: flex;
  justify-content: space-between; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  border-radius:4px;
  &:hover{
   border-radius:4px
   }
}

.button{
  font-size: 2rem;
  border: 0;
  top: 50%;
  position: fixed;
}

.message{
  margin: 10px;
}

.mark{
  right: 0;
}
</style>

<script>
import {PATH} from '../../commons/const'
import {listMessage, updateAllMessage, updateMessage, listAllMessage} from '@/network/any'

export default {
  name: 'MessageView',
  mounted () {
    this.loadData()
  },
  data () {
    return {
      type: 0,
      PATH: PATH,
      currentPage: 1,
      total: 50,
      unread: 0,
      config: {
        state: 0,
        page: 1,
        size: 10
      },
      messages: []
    }
  },
  methods: {
    clear () {
      updateAllMessage().then(res => {
        if (res.code === 200) {
          this.$message({
            message: '未读已清空！',
            type: 'success'
          })
          this.loadData()
        } else {
          this.$message({
            message: '失败',
            type: 'error'
          })
        }
      })
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
    },
    loadData () {
      if (this.type === 0) {
        listMessage({params: this.config}).then(res => {
          if (res.code === 200) {
            this.messages = res.data.list
            this.total = res.data.total
            this.unread = res.data.total
            console.log(this.messages)
            document.documentElement.scrollTop = 0
          } else {
            this.$message({
              message: '获取消息失败',
              type: 'error'
            })
          }
        })
      } else {
        listAllMessage({params: this.config}).then(res => {
          if (res.code === 200) {
            this.messages = res.data.list
            this.total = res.data.total
            console.log(this.messages)
            document.documentElement.scrollTop = 0
          } else {
            this.$message({
              message: '获取消息失败',
              type: 'error'
            })
          }
        })
      }
    },
    handleSelect (key) {
      if (key === 'unread') {
        this.type = 0
      } else {
        this.type = 1
      }
      this.loadData()
    },
    handleCurrentChange (newPage) {
      this.currentPage = newPage
      // 再次请求数据
      this.loadData()
    }
  }
}
</script>
