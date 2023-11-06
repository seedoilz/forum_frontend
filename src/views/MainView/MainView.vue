<template>
  <div>
    <NavMenu>
    </NavMenu>
<!--    el-container-start-->
    <el-container>
      <el-header
        height="220"
        class="title">
        <h1 style="font-size: 10rem;margin-top: 100px;margin-bottom: 100px;color: #DDFF03">☣TITLE</h1>
      </el-header>
<!--      el-main-start-->
      <el-main style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
<!--        upper-->
        <div class="upper-container">
          <el-carousel
          type="card"
          :autoplay="false"
          height="500px"
          >
            <el-carousel-item>
              <post-card></post-card>
            </el-carousel-item>
            <el-carousel-item>
              <post-card></post-card>
            </el-carousel-item>
            <el-carousel-item>
              <post-card></post-card>
            </el-carousel-item>
          </el-carousel>
        </div>
<!--        upper-->
<!--        main-->
        <div class="main-container">
          <div class="list-wrapper">
            <ul
              class="list"
            >
              <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
            </ul>
          </div>
          <el-pagination
            :hide-on-single-page="true"
            layout="prev, pager, next, jumper"
            :total="1000"
          />
        </div>
<!--        main-->
      </el-main>
<!--      el-main-end-->
    </el-container>
<!--    el-container-end-->
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import PostCard from '@/components/PostCard'
export default {
  name: 'MainView',
  components: {NavMenu, PostCard},
  data () {
    return {
      count: 20
    }
  },
  methods: {
    load () {
      this.count += 2
      console.log(this.count)
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
}
.upper-container{
  width: 70%;
}
.main-container{
  text-align: center;
  width: 80%;
}
.list-wrapper{
  text-align: center;
  height: auto;
  overflow: auto;
}
.list-wrapper .list{
  padding: 0;
  margin: 0;
  list-style: none;
}
.list-wrapper .list-item{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #202020;
  color: #ebeef5;
  height: 50px;
}
.list-item{
  margin-top: 10px;
}
</style>
