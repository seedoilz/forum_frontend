<template>
  <el-card class="comment">
    <el-row type="flex" align="middle" class="comment-row">
      <el-col :span="2">
        <el-avatar src="path/to/avatar.jpg"></el-avatar>
      </el-col>
      <el-col :span="18" class="comment-content">
        <div>
          <span class="username">{{ review.userName }}</span>
          <span class="comment-text">{{ review.content }}</span>
        </div>
        <div class="comment-time">{{ review.time }}</div>
      </el-col>
      <el-col :span="3" class="comment-actions">
        <el-button type="text" icon="el-icon-chat-dot-square"></el-button>
        <el-button type="text" icon="el-icon-thumb">
          <span>{{ review.thumbs }}</span>
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
  methods: {},
  props: {
    review: Object
  }
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
  color: #c9c9c9;
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
