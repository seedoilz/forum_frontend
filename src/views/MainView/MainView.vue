<template>
  <div>
    <!--    el-container-start-->
    <el-container>
      <el-header
        height="2400"
        class="title">
        <div id="arrowBtn" ref="arrowBtn" style="top: 10%;width: 80%;height:90%;cursor:pointer;position: absolute;z-index: 1000"></div>
        <div>
          <div class="scrollDist" ref="scrollDist"></div>
          <div class="main">
            <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
              <mask id="m">
                <g class="cloud1">
                  <rect fill="#fff" width="100%" height="801" y="799"/>
                  <image xlink:href="@/assets/cloud1mask.jpg" width="1200" height="800"/>
                </g>
              </mask>
              <image id="sky" class="sky" x="-100" xlink:href="@/assets/sky.jpg" width="1500" height="660"/>
              <image class="mountBg" xlink:href="@/assets/mountbg.png" width="1200" height="800"/>
              <image class="mountMg" xlink:href="@/assets/mountmg.png" width="1200" height="800"/>
              <image class="cloud2" xlink:href="@/assets/cloud2.png" width="1200" height="800"/>
              <image class="mountFg" xlink:href="@/assets/mountfg.png" width="1200" height="916"/>
              <!--              <image class="cloud1" xlink:href="@/assets/cloud1.png"  width="1200" height="800"/>-->
              <image class="cloud3" xlink:href="@/assets/cloud3.png" width="1200" height="800"/>
              <text fill="#fff" x="150" y="150" font-size="2rem">嗷嗷嗷~</text>
              <g mask="url(#m)">
                <rect fill="#171717" width="100%" height="100%"/>
                <text x="200" y="150" fill="#162a43" font-size="2rem">🐺</text>
                <text x="200" y="200" fill="#162a43" font-size="2rem">:)</text>
              </g>
            </svg>
          </div>
        </div>
        <!--        <h1 style="font-size: 7rem;margin-top: 20%;margin-bottom: 20%;color: #ffffff">printf("Hello World!")</h1>-->
      </el-header>
      <!--      el-main-start-->
      <el-main id="main-content" style="display: flex;align-items: center;justify-content: center;flex-direction: column;">

        <!--        main-->
        <el-row class="selector">
          <el-col :span="4" class="selector-item">
            <span class="selector-label">时间</span>
            <el-select v-model="options.time">
              <el-option
                v-for="item in time"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="selector-item">
            <span class="selector-label">排序</span>
            <el-select v-model="options.sortBy">
              <el-option
                v-for="item in sortBy"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="selector-item">
            <span class="selector-label">顺序</span>
            <el-select v-model="options.order">
            <el-option
              v-for="item in order"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          </el-col>
        </el-row>
        <div
          style="width:100%;display: flex;align-items: center;margin-top:10%;justify-content: center;flex-direction: column; z-index: 100">
          <keep-alive v-for="post in postList" :key="post.id">
            <post-card :post="post"></post-card>
          </keep-alive>

        </div>
        <!--        </div>-->
        <!--        main-->
      </el-main>
      <!--      el-main-end-->
    </el-container>
    <!--    el-container-end-->
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'
import Review from '@/components/Comment.vue'
import ReviewEditor from '@/components/CommentEditor.vue'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {findPostList} from '@/network/any'
import NavTop from '../../components/NavTop.vue'

gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'MainView',
  components: {NavTop, ReviewEditor, Review, PostCard},
  watch: {
    options: {
      immediate: false,
      deep: true,
      handler (val) {
        console.log(val)
        this.isFirstEnter = true
        this.postList = []
        this.currentPage = 1
        this.noMore = false
        this.getNextPage()
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.windowScroll)// 销毁滚动事件
  },
  mounted () {
    console.log('added')
    window.addEventListener('scroll', this.windowScroll, true) // 监听页面滚动
    this.setup()
    this.postList = []
    this.isFirstEnter = true
    console.log('mounted')
    // this.currentPage = 1
    // this.noMore = false
    // this.getNextPage()
  },
  beforeRouteEnter (to, from, next) {
    // 利用路由元信息中的 meta 字段设置变量，方便在各个位置获取。这就是为什么在 meta 中定义 isNeedRefresh。
    // 当从详情页返回时，将 isNeedRefresh 设为 false，表示不刷新数据
    if (from.name === 'PostDetailView') {
      to.meta.isNeedRefresh = false
    } else {
      to.meta.isNeedRefresh = true
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    window.removeEventListener('scroll', this.windowScroll, true)// 销毁滚动事件
    console.log('destroyed')
    next()
  },
  activated () {
    window.addEventListener('scroll', this.windowScroll, true) // 监听页面滚动
    console.log('activated')
    console.log(this.$route.meta.isNeedRefresh)
    if (this.$route.meta.isNeedRefresh || this.isFirstEnter) {
      console.log('nextPage')
      this.postList = []
      this.currentPage = 1
      this.noMore = false
      this.getNextPage()
    }
    // 恢复成默认的 false，避免 isFirstEnter 一直是 true，导致重复获取数据
    this.isFirstEnter = false
    // 恢复成默认的 true，避免 isNeedRefresh 一直是 false，导致下次无法获取数据
    this.$route.meta.isNeedRefresh = true
  },
  data () {
    return {
      count: 20,
      lastTime: 0,
      currentPage: 1,
      postList: [],
      noMore: false,
      options: {
        time: '所有时间',
        sortBy: '热度',
        order: '降序'
      },
      time: ['所有时间', '一天内', '一周内', '一月内', '一年内'],
      sortBy: ['热度', '时间', '评论数'],
      order: ['降序', '升序']
    }
  },
  methods: {
    windowScroll () {
      // 获取三个值
      let now = new Date().valueOf()
      let scrollTop = this.getScrollTop()
      let clientHeight = this.getClientHeight()
      let scrollHeight = this.getScrollHeight()
      // console.log(scrollTop + clientHeight, scrollHeight)
      // 如果满足公式则，确实到底了
      if (Math.abs(scrollHeight - (scrollTop + clientHeight)) < 200) {
        // 发送异步请求请求数据，同时携带offset并自增offset
        // noMore是自定义变量，如果是最后一批数据则以后都不加载
        if (this.lastTime === 0 || (now - this.lastTime) > 2000) {
          if (!this.noMore) {
            console.log('loading next!!!')
            this.getNextPage()
          } else {
            this.$message({
              message: '没有更多了',
              type: 'warning'
            })
          }
          console.log('触发事件')
          this.lastTime = now
        } else {
          console.log('不触发')
        }
      }
    },
    // 获取当前可视范围的高度
    getClientHeight () {
      var clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
      } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
      }
      return clientHeight
    },

    // 获取文档完整的高度
    getScrollHeight () {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    },
    // 获取当前滚动条的位置
    getScrollTop () {
      var scrollTop = 0
      // window.pageYOffset = document.documentElement.scrollTop
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      return scrollTop
    },
    getNextPage () {
      let conf = {
        params: {
          page: this.currentPage,
          size: 5
        }
      }
      findPostList(this.options, conf).then((res) => {
        if (res.code === 200) {
          if (res.data.length < 5) {
            this.noMore = true
          }
          console.log('page', this.currentPage)
          this.postList = this.postList.concat(res.data)
          this.currentPage += 1
          console.log(this.postList)
        } else {
          this.$message({
            message: '出错',
            type: 'error'
          })
        }
      })
    },
    goToDetailView (postId) {
      // 使用Vue Router导航到DetailView，并传递不同的cardId参数
      this.$router.push({name: 'PostDetailView', params: {postId}})
    },
    load () {
      this.count += 2
      console.log(this.count)
    },
    setup () {
      // gsap.registerPlugin()
      gsap.set('.main',
        {position: 'fixed', width: '100%', height: '100%', top: 0, left: '50%', x: '-50%'})
      gsap.set('.scrollDist',
        {width: '100vh', height: '101vh'})
      gsap.timeline(
        {
          scrollTrigger: {
            trigger: '.scrollDist',
            start: 'top top',
            end: 'bottom bottom',
            // toggleClass: {
            //   targets: '.menu',
            //   className: 'short'
            // },
            scrub: 1
          }
        })
        .fromTo('.sky', {y: -20, rotation: -5}, {y: -70, rotation: 2}, 0)
        .fromTo('.cloud1', {y: 500}, {y: -800}, 0)
        .fromTo('.cloud2', {y: -150}, {y: -500}, 0)
        .fromTo('.cloud3', {y: -50}, {y: -650}, 0)
        .fromTo('.mountBg', {y: -50}, {y: -115}, 0)
        .fromTo('.mountMg', {y: -30}, {y: -150}, 0)
        .fromTo('.mountFg', {y: -50}, {y: -600}, 0)
        .fromTo('#main-content', {y: 100}, {y: -500}, 0)
        .fromTo('#arrowBtn', {y: 0}, {y: -600}, 0)
        // .fromTo('.menu', {opacity: 0}, {opacity: 1}, 0)
      this.$refs['arrowBtn'].addEventListener('click', (e) => {
        gsap.to(window, {scrollTo: 100, duration: 0.5, ease: 'power1.inOut'})
      }, true)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
body, html {
  min-height: 200vh;
}

/*div {*/
/*  position:absolute;*/
/*}*/
.selector{
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
}

.selector-item{
  width: 120px;
  margin: 10px;
}

.selector-label{
  margin-left: 5px;
  color: white;
  font-size: 1rem;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;

}

.menu {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
}

/*.menu.short{*/
/*  bottom: 0;*/
/*}*/

.upper-container {
  width: 70%;
}

.main-container {
  text-align: center;
  width: 80%;
}

.list-wrapper {
  text-align: center;
  height: auto;
  overflow: auto;
}

.list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #202020;
  color: #ebeef5;
  height: 50px;
}

.list-item {
  margin-top: 10px;
}
</style>
