<template>
  <div>
    <!--    el-container-start-->
    <el-container>
      <!--      el-main-start-->
      <el-main style="display: flex;align-items: center;flex-direction: column;margin-top: 10%">
        <h1 style="left: 20%;position: absolute;font-size: 3rem;margin-top: 10px;margin-bottom: 10px;color: #26bbff">#{{this.$route.params.tag}}</h1>
        <!--        main-->
        <div
          style="width:100%;display: flex;align-items: center;margin-top:10%;justify-content: center;flex-direction: column; z-index: 100">
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
          <keep-alive v-for="post in postList" :key="post.title">
            <post-card
              :post="post"></post-card>
          </keep-alive>

        </div>
        <el-pagination
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="20"
          :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
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
import PostCard from '../../components/PostCard.vue'
import {postsByTag} from '../../network/any'

export default {
  name: 'TagSearchView',
  components: {ReviewEditor, Comment, PostCard},
  watch: {
    $route (to, from) {
      // 当路由发生变化时，你可以在这里执行重新渲染的操作
      if (to.path.startsWith('/tag_search')) {
        // 执行重新渲染的逻辑，例如重新加载数据
        this.loadData()
      }
    },
    options: {
      immediate: false,
      deep: true,
      handler (val) {
        console.log(val)
        this.postList = []
        this.currentPage = 1
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
      currentPage: 1,
      postList: [
      ],
      total: 50,
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
    handleCurrentChange (newPage) {
      this.currentPage = newPage
      // 再次请求数据
      this.loadData()
    },
    loadData () {
      let config = {
        params: {
          tag: this.$route.params.tag,
          page: this.currentPage,
          size: 20
        }
      }
      postsByTag(this.options, config).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.total = res.data.total
          this.postList = res.data.list
          document.documentElement.scrollTop = 0
        } else {
          this.$message({
            message: '通过tag获取post数据失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
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
</style>
