<template>
  <el-card class="carousel-article" style="width: 100%; height: auto">
    <el-carousel :interval="5000" arrow="always">
      <!-- Carousel Items -->
      <el-carousel-item style="height: 100%; width: 100%" v-for="imageUrl in post.imageUrls" :key="imageUrl">
        <el-image style="height: 100%; width: 100%;" :src="imageUrl" fit="contain"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div>
      <div style="display: flex;justify-content: space-between">
        <h1>{{ post.title }}</h1>
        <el-row style="margin-block-start: 1.5em;margin-block-end: 1.5em;margin-inline-start: 0;margin-inline-end: 0;">
          <el-button type="success" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-thumb" circle></el-button>
        </el-row>
      </div>
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
