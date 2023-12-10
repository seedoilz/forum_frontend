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
              <image id="sky" class="sky" x="-100" xlink:href="@/assets/sky.jpg"  width="1500" height="660" />
              <image class="mountBg" xlink:href="@/assets/mountbg.png" width="1200" height="800"/>
              <image class="mountMg" xlink:href="@/assets/mountmg.png" width="1200" height="800"/>
              <image class="cloud2" xlink:href="@/assets/cloud2.png" width="1200" height="800"/>
              <image class="mountFg" xlink:href="@/assets/mountfg.png" width="1200" height="800"/>
<!--              <image class="cloud1" xlink:href="@/assets/cloud1.png"  width="1200" height="800"/>-->
              <image class="cloud3" xlink:href="@/assets/cloud3.png" width="1200" height="800"/>
              <text fill="#fff" x="150" y="150" font-size="2rem">printf("Hello World!");</text>
              <g mask="url(#m)">
                <rect fill="#171717" width="100%" height="100%" />
                <text x="200" y="150" fill="#162a43" font-size="2rem">Hello World!</text>
                <text x="200" y="200" fill="#162a43" font-size="2rem">:)</text>
              </g>
            </svg>
          </div>
        </div>
<!--        <h1 style="font-size: 7rem;margin-top: 20%;margin-bottom: 20%;color: #ffffff">printf("Hello World!")</h1>-->
      </el-header>
      <!--      el-main-start-->
      <el-main style="display: flex;align-items: center;justify-content: center;flex-direction: column;">
        <!--        main-->
        <div style="display: flex;align-items: center;justify-content: center;flex-direction: column; z-index: 100">
          <post-card
            v-for="post in postList" :key="post.title"
            :post="post"></post-card>
          <review></review>
          <review-editor></review-editor>
        </div>
          <el-pagination
            :hide-on-single-page="true"
            layout="prev, pager, next, jumper"
            :total="100"
          />
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
import Review from '@/components/Review.vue'
import ReviewEditor from '@/components/ReviewEditor.vue'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'MainView',
  components: {ReviewEditor, Review, NavMenu, PostCard},
  mounted () {
    this.setup()
  },
  data () {
    return {
      count: 20,
      postList: [{
        imgUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        userName: 'aaaaaa',
        title: '鹿',
        content: '这里第二种主键自增的情况在Kingbase数据库中，需创建自增序列，然后进入取值。如果迁移数据库中已有数据。可以将Start With 后面的数字调整到不会重复的大小。\n' +
          '\n' +
          '4、迁移的表格中如果有sys_xxxxx形式的表格，可能会和Kinbgbase自带表格重名，不指定查询模式时会查串。查询时可以添加模式名，a为模式名（注意不是数据库名）。\n' +
          '\n' +
          'select  * from a.sys_user\n' +
          '5、如果在Mapper中查询语句使用了!=null 或 !=\'\'，换成is not null。（注意，只有SQL语句部分替换，<if>标签中不用替换）\n' +
          '\n' +
          '6、时间格式函数据替（Kingbase中没有date_format函数）。\n' +
          '\n' +
          '// date_format(create_time, "YYMMdd")\n' +
          'to_char(to_date(create_time),\'YYMMdd\')\n' +
          ' 7、bit类型数据比较。a为bit类型数据。\n' +
          '\n' +
          '// select * from tab1 where a = 1\n' +
          'select * from tab1 where a = \'1\'\n' +
          '这里‘1’是未使用#{}符号直接写入的数字，会报错。这里有可能会出现在筛选逻辑删除等场景，建议进行排查。\n'
      }
      ]
    }
  },
  methods: {
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
        {scrollTrigger: {trigger: '.scrollDist', start: 'top top', end: 'bottom bottom', scrub: 1}})
        .fromTo('.sky', {y: -20, rotation: -5}, {y: -70, rotation: 2}, 0)
        .fromTo('.cloud1', {y: 100}, {y: -800}, 0)
        .fromTo('.cloud2', {y: -150}, {y: -500}, 0)
        .fromTo('.cloud3', {y: -50}, {y: -650}, 0)
        .fromTo('.mountBg', {y: -10}, {y: -75}, 0)
        .fromTo('.mountMg', {y: -30}, {y: -250}, 0)
        .fromTo('.mountFg', {y: -50}, {y: -600}, 0)
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
