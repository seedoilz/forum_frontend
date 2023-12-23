<template>
  <div>
    <NavMenu>
    </NavMenu>
    <!--    el-container-start-->
    <el-container>
      <!--      el-main-start-->
      <el-main style="display: flex;align-items: center;flex-direction: column;">

        <!--        main-->
        <div
          style="width:100%;display: flex;align-items: center;margin-top:10%;justify-content: center;flex-direction: column; z-index: 100">
          <keep-alive v-for="post in postList" :key="post.title">
            <post-card
              :post="post"></post-card>
          </keep-alive>

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
import {postsByTag} from '../../network/any'

export default {
  name: 'TagSearchView',
  components: {ReviewEditor, Comment, NavMenu, PostCard},
  watch: {
    $route (to, from) {
      // 当路由发生变化时，你可以在这里执行重新渲染的操作
      if (to.path.startsWith('/tag_search')) {
        // 执行重新渲染的逻辑，例如重新加载数据
        this.loadData()
      }
    }
  },
  mounted () {
    this.loadData()
  },
  data () {
    return {
      count: 20,
      postList: [{
        id: '6583b9c603a12c8160daa9fd',
        imageUrls: ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'],
        userId: 'aaaaaa',
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
    loadData () {
      let config = {
        params: {
          tag: this.$route.params.tag
        }
      }
      postsByTag(config).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.postList = res.data
        } else {
          this.$alert('通过tag获取post数据失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
