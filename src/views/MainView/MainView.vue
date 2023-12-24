<template>
  <div>
    <NavMenu>
    </NavMenu>
    <!--    el-container-start-->
    <el-container>
      <el-header
        height="2400"
        class="title">
        <div>
          <div class="scrollDist"></div>
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
              <text fill="#fff" x="150" y="150" font-size="2rem">printf("Hello World!");</text>
              <g mask="url(#m)">
                <rect fill="#171717" width="100%" height="100%"/>
                <text x="200" y="150" fill="#162a43" font-size="2rem">Hello World!</text>
                <text x="200" y="200" fill="#162a43" font-size="2rem">:)</text>
              </g>
            </svg>
          </div>
        <NavTop class="menu"></NavTop>
        </div>
        <!--        <h1 style="font-size: 7rem;margin-top: 20%;margin-bottom: 20%;color: #ffffff">printf("Hello World!")</h1>-->
      </el-header>
      <!--      el-main-start-->
      <el-main style="display: flex;align-items: center;justify-content: center;flex-direction: column;">

        <!--        main-->
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
import NavMenu from '@/components/NavMenu'
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
  components: {NavTop, ReviewEditor, Review, NavMenu, PostCard},
  destroyed () {
    window.removeEventListener('scroll', this.windowScroll)// 销毁滚动事件
  },
  mounted () {
    console.log('added')
    window.addEventListener('scroll', this.windowScroll, true) // 监听页面滚动
    this.setup()
    this.isFirstEnter = true
    console.log('mounted')
    // findPostList().then((res) => {
    //   console.log(res)
    //   if (res.code === 200) {
    //     this.postList = res.data.list
    //   } else {
    //     this.$alert('加载失败')
    //   }
    // })
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
      this.currentPage = 1
      // this.getNextPage()
      // 如果 isNeedRefresh 是 true，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // let conf = {
      //   config: {
      //     page: 0,
      //     size: 1
      //   }
      // }
      // findPostList(conf).then((res) => {
      //   console.log(res)
      //   if (res.code === 200) {
      //     this.postList = res.data.list
      //     console.log(this.res.data)
      //     this.currentPage += 1
      //   } else {
      //     this.$message({
      //       message: '出错',
      //       type: 'error'
      //     })
      //   }
      // })
    }
    // 恢复成默认的 false，避免 isFirstEnter 一直是 true，导致重复获取数据
    this.isFirstEnter = false
    // 恢复成默认的 true，避免 isNeedRefresh 一直是 false，导致下次无法获取数据
    this.$route.meta.isNeedRefresh = true
  },
  data () {
    return {
      count: 20,
      currentPage: 1,
      postList: [],
      noMore: false
    }
  },
  methods: {
    windowScroll () {
      // 获取三个值
      let scrollTop = this.getScrollTop()
      let clientHeight = this.getClientHeight()
      let scrollHeight = this.getScrollHeight()
      // console.log(scrollTop + clientHeight, scrollHeight)
      // 如果满足公式则，确实到底了
      if (Math.abs(scrollHeight - (scrollTop + clientHeight)) < 1) {
        // 发送异步请求请求数据，同时携带offset并自增offset
        // noMore是自定义变量，如果是最后一批数据则以后都不加载
        if (!this.noMore) {
          console.log('loading next!!!')
          this.getNextPage()
        } else {
          this.$message({
            message: '没有更多了',
            type: 'warning'
          })
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
          size: 30
        }
      }
      findPostList(conf).then((res) => {
        if (res.code === 200) {
          if (res.data.length < 30) {
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
      gsap.registerPlugin()
      gsap.set('.main',
        {position: 'fixed', width: '100%', height: '100%', top: 0, left: '50%', x: '-50%'})
      gsap.set('.scrollDist',
        {width: '100vh', height: '200vh'})
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
        // .fromTo('.menu', {opacity: 0}, {opacity: 1}, 0)
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

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
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
