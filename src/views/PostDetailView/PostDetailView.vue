<template>
  <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
    <el-card v-if="this.$root.store.state.screenWidth>800" style="width: 60%;margin: 10% 20% 0 20%;align-items: center">
      <el-page-header style="height: 20px; width: 100%;align-items: center;"
                      @back="goBack" content="详情页面">
      </el-page-header>
      <PostDetail style="width:100%" :post="post"></PostDetail>
      <div v-if="this.renderAvailable"  style="width: 100%">
        <Comment style="width: 100%" v-for="review in reviewList" :key="review.id"
               :review="review" :likeShowDict="likeShowDict" :selected="selectedComment"
        @selectThis="selectComment"></Comment>
      </div>
      <CommentEditor :postId="this.$route.params.postId"> </CommentEditor>
    </el-card>
    <el-card body-style="padding: 0.5rem;" v-if="this.$root.store.state.screenWidth<800" style="width: 98%;margin-top: 15%;padding:0;align-items: center">
      <el-page-header style="height: 20px; width: 100%;align-items: center;"
                      @back="goBack" content="详情页面">
      </el-page-header>
      <PostDetail style="width:100%" :post="post"></PostDetail>
      <div v-if="this.renderAvailable"  style="width: 100%;">
        <Comment style="width: 100%;padding: 0" v-for="review in reviewList" :key="review.id"
                 :review="review" :likeShowDict="likeShowDict" :selected="selectedComment"
                 @selectThis="selectComment"></Comment>
      </div>
      <CommentEditor :postId="this.$route.params.postId"></CommentEditor>
    </el-card>
    <el-pagination
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="20"
      :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>

</template>

<script>
import PostDetail from '@/components/PostDetail.vue'
import Comment from '@/components/Comment.vue'
import {postDetailById, commentByPostId} from '@/network/any'
import CommentEditor from '@/components/CommentEditor.vue'
import NavTop from '../../components/NavTop.vue'
import {userCommentThumbs} from '../../network/any'

export default {
  name: 'PostDetailView',
  watch: {
    $route (to, from) {
      console.log(to.path)
      // 当路由发生变化时，你可以在这里执行重新渲染的操作
      if (to.path.startsWith('/post_detail')) {
        // 执行重新渲染的逻辑，例如重新加载数据
        location.reload()
      }
    }
  },
  components: {
    NavTop,
    CommentEditor,
    PostDetail,
    Comment
  },
  methods: {
    handleCurrentChange (newPage) {
      this.currentPage = newPage
      // 再次请求数据
      this.loadCommentsData()
    },
    goBack () {
      this.$router.back()
    },
    selectComment (id) {
      if (this.selectedComment === id) {
        this.selectedComment = ''
      } else {
        this.selectedComment = id
      }
    },
    loadCommentsData () {
      let commentConfig = {
        params: {
          postId: this.$route.params.postId,
          page: this.currentPage,
          size: 20
        }
      }
      commentByPostId(commentConfig).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.reviewList = res.data.list
          this.total = res.data.total
          document.documentElement.scrollTop = 0
          let userCommentThumbsConfig = {
            params: {
              userId: this.$getCookie('id'),
              postId: this.$route.params.postId
            }
          }
          userCommentThumbs(userCommentThumbsConfig).then((res) => {
            // console.log(res)
            if (res.code === 200) {
              let arr = res.data
              for (let i in arr) {
                this.likeShowDict.push(arr[i])
                // this.likeShowDict[arr[i]] = true
              }
              console.log(this.likeShowDict)
              this.renderAvailable = true
            } else {
              this.$message({
                message: '评论点赞获取失败',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '评论信息获取失败',
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    let config = {
      params: {
        id: this.$route.params.postId
      }
    }
    postDetailById(config).then((res) => {
      if (res.code === 200) {
        this.post = res.data
      } else {
        this.$message({
          message: '出错',
          type: 'error'
        })
      }
    })
    this.loadCommentsData()
  },
  data () {
    return {
      post: {},
      reviewList: [],
      currentPage: 1,
      total: 50,
      likeShowDict: [],
      renderAvailable: false,
      selectedComment: ''
    }
  }
}
</script>

<style scoped>
</style>
