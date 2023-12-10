<template>
  <el-container class="container-main" >
    <el-header
      height="60"
      class="title">
      <h1 style="font-size: 3rem;margin-top: 10px;margin-bottom: 10px;color: #DDFF03">☣TITLE</h1>
    </el-header>

    <el-container>
    <el-container direction="vertical" class="container-left">
      <el-header style="text-align: right; font-size: 12px">

      </el-header>

      <el-input
        placeholder="请输入标题"
        v-model="input"
        clearable
        class="content-title">
      </el-input>

      <el-form :inline="true" class="middle">
        <el-form-item class="region">
          <el-select v-model="region" placeholder="选择板块" class="region-inner" >
            <el-option label="板块一" value="1"></el-option>
            <el-option label="板块二" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>

        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form>

      <el-input
        type="textarea"
        :autosize="{ minRows: 18, maxRows: 22}"
        placeholder="请输入内容"
        v-model="textarea"
        class="content">
      </el-input>
    </el-container>

    <el-aside class="aside">
      <el-input
        type="textarea"
        :rows=10
        placeholder="此处为工具栏等，暂时留空"
        >
      </el-input>
    </el-aside>
    </el-container>

  </el-container>
</template>

<script>
import { messagePost } from '@/network/sign'
import { PATH } from '@/commons/const'

export default {
  name: 'PostView',
  data () {
    return {
      input: '',
      region: '',

      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',

      textarea: '',

      postMessage: {
        title: '',
        content: '',
        tags: ''
      }
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitPost () {
      console.log(this.postMessage.title)
      if (this.postMessage.title === '') {
        this.$notify({
          title: '警告',
          message: '缺少标题~~',
          type: 'warning'
        })
      } else if (this.postMessage.content === '') {
        this.$notify({
          title: '警告',
          message: '缺少正文~~',
          type: 'warning'
        })
      } else if (this.postMessage.tags === '') {
        this.$notify({
          title: '警告',
          message: '缺少标签~~',
          type: 'warning'
        })
      } else {
        messagePost(this.postMessage).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.$notify({
              title: '成功',
              message: '发布成功~~',
              type: 'success'
            })
            this.$router.push(PATH.MAIN_VIEW)
          } else {
            this.$notify.error({
              title: '错误',
              message: '发布失败！'
            })
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      }
    }
  }
}
</script>

<style>
.title{
  border: 1px solid yellow;
  margin: 10px;
}

.content-title{
  border: 1px solid yellow;
  width: 95%;
  margin: 10px;
}
.content{
  border: 1px solid yellow;
  width: 95%;
  margin: 10px;
}

.container-main{
  width: 75%;
  height: 90vh;
  display: flex;
  align-content: center;
  justify-content: center;
  margin: auto;

}

.container-left{
  width: 60%;
  border: 1px solid yellow;
  margin: 10px;
}
.middle{
  margin: 10px;
  display: flex;
}

.region{
  height: 32px;
  margin: 10px;
}

.el-tag{
  margin: 10px;
  height: 40px;
  //text-align: center;
  //vertical-align: center;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin: 10px;

  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  margin: 10px;
  width: 90px;
  vertical-align: center;
}

.el-textarea__inner{
  resize: none;
}

.aside{
  border: 1px solid yellow;
  margin: 10px;
}

</style>
