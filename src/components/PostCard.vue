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
  <el-card style="width:60%;height: auto;">
    <div style="width:100%;height: 100%;display: flex; flex-direction: row;">
      <el-image
        :src="post.imgUrl"
        style="width: 50%; height: 100%; "
        fit="cover">
      </el-image>
      <div style="width: 50%; height:100%; padding: 0 0 0 2%;display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center;">
          <span style="font-size: 20px;">{{ post.title }}</span>
          <div style="margin-left: auto;">
            <el-tag>标签一</el-tag>
            <el-tag type="success">标签二</el-tag>
          </div>
        </div>
        <div style="width:100%; height:100%; margin-top: 15px; overflow: hidden; text-overflow: ellipsis;">
          {{ post.content }}
        </div>
      </div>
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

