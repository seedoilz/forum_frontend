<template>
  <!--    <el-skeleton style="width:400px;height: 200px" :loading="loading" animated :count="1">-->
  <!--        <template slot="template">-->
  <!--          <div style="display: flex;flex-direction: row">-->
  <!--            <el-skeleton-item-->
  <!--            variant="image"-->
  <!--            style="width: 50%; height: 200px;"-->
  <!--          />-->
  <!--          <div style="padding: 14px;width: 50%">-->
  <!--            <el-skeleton-item variant="h3" style="width: 100%;" />-->
  <!--            <div-->
  <!--              style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;"-->
  <!--            >-->
  <!--              <el-skeleton-item variant="text" style="margin-right: 16px;" />-->
  <!--              <el-skeleton-item variant="text" style="width: 30%;" />-->
  <!--            </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </template>-->
  <!--      </el-skeleton>-->
  <el-card shadow="hover" class="carousel-article" style="width: 60%; height: auto;border:0;"  @click.native="goToDetailView(post.id)">
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
          <el-button type="success" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-thumb" circle></el-button>
        </el-row>
      </div>
      <div style="margin-left: auto;">
        <el-tag v-for="tag in post.tags" :key="tag">{{tag}}</el-tag>
      </div>
      <p style="max-height: 300px;width: 100%;">
        {{ post.content }}</p>
    </div>
    <el-divider></el-divider>
<!--    <review-->
<!--      v-for="review in review_list" :key="review.id"-->
<!--      :review="review"></review>-->
  </el-card>
</template>

<script>
export default {
  name: 'PostCard',
  data () {
    return {
      loading: true,
      currentDate: '2021-06-01'
    }
  },
  props: {
    post: Object
  },
  methods: {
    goToDetailView (postId) {
      // 使用Vue Router导航到DetailView，并传递不同的cardId参数
      this.$router.push({name: 'PostDetailView', params: {postId}})
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
</style>
