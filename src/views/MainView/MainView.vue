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
        <post-card
          v-for="post in postList" :key="post.title"
          :post="post"></post-card>
        <review></review>
        <review-editor></review-editor>
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
import Review from '@/components/Review.vue'
import ReviewEditor from '@/components/ReviewEditor.vue'

export default {
  name: 'MainView',
  components: {ReviewEditor, Review, NavMenu, PostCard},
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
          '这里‘1’是未使用#{}符号直接写入的数字，会报错。这里有可能会出现在筛选逻辑删除等场景，建议进行排查。\n' +
          '\n' +
          '\n' +
          '————————————————\n' +
          '版权声明：本文为CSDN博主「neeee1」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。\n' +
          '原文链接：https://blog.csdn.net/neeee1/article/details/132689849'
      }
      ]
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
