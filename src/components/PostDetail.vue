<template>
  <el-card class="carousel-article" style="width: 100%; height: auto">
    <el-carousel :interval="5000" arrow="always">
      <!-- Carousel Items -->
      <el-carousel-item style="height: 100%; width: 100%">
        <el-image style="height: 100%; width: 100%" :src="post.imgUrl" fit="contain"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div>
      <h2>{{ post.title }}</h2>
      <div style="margin-left: auto;">
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
      </div>
      <vue-markdown :source="post.content"></vue-markdown>
<!--      <p style="max-height: 300px;width: 100%;">-->
<!--        {{ post.content }}</p>-->
    </div>
  </el-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'PostDetail',
  components: {
    VueMarkdown
  },
  props: {
    post: Object
  }
}
</script>

<style scoped>

</style>
