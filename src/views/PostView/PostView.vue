<template>
  <el-container class="container-main" >
    <el-header
      height="60"
      class="title">
      <h1 style="font-size: 3rem;margin-top: 10px;margin-bottom: 10px;color: #DDFF03">☣TITLE</h1>
    </el-header>

    <el-container>
    <el-container direction="vertical" class="container-left">

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

<!--        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>-->

        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="large"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form>

      <el-container class="container-tags">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
      </el-container>

      <el-input
        type="textarea"
        :autosize="{ minRows: 20, maxRows: 22}"
        placeholder="请输入内容"
        v-model="textarea"
        class="content">
      </el-input>
    </el-container>

    <el-aside class="aside">
      <el-input
        type="textarea"
        :rows=2
        placeholder="添加附件"
        >
      </el-input>

      <quill-editor
        v-model="content"
        class="quill-editor2"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
        style="height: 100%;"
      </quill-editor>

    </el-aside>
    </el-container>

    <el-footer>
      <el-row>
        <el-button type="primary" class="button-save">保存</el-button>
        <el-button type="success" icon="el-icon-upload2" class="button-sendArticle">发帖</el-button>
      </el-row>
    </el-footer>

  </el-container>
</template>

<script>
import { messagePost } from '@/network/any'
import { PATH } from '@/commons/const'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
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
      },

      // content: `<p>这是 vue-quill-editor 的内容！</p>`, // 双向数据绑定数据
      editorOption: {
        modules: {
          toolbar: [
            ['image', 'video'] // 链接、图片、视频
          ]
        }
      }// 编辑器配置项
    }
  },
  methods: {
    onEditorBlur () {}, // 失去焦点触发事件
    onEditorFocus () {}, // 获得焦点触发事件
    onEditorChange () {}, // 内容改变触发事件
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
  //border: 1px solid ;
  border-radius: 4px;
  border: 0px solid #ebeef5;
  background-color: #202020;
  overflow: hidden;
  color: #eeeef1;
  margin: 10px;
}

.content-title{
  border-radius: 4px;
  border: 0px solid #ebeef5;
  background-color: #202020;
  overflow: hidden;
  color: #eeeef1;
  width: 95%;
  margin: 10px;
}
.content{
  //border: 1px solid ;
  width: 95%;
  margin: 10px;
}

.container-main{
  background-color: #202020;
  width: 75%;
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  margin: auto;

}

.container-left{
  width: 60%;
  border-radius: 4px;
  border: 0px solid #ebeef5;
  margin: 10px;
}
.middle{
  margin: 10px;
  display: flex;
}

.region{
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.container-tags{
  box-sizing: border-box;
  overflow: auto;
  margin: 10px;
  min-height: 50px;
  max-height: 80px;
}

.el-tag{
  //height: 32px;
  text-align: center;
  vertical-align: center;
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
  height: 40px;
  width: 90px;
  vertical-align: center;
}

.el-textarea__inner{
  resize: none;
}

.aside{
  border-radius: 4px;
  border: 0px solid #ebeef5;
  background-color: #202020;
  color: #eeeef1;
  max-height: 78vh;
  //border: 1px solid;
  margin: 10px;
  overflow-y: auto;
}

.quill-editor2{
  margin-top: 10px;
  border-radius: 4px;
  border: 0px solid #ebeef5;
  background-color: #202020;
  color: #eeeef1;
}
</style>
