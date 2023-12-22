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
      <el-button round style="margin:10px 20px 0 0">评论</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CommentEditor',
  data () {
    return {
      reviewContent: ''
    }
  }
}
</script>

<style scoped>

</style>
