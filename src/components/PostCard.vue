<template>
  <div style="width: 100%;display: flex;flex-direction: column;align-items: center;margin-top: 10px;max-height: 800px;">
    <el-card v-if="this.$root.store.state.screenWidth>=800" shadow="hover" class="carousel-article" style="width: 60%; height: auto;border:0;"
             @click.native="goToDetailView(post.id)">
      <el-row type="flex" align="middle" style="margin-bottom: 25px">
        <el-col :span="2">
          <el-avatar :src="post.avatarUrl"></el-avatar>
        </el-col>
        <el-col :span="6" style="margin-left: 14px;font-size:16px;display: flex;align-items: center">
          <span>{{ post.name }}</span>
        </el-col>
        <el-col :span="16" align="right" v-if="this.level >=2">
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
          <el-image style="height: 100%; width: 100%; border-radius: 4px" :src="imageUrl" fit="contain"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div>
        <div style="display: flex;justify-content: space-between">
          <h2>{{ post.title }}</h2>
          <el-row
            style="margin-block-start: 0.83em;margin-block-end: 0.83em;margin-inline-start: 0;margin-inline-end: 0;">
            <el-button @click.stop="addCollection(post.id, post.collected)" :plain="!this.tempCollected" type="success"
                       icon="el-icon-star-off" circle style="border: 0"></el-button>
            <!--          <el-button type="danger" icon="el-icon-thumb" circle></el-button>-->
          </el-row>
        </div>
        <div style="margin-left: auto;">
          <el-tag v-for="tag in post.tags" effect="dark" style="cursor: pointer" :key="tag"
                  @click.stop="goToTagSearchView(tag)">{{ tag }}
          </el-tag>
        </div>
<!--        <vue-markdown :source="post.content"></vue-markdown>-->
        <div style="overflow: hidden;max-height: 500px;" v-html="post.content"></div>
<!--        <div style="max-height: 300px;width: 100%;">-->
<!--          {{ post.content }}</div>-->
      </div>
<!--      <el-divider></el-divider>-->
      <!--    <review-->
      <!--      v-for="review in review_list" :key="review.id"-->
      <!--      :review="review"></review>-->
    </el-card>
    <el-card v-if="this.$root.store.state.screenWidth<800" shadow="hover" class="carousel-article" style="width: 100%; height: auto;border:0;"
             @click.native="goToDetailView(post.id)">
      <el-row type="flex" align="middle" style="margin-bottom: 25px">
        <el-col :span="2">
          <el-avatar :src="post.avatarUrl"></el-avatar>
        </el-col>
        <el-col :span="6" style="margin-left: 14px;font-size:16px;display: flex;align-items: center">
          <span>{{ post.name }}</span>
        </el-col>
        <el-col :span="16" align="right" v-if="this.level >=2">
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
        <el-carousel-item style="height: 100%; width: 100%; border-radius: 4px" v-for="imageUrl in post.imageUrls" :key="imageUrl">
          <el-image style="height: 100%; width: 100%; border-radius: 4px" :src="imageUrl" fit="contain"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div>
        <div style="display: flex;justify-content: space-between">
          <h2>{{ post.title }}</h2>
          <el-row
            style="margin-block-start: 0.83em;margin-block-end: 0.83em;margin-inline-start: 0;margin-inline-end: 0;">
            <el-button @click.stop="addCollection(post.id, post.collected)" :plain="!this.tempCollected" type="success"
                       icon="el-icon-star-off" circle style="border: 0"></el-button>
            <!--          <el-button type="danger" icon="el-icon-thumb" circle></el-button>-->
          </el-row>
        </div>
        <div style="margin-left: auto;">
          <el-tag v-for="tag in post.tags" effect="dark" style="cursor: pointer" :key="tag"
                  @click.stop="goToTagSearchView(tag)">{{ tag }}
          </el-tag>
        </div>
        <vue-markdown :source="post.content"></vue-markdown>
<!--        <p style="max-height: 300px;width: 100%;">-->
<!--          23124214211421</p>-->
      </div>
<!--      <el-divider></el-divider>-->
      <!--    <review-->
      <!--      v-for="review in review_list" :key="review.id"-->
      <!--      :review="review"></review>-->
    </el-card>
  </div>
</template>

<script>
import {collection, delCollection, deletePost} from '@/network/any'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'PostCard',
  components: {VueMarkdown},
  data () {
    return {
      level: 0,
      loading: true,
      currentDate: '2021-06-01',
      tempCollected: false
    }
  },
  props: {
    post: Object
  },
  mounted () {
    this.tempCollected = this.post.collected
    this.level = this.$level
    console.log(this.level)
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
          location.reload()
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    goToDetailView (postId) {
      // 使用Vue Router导航到DetailView，并传递不同的cardId参数
      this.$router.push({name: 'PostDetailView', params: {postId}})
    },
    goToTagSearchView (tag) {
      this.$router.push({name: 'TagSearchView', params: {tag}})
    },
    addCollection (postId) {
      if (this.tempCollected) {
        let config = {
          params: {
            postId: postId
          }
        }
        delCollection(config).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '取消收藏成功',
              type: 'success'
            })
            this.tempCollected = !this.tempCollected
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
            this.tempCollected = !this.tempCollected
          } else {
            this.$message({
              message: '收藏失败',
              type: 'error'
            })
          }
        })
      }
    }
  }
}

</script>

<style>
p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.el-image img{
  border-radius: 4px;
}
</style>
