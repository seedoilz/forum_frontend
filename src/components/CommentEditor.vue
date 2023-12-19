<template>
  <div class="comment-box" style="width: 50%">
    <div style="display: flex;flex-direction: row">
      <div style="margin-top: 10px;width: auto;margin-right: 10px">
        <el-avatar src="path/to/avatar.jpg" ></el-avatar>
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
      <el-button round style="margin-top: 10px">评论</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ReviewEditor',
  data () {
    return {
      reviewContent: ''
    }
  }
}
</script>

<style scoped>

</style>
