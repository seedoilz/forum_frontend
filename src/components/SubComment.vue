<template>
  <div style="width: 100%; right: 0;display: flex;align-items: end;flex-direction: column;">
    <el-card body-style="padding:1rem 0.5rem 1rem 0.5rem;" class="comment" v-on:click="commentOnComment" style="width: 100%">
      <el-row type="flex" align="middle" class="comment-row">
        <el-col :span="2">
          <el-avatar class="comment-avatar" :src="review.avatarUrl"></el-avatar>
        </el-col>
        <el-col :span="18" class="comment-content">
          <div>
            <span class="username">{{ review.username }}</span>
            <span> 回复 </span>
            <span class="username">{{ review.parentName }}:</span>
            <span class="comment-text">{{ review.content }}</span>
          </div>
          <div class="comment-time">{{ getDate(review.createdAt)  }}</div>
        </el-col>
        <el-col :span="3" class="comment-actions">
          <!--        <el-button type="text" icon="el-icon-chat-dot-square"></el-button>-->
          <span>
          <el-button size="mini" circle type="primary" :plain="!tempShow" icon="el-icon-thumb" @click="thumb(review.id)" style="text-align: center">
          </el-button>

        </span>

          <!--        <el-button type="text" icon="el-icon-thumb-down"></el-button>-->
        </el-col>
        <el-col :span="1" style="text-align: center;justify-content: center">
          <el-badge class="mark" type="primary" :value="thumbNums" />
        </el-col>
        <el-col :span="1" class="comment-comment">
        <span>
          <el-button size="mini" type="text" icon="el-icon-s-comment" @click="commentOnComment(review.id)">
          </el-button>
        </span>
        </el-col>
      </el-row>
    </el-card>
    <div class="comment-editor" v-show="selected===review.id" style="width: 100%;">
      <span style="width: 80%;margin-top: 10px">
        <el-input
          type="textarea"
          placeholder="回复一下"
          :autosize="{ minRows: 1, maxRows: 4}"
          v-model="reviewContent">
        </el-input>
      </span>
      <span style="display:flex;justify-content: end">
        <el-button @click="submitComment(review.id)" round style="margin:10px 20px 0 0">评论</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import {cancelCommentThumb, comment, commentThumb} from '@/network/any'

export default {
  name: 'SubComment',
  data () {
    return {
      tempShow: false,
      thumbNums: 0,
      reviewContent: '',
      selectedComment: ''
    }
  },
  mounted () {
    this.tempShow = this.likeShow
    this.thumbNums = this.review.thumbs
  },
  methods: {
    getDate (timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const hours = ('0' + date.getHours()).slice(-2)
      const minutes = ('0' + date.getMinutes()).slice(-2)
      const seconds = ('0' + date.getSeconds()).slice(-2)
      const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      return formattedDate
    },
    commentOnComment () {
      this.$emit('selectThis', this.review.id)
      this.selectedComment = ''
    },
    submitComment (commentId) {
      let commentInfo = {
        // userId: this.$getCookie('id'),
        postId: this.review.postId,
        parentId: commentId,
        rootId: this.rootId,
        content: this.reviewContent,
        thumbs: 0
        // createdAt: new Date()
      }
      comment(commentInfo).then((res) => {
        if (res.code === 200) {
          this.reviewContent = ''
          location.reload()
        } else {
          this.$message({
            message: '评论失败',
            type: 'error'
          })
        }
      })
    },
    thumb (commentId) {
      if (this.tempShow) {
        let config = {
          params: {
            commentId: commentId,
            postId: this.$route.params.postId
          }
        }
        cancelCommentThumb(config).then((res) => {
          if (res.code === 200) {
            this.tempShow = !this.tempShow
            this.thumbNums = this.thumbNums - 1
          } else {
            this.$alert('失败')
          }
        })
      } else {
        let config = {
          params: {
            commentId: commentId,
            postId: this.$route.params.postId
          }
        }
        commentThumb(config).then((res) => {
          if (res.code === 200) {
            this.tempShow = !this.tempShow
            this.thumbNums = this.thumbNums + 1
          } else {
            this.$alert('失败')
          }
        })
      }
    }
  },
  props: {
    review: Object,
    selected: String,
    showEditor: Boolean,
    rootId: String,
    likeShow: Boolean
  }
}
</script>

<style scoped>
.comment {
  width: 50%;
  border-radius: 4px;
  margin-bottom: 10px;
}

.comment-avatar{
  width: 2rem;
  height: 2rem;
}

.comment-row {
  font-size: 1rem;
}

.username {
  font-weight: bold;
  /*margin-right: 5px;*/
}

.comment-text {
  color: #c9c9c9;
}

.comment-time {
  font-size: 0.8em;
  color: #999;
}

.comment-actions {
  text-align: right;
}

.comment button{
  width: 2rem;
  height: 2rem;
  border: 0;
  font-size: 1rem;
  text-align: center;
}

.comment-comment{
  text-align: right;
}

.comment-actions .el-button span {
  color: #333;
}

/* 在此处添加更多样式来满足你的设计需求 */
</style>
