<template>
  <div>
    <NavMenu>
    </NavMenu>
    <!--    el-container-start-->
    <el-container>
      <el-header
        height="2400"
        class="title">
        <el-menu
          class="menu"
          default-active="1"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
          style="width: 100%;border: 0;margin: 0;padding: 0">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
        <!--        <h1 style="font-size: 7rem;margin-top: 20%;margin-bottom: 20%;color: #ffffff">printf("Hello World!")</h1>-->
      </el-header>
      <!--      el-main-start-->
      <el-main style="display: flex;align-items: center;flex-direction: column;">

        <!--        main-->
        <div
          style="display: flex;align-items: center;margin-top:0;justify-content: center;flex-direction: column; z-index: 100">
          <post-card
            v-for="post in postList" :key="post.title"
            :post="post" style="margin-top:10px"></post-card>
<!--          <review></review>-->
<!--          <review-editor></review-editor>-->
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
import ReviewEditor from '../../components/CommentEditor.vue'
import Comment from '../../components/Comment.vue'
import NavMenu from '../../components/NavMenu.vue'
import PostCard from '../../components/PostCard.vue'

export default {
  name: 'MainView',
  components: {ReviewEditor, Comment, NavMenu, PostCard},
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
  }
}
</script>

<style scoped>

</style>
