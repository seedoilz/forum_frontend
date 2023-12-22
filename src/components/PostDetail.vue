<template>
  <el-card class="carousel-article" style="width: 100%; height: auto">
    <el-carousel v-if="post.imageUrls && post.imageUrls.length > 0" :interval="5000" arrow="always">
      <!-- Carousel Items -->
      <el-carousel-item style="height: 100%; width: 100%" v-for="imageUrl in post.imageUrls" :key="imageUrl">
        <el-image style="height: 100%; width: 100%;" :src="imageUrl" fit="contain"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div>
      <div style="display: flex;justify-content: space-between">
        <h1>{{ post.title }}</h1>
        <el-row style="margin-block-start: 1.5em;margin-block-end: 1.5em;margin-inline-start: 0;margin-inline-end: 0;">
          <el-button @click="addCollection(post.id)" type="success" icon="el-icon-star-off" circle></el-button>
<!--          <el-button type="danger" icon="el-icon-thumb" circle></el-button>-->
        </el-row>
      </div>
      <div style="margin-left: auto;">
        <el-tag v-for="tag in post.tags" :key="tag">{{ tag }}</el-tag>
      </div>
      <vue-markdown :source="post.content"></vue-markdown>
      <!--      <p style="max-height: 300px;width: 100%;">-->
      <!--        {{ post.content }}</p>-->
    </div>
  </el-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import {collection} from '@/network/any'

export default {
  name: 'PostDetail',
  components: {
    VueMarkdown
  },
  props: {
    post: Object
  },
  methods: {
    addCollection (postId) {
      let collectionForm = {
        userId: this.$getCookie('id'),
        postId: postId,
        createdAt: new Date()
      }
      collection(collectionForm).then((res) => {
        if (res.code === 200) {
          this.$alert('收藏成功')
        } else {
          this.$alert('收藏失败')
        }
      })
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
