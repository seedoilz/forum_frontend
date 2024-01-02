<template>
  <el-card class="carousel-article" style="width: 100%; height: auto">
    <el-row type="flex" align="middle">
      <el-col :span="2">
        <el-avatar style="height: 50px;width: 50px" :src="post.avatarUrl"></el-avatar>
      </el-col>
      <el-col :span="6" style="margin-left: 20px;display: flex;align-items: center">
        <span style="font-size: 20px">{{ post.name }}</span>
      </el-col>
    </el-row>
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
          <el-button @click.stop="addCollection(post.id)" :plain="!post.collected" type="success" icon="el-icon-star-off"
                     circle></el-button>
          <!--          <el-button type="danger" icon="el-icon-thumb" circle></el-button>-->
        </el-row>
      </div>
      <div style="margin-left: auto;">
        <el-tag v-for="tag in post.tags" :key="tag" effect="dark" style="cursor: pointer"
                @click.stop="goToTagSearchView(tag)">{{ tag }}
        </el-tag>
      </div>
      <div class="ql-snow">
        <div class="ql-editor">
          <div v-html="post.content"></div>
        </div>
      </div>

<!--      <vue-markdown :source="post.content"></vue-markdown>-->
      <!--      <p style="max-height: 300px;width: 100%;">-->
      <!--        {{ post.content }}</p>-->
    </div>
  </el-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import {collection, delCollection} from '@/network/any'
import '@/assets/css/quill.bubble.css'
import '@/assets/css/quill.core.css'
import '@/assets/css/quill.snow.css'
export default {
  name: 'PostDetail',
  components: {
    VueMarkdown
  },
  props: {
    post: Object
  },
  data () {
    return {
      tempCollected: false
    }
  },
  mounted () {
    this.tempCollected = this.post.collected
  },
  methods: {
    addCollection (postId) {
      if (this.post.collected) {
        let config = {
          params: {
            postId: postId
          }
        }
        delCollection(config).then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.$message({
              message: '取消收藏成功',
              type: 'success'
            })
            this.post.collected = !this.post.collected
            location.reload()
          } else {
            this.$message({
              message: '取消收藏出错',
              type: 'error'
            })
          }
        })
      } else {
        let collectionForm = {
          userId: this.$getCookie('id'),
          postId: postId,
          createdAt: new Date()
        }
        collection(collectionForm).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '收藏成功',
              type: 'success'
            })
            this.post.collected = !this.post.collected
          } else {
            this.$message({
              message: '收藏失败',
              type: 'error'
            })
          }
        })
      }
    },
    goToTagSearchView (tag) {
      this.$router.push({name: 'TagSearchView', params: {tag}})
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
