<template>
  <el-card class="managecontent">
    <div slot="header" class="clearfix">
      <span style="font-size:1.5rem">内容管理</span>
    </div>
    <!-- <div class="searchResult">
    </div> -->
    <div class="firstmodel">
      <!--      <div class="screening-conditions">-->
      <!--        <ul>-->
      <!--          <li v-for="(item,index) in ScreenList" :key="index" @click="ChoseScreen(index)"-->
      <!--              :style="{'color':item.chose?'black':''}">{{ item.title }}-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->
      <div class="screening-conditionsB">
        <!--        <div class="time-chose">-->
        <!-- 月份选择 -->
        <!--          <div class="chosemonth">-->
        <!--            <el-date-picker-->
        <!--              v-model="timechose"-->
        <!--              type="month"-->
        <!--              placeholder="选择月">-->
        <!--            </el-date-picker>-->
        <!--          </div>-->
        <!-- 对博客列表进行搜索 -->
        <!--          <div class="search">-->
        <!--            <el-input placeholder="请输入内容" v-model="searchblog" class="input-with-select">-->
        <!--              <el-button @click="SearchBlog" slot="append" icon="el-icon-search"></el-button>-->
        <!--            </el-input>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div ref="writeBlog" class="writeBlog">-->
        <!--          <div>这里啥也没有啊</div>-->
        <!--          <button @click="TurnToWriteBlog">写博客</button>-->
        <!--        </div>-->
        <!--        <div ref="noneSearch" class="nonesearch">-->
        <!--          啥也没搜到！-->
        <!--        </div>-->
        <div ref="firstContent" class="show-content">
          <div class="F-1" v-for="(item,index) in List" :key="index">
            <div class="BlogContent-a">
              <div @click="TurnToShow(item.id)" class="BlogContent-1">{{ item.title }}</div>
              <div class="BlogContent-2">{{ item.description }}</div>
              <div class="BlogContent-3">
                {{ item.releaseTime }}.
                <span>{{ item.viewNum }}阅读 .</span>
                <span>{{ item.likeNum }}点赞 .</span>
                <span>{{ item.commentNum }}评论 .</span>
                <span>{{ item.collectionNum }}收藏</span>
              </div>
            </div>
            <div class="BlogContent-b">
              <el-popover
                placement="top"
                width="160"
                v-model="visible2">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                </div>
                <el-button style="pointer-events: auto;" slot="reference">删除</el-button>
              </el-popover>
            </div>
          </div>
          <!--          infinite-loading这个组件要放在列表的底部，滚动的盒子里面-->
          <infinite-loading
            spinner="spiral"
            @infinite="infiniteHandler"
            :distance="200"
            class="infinite-loading-wrap"
          >
            <div slot="spinner">Loading...</div>
            <div slot="no-more">No more Data</div>
            <div slot="no-results">No results Data</div>
            <div slot="error" slot-scope="{ trigger }">
              Error Data, click <a href="javascript:;" @click="trigger">here</a> toretry
            </div>
          </infinite-loading>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'ContentManagement',
  components: {
    InfiniteLoading
  },
  methods: {
    TurnToShow (index) {
      var routeUrl = this.$router.resolve({name: 'BlogDetail', params: {blogId: index}})
      window.open(routeUrl.href, '_blank')
    },
    async infiniteHandler ($state) {
      await this.$axios
        .get('/blog-console/blog-list', this.config)
        .then((res) => {
          if (res.data.data.records.length > 0) {
            this.config.params.page += 1 // 下一页
            this.allList = this.allList.concat(res.data.data.records)
            this.List = this.allList
            $state.loaded()
          } else {
            $state.complete()
          }
        })
      if (this.List.length > 0) {
        this.$refs.writeBlog.style.display = 'none'
        this.$refs.noneSearch.style.display = 'none'
      }
      console.log('此时所有的博客列表是', this.List)
    }
  }
}
</script>

<style scoped>
.managecontent {
//width: calc(100% - 40px); //height: calc(100% - 40px); //margin: 20px;
}

/* 顶部筛选条件 */
.screening-conditions {
  width: 100%;
  height: 50px;
}

.screening-conditions ul {
  width: 100%;
  height: 100%;
  list-style: none;
}

.screening-conditions ul li {
  width: 13%;
  height: 100%;
  float: left;
  font-size: 16px;
  color: rgb(136, 137, 138);
}

.time-chose {
  width: 100%;
  height: 60px;
  border-bottom: 2px solid rgb(217, 217, 217);
}

.time-chose .chosemonth {
  width: 30%;
  height: 100%;
  float: left;
}

.time-chose .search {
  width: 40%;
  height: 100%;
  float: right;

}

.screening-conditionsB {
  width: 100%;
  /* height: 500px; */

}

.screening-conditionsB .writeBlog {
  width: 100%;
  height: 500px;
  text-align: center;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}

.screening-conditionsB .nonesearch {
  width: 100%;
  height: 500px;
  font-size: 20px;
  font-weight: 800;
  color: red;
  text-align: center;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}

.screening-conditionsB .writeBlog div {
  width: 100%;
  height: 20%;
  font-size: 20px;
  font-weight: 800;
  position: relative;
  top: 30%;
  transform: translateY(-50%);
}

.screening-conditionsB .writeBlog button {
  width: 150px;
  height: 50px;
  border: none;
  background: rgb(242, 88, 28);
  color: white;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 600;
  position: relative;
  top: 20%;
  transform: translateY(-50%);
}

.screening-conditionsB .show-content {
  width: 100%;
  height: 100%;
}

.screening-conditionsB .show-content .F-1 {
  width: 100%;
  height: 30%;
}

.BlogContent-a {
  width: 80%;
  height: 100%;
  display: inline-block;
  padding: 10px 0;
  border-bottom: 1px solid #b7b8bb;
}

.BlogContent-b {
  width: 20%;
  height: 100%;
  display: inline-block;
  /* border-bottom: 1px solid #b7b8bb; */
}

.BlogContent-1 {
  width: 100%;
  height: 30%;
  font-size: 22px;
  font-weight: 600;
  color: black;
}

.BlogContent-1:hover {
  color: rgb(252, 85, 49);
}

.BlogContent-2 {
  width: 100%;
  height: 20%;
  margin: 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #555666;
}

.BlogContent-3 {
  width: 100%;
  height: 20%;
  font-size: 16px;
  font-weight: 600;
  color: #555666;
}

.BlogContent-3 span {
  margin: 0 5px;
}
</style>
