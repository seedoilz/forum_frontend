<template>
  <el-card style="margin: 1% 20% 0 20%;display: flex;flex-direction: column;align-items: center">
    <el-page-header style="height: 50px; width: 100%; display: flex; flex-direction: row; align-items: center;"
                    @back="goBack" content="详情页面">
    </el-page-header>
    <PostDetail :post="post"></PostDetail>
    <Comment style="width: 100%" v-for="review in reviewList" :key="review.title"
             :review="review"></Comment>
  </el-card>
</template>

<script>
import PostDetail from '../../components/PostDetail.vue'
import Comment from '../../components/Comment.vue'

export default {
  name: 'PostDetailView',
  components: {
    PostDetail,
    Comment
  },
  methods: {
    goBack () {
      console.log('go back')
    }
  },
  data () {
    return {
      post: {
        imageUrls: ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'],
        userId: 123123,
        title: '鹿',
        content: '# 啊都放假啦啥地方就看看老大\n' +
          '**这里第**二种主键自增的情况在Kingbase数据库中，需创建自增序列，然后进入取值。如果迁移数据库中已有数据。可以将Start With 后面的数字调整到不会重复的大小。\n' +
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
      },
      reviewList: [{
        userName: 'seedoilz',
        avatar_url: '',
        content: '我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。',
        time: '2023年12月11日 13:13',
        thumbs: 13
      },
      {
        userName: 'seedoilz',
        content: '我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。',
        time: '2023年12月11日 13:13',
        thumbs: 13
      }, {
        userName: 'seedoilz',
        content: '我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。',
        time: '2023年12月11日 13:13',
        thumbs: 13
      },
      {
        userName: 'seedoilz',
        content: '我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。我的回复大概有这么长。',
        time: '2023年12月11日 13:13',
        thumbs: 13
      }]
    }
  }
}
</script>

<style scoped>

</style>
