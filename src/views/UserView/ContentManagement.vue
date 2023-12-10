<template>
  <div class="managecontent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="文章" name="first">
            <!-- <div class="searchResult">
            </div> -->
            <div class="firstmodel">
                <div class="screening-conditions">
                    <ul>
                        <li v-for="(item,index) in ScreenList" :key="index" @click="ChoseScreen(index)"
                        :style="{'color':item.chose?'black':''}">{{item.title}}</li>
                    </ul>
                </div>
                <div class="screening-conditionsB">
                    <div class="time-chose">
                        <!-- 月份选择 -->
                        <div class="chosemonth">
                            <el-date-picker
                            v-model="timechose"
                            type="month"
                            placeholder="选择月">
                            </el-date-picker>
                        </div>
                        <!-- 对博客列表进行搜索 -->
                        <div class="search">
                            <el-input placeholder="请输入内容" v-model="searchblog" class="input-with-select">
                                <el-button @click="SearchBlog" slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <div ref="writeBlog" class="writeBlog">
                        <div>这里啥也没有啊</div>
                        <button @click="TurnToWriteBlog">写博客</button>
                    </div>
                    <div ref="noneSearch" class="nonesearch">
                        啥也没搜到！
                    </div>
                    <div ref="firstContent" class="show-content">
                        <div class="F-1" v-for="(item,index) in List"  :key="index" >
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
                        <!--infinite-loading这个组件要放在列表的底部，滚动的盒子里面-->
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
        </el-tab-pane>
        <el-tab-pane label="下载" name="second">

        </el-tab-pane>
        <el-tab-pane label="问答" name="third">

        </el-tab-pane>
        <el-tab-pane label="视频" name="fourth">

        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<style scoped>

</style>
<script setup>
</script>
