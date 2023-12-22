<template>
  <div class="comment-box" style="width: 100%">
    <div style="display: flex;flex-direction: row">
      <div style="margin-top: 10px;width: 7%;margin-right: 10px">
        <el-avatar style="margin:0 0 0 30%" src="path/to/avatar.jpg" ></el-avatar>
      </div>
      <div style="width: 90%;margin-top: 10px">
        <el-input
          type="textarea"
          placeholder="发布你的评论"
          :autosize="{ minRows: 1, maxRows: 4}"
          v-model="reviewContent">
        </el-input>
      </div>
    </div>
    <el-row style="display:flex;justify-content: end">
      <el-button @click="submitComment()" round style="margin:10px 20px 0 0">评论</el-button>
    </el-row>
  </div>
</template>

<script>
import {comment} from '@/network/any'

export default {
  name: 'CommentEditor',
  data () {
    return {
      reviewContent: ''
    }
  },
  methods: {
    submitComment () {
      let commentForm = {
        userId: this.$getCookie('id'),
        postId: this.postId,
        content: this.reviewContent,
        thumbs: 0,
        createdAt: new Date()
      }
      comment(commentForm).then((res) => {
        if (res.code === 200) {
          this.reviewContent = ''
          location.reload()
        } else {
          this.$alert('评论失败')
        }
      })
    }
  },
  props: {
    postId: String
  }
}
</script>

<style scoped>

</style>
