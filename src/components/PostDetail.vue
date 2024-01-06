<template>
  <el-card class="carousel-article" style="width: 100%; height: auto">
    <el-row type="flex" align="middle">
      <el-col :span="2">
        <el-avatar style="height: 50px;width: 50px" :src="post.avatarUrl"></el-avatar>
      </el-col>
      <el-col :span="6" style="margin-left: 20px;display: flex;align-items: center">
        <span style="font-size: 20px">{{ post.name }}</span>
      </el-col>
      <el-col :span="16" align="right" v-if="this.level >=2 || (this.id - this.post.userId) === 0">
        <el-popconfirm
          @confirm="deletePost(post.id)"
          style="border: 0"
          confirm-button-text='确认'
          cancel-button-text='取消'
          icon="el-icon-info"
          icon-color="red"
          title="确认删除帖子？"
        >
          <el-button slot="reference" @click.stop="console.log('delete')"  type="danger" plain
                     icon="el-icon-delete-solid" circle style="border: 0;"></el-button>
        </el-popconfirm>
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
                     circle style="border: 0"></el-button>
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
import {collection, delCollection, deletePost} from '@/network/any'
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
      tempCollected: false,
      level: 0,
      id: -1
    }
  },
  mounted () {
    this.tempCollected = this.post.collected
    this.level = this.$level
    this.id = this.$id
  },
  methods: {
    deletePost (postId) {
      deletePost({params: {
        postId: postId
      }}).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.$router.back()
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
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
          // userId: this.$getCookie('id'),
          postId: postId
          // createdAt: new Date()
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
