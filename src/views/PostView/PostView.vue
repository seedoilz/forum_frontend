<template>
  <el-container class="container-main" >
<!--    <el-header-->
<!--      height="60"-->
<!--      class="title">-->
<!--      <h1 style="font-size: 3rem;margin-top: 10px;margin-bottom: 10px;color: #DDFF03">☣TITLE</h1>-->
<!--    </el-header>-->

    <el-container>
    <el-container direction="vertical" class="container-left">

      <el-input
        ref="title"
        placeholder="请输入标题"
        v-model="postMessage.title"
        clearable
        class="content-title">
      </el-input>

      <el-form :inline="true" class="middle" @submit.native.prevent>

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
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加标签</el-button>
      </el-form>

      <el-container class="container-tags">
        <el-tag
          :key="tag"
          v-for="tag in postMessage.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
      </el-container>

      <quill-editor
        v-model="postMessage.content"
        class="quill-editor1"
        ref="myQuillEditor"
        :options="editorOption2"
        style="color: #b4bccc"
        >
        style="height: 100%;"
      </quill-editor>
    </el-container>

    <el-aside class="aside">
      <el-container direction="vertical" class="aside-container" >
      <el-input class="aside-input"
        type="textarea"
        :rows=1
        placeholder="添加图片"
        >
      </el-input>

      <el-upload
        class="upload"
        action=""
        :http-request="uploadImg"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        ref="upload"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary" icon="">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-upload>
    </el-container  >
      <el-footer class="footer">
        <el-row style="align-items: end;justify-content: end;display: flex;">
          <el-button type="danger" icon="el-icon-delete-solid" class="button-clearAll" @click="cleanAll">清空</el-button>
          <el-button type="primary" icon="el-icon-upload2" class="button-sendArticle" @click="submitPost">发帖</el-button>
        </el-row>
      </el-footer>
<!--      <el-button style="position: relative;bottom: 0;" type="primary" icon="el-icon-upload2" class="button-sendArticle" @click="submitPost">发帖</el-button>-->
    </el-aside>
    </el-container>
  </el-container>
</template>

<script>

import { addImage, messagePost } from '@/network/any'

import { PATH } from '@/commons/const'
import '@/assets/css/quill.bubble.css'
import '@/assets/css/quill.core.css'
import '@/assets/css/quill.snow.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  name: 'PostView',
  data () {
    return {
      fileUrls: {},
      fileList: [],
      inputVisible: false,
      inputValue: '',

      textarea: '',

      postMessage: {
        userId: this.$getCookie('id'),
        title: '',
        content: '',
        imageUrls: [],
        anony: false,
        createdAt: new Date(),
        tags: ['默认标签']
      },
      editorOption2: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
            ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
            [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
            [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
            [{ direction: 'rtl' }], // 文本方向-----[{'direction': 'rtl'}]
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
            [{ font: [] }], // 字体种类-----[{ font: [] }]
            [{ align: [] }], // 对齐方式-----[{ align: [] }]
            ['clean'] // 清除文本格式-----['clean']
          ]
        }
      }// 编辑器配置项
    }
  },
  mounted () {
  },
  methods: {
    async cleanAll () {
      if (confirm('确定要清空页面吗？')) {
        this.postMessage.title = ''
        this.postMessage.content = ''
        this.postMessage.tags = ['默认标签']
        this.$refs.upload.uploadFiles = []
        // console.log(this.$refs.upload)
        this.fileUrls = []
        this.postMessage.imageUrls = []
        this.$notify({
          title: '成功',
          message: '清空完成~~'
        })
      } else {
        this.$notify({
          title: '取消',
          message: '清空取消~~'
        })
      }
    },
    handleRemove (file, fileList) {
      console.log('remove', file, fileList)
      this.postMessage.imageUrls = this.postMessage.imageUrls.filter(x => x !== this.fileUrls[file.uid])
      // this.fileUrls = this.fileUrls.filter(x => x.key !== file.url)
      console.log(this.fileUrls, this.postMessage.imageUrls)
    },
    handlePreview (file) {
      window.open(this.fileUrls[file.uid])
      console.log(file)
    },
    uploadImg (file) {
      let formData = new FormData()
      formData.append('file', file.file)
      // let newUrl = addImage(formData)
      addImage(formData).then(res => {
        this.postMessage.imageUrls.push(res.message)
        console.log(file.file)
        this.fileUrls[file.file.uid] = res.message
      })
    },
    handleClose (tag) {
      this.postMessage.tags.splice(this.postMessage.tags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      // 判断是否有重复tag
      let tagLength = this.postMessage.tags.length
      let dup = false
      for (let i = 0; i < tagLength; i++) {
        if (inputValue === this.postMessage.tags[i]) {
          dup = true
        }
      }
      if (dup) {
        this.$notify({
          title: '警告',
          message: '标签重复~~',
          type: 'warning'
        })
      } else if (inputValue) {
        this.postMessage.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitPost () {
      console.log(this.postMessage.title)
      console.log(this.postMessage)
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
.footer{
  bottom: 0;
  position: absolute;
}

.title{
  //border: 1px solid ;
  border-radius: 4px;
  border: 0 solid #ebeef5;
  background-color: #202020;
  overflow: hidden;
  color: #eeeef1;
  margin: 10px;
}

.content-title{
  border-radius: 4px;
  border: 0 solid #ebeef5;
  background-color: #202020;
  overflow: hidden;
  color: #eeeef1;
  width: 95%;
  margin: 10px;
}
.content{
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
  margin: 5% auto;

}

.container-left{
  width: 60%;
  border-radius: 4px;
  border: 0 solid #ebeef5;
  margin: 10px;
}
.middle{
  margin: 10px;
  display: flex;
}

.container-tags{
  box-sizing: border-box;
  overflow: auto;
  margin: 10px;
  min-height: 40px;
  max-height: 40px;
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
  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  height: 40px;
  width: 90px;
  vertical-align: center;
}

.el-textarea__inner{
  border: 0;
  resize: none;
}

.aside{
  border-radius: 4px;
  background-color: #202020;
  color: #eeeef1;
  max-height: 78vh;
  //border: 1px solid;
  margin: 10px;
  overflow-y: auto;
}

.quill-editor1{
  line-height: normal !important;
  min-height: 50%;
  max-height: 100%;
  margin: 10px;
  border-radius: 4px;
  border: 0 solid #ebeef5;
  background-color: #202020;
  color: #eeeef1;
}
.aside-container{
  margin: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
.upload{
  margin: 10px;
}
.aside-input{
  border: 0 solid #ebeef5;
}
</style>
