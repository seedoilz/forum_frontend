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
  <el-card class="carousel-article" style="width: 60%; height: auto">
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
      <p style="max-height: 300px;width: 100%;">
        {{ post.content }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PostCard',
  data() {
    return {
      loading: true,
      currentDate: '2021-06-01'
    }
  },
  props: {
    post: Object
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
</style>
