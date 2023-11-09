<template>
  <div class="post-page">
    <h1>发布新帖子</h1>
    <form @submit.prevent="submitPost" class="post-form">
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" v-model="postMessage.title" required>
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea id="content" v-model="postMessage.content" required></textarea>
      </div>
      <div class="form-group">
        <label for="tags">标签</label>
        <input type="text" id="tags" v-model="postMessage.tags" placeholder="用逗号分隔">
      </div>
      <el-button type="primary" round>发布</el-button>
    </form>
  </div>
</template>

<script>
import { messagePost } from '@/network/sign'
import { PATH } from '@/commons/const'

export default {
  name: 'PostView',
  data() {
    return {
      postMessage: {
        title: '',
        content: '',
        tags: ''
      }
    }
  },
  methods: {
    submitPost() {
      messagePost(this.postMessage).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.$router.push(PATH.MAIN_VIEW)
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #f0f0f0; /* 与post-page相搭配的颜色 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 让内容垂直居中 */
}

.post-page {
  width: 90vw; /* 宽度为视口宽度的90% */
  max-width: 800px; /* 设置最大宽度为800px */
  background-color: #fff;
  padding: 5vw; /* 以视口宽度的百分比设置内边距 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 5vh; /* 设置下边距为视口高度的百分比 */
}

.post-form {
  padding: 5vw; /* 以视口宽度的百分比设置内边距 */
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 150px;
  resize: none;
}

button {
  display: block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #0099ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>
