<template>
  <el-card class="comment">
    <el-row type="flex" align="middle" class="comment-row">
      <el-col :span="3">
        <el-avatar src="path/to/avatar.jpg"></el-avatar>
      </el-col>
      <el-col :span="18" class="comment-content">
        <div>
          <span class="username">用户名</span>
          <span class="comment-text">这是评论内容。这是评论内容。这是评论内容。这是评论内容。这是评论内容。这是评论内容。这是评论内容。这是评论内容。这是评论内容。</span>
        </div>
        <div class="comment-time">23-12-4 20:03</div>
      </el-col>
      <el-col :span="3" class="comment-actions">
        <el-button type="text" icon="el-icon-chat-dot-square"></el-button>
        <el-button type="text" icon="el-icon-thumb">
          <span>43</span>
        </el-button>
<!--        <el-button type="text" icon="el-icon-thumb-down"></el-button>-->
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'Review',
  data () {
  },
  methods: {}
}
</script>

<style scoped>
.comment {
  width: 50%;
  border-radius: 4px;
  margin-bottom: 10px;
}

.comment-row {
  align-items: flex-start;
}

.username {
  font-weight: bold;
  margin-right: 5px;
}

.comment-text {
  color: #333;
}

.comment-time {
  font-size: 0.8em;
  color: #999;
}

.comment-actions {
  text-align: right;
}

.comment-actions .el-button span {
  color: #333;
}

/* 在此处添加更多样式来满足你的设计需求 */
</style>
