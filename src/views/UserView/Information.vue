<template>
  <el-container class="user-profile-container" style="">
    <el-header class="el-header" style="height:150px">
      <!-- Avatar section -->
      <el-upload
        class="avatar-uploader"
        action="/api/image/upload_avatar"
        :headers="headers"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <img v-if="this.personalInfo.avatar_url" :src="this.personalInfo.avatar_url" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-header>
    <div style="display: flex;justify-content: flex-end">
      <el-button v-if="!isEditing" style="margin-right: 30px" @click="toggleEditMode">编辑</el-button>
    </div>
    <el-main>
      <el-card class="info-card">
        <el-row :gutter="20">
          <el-col v-if="isEditing" :span="24">
            <el-form v-if="isEditing">
              <!-- Name field -->
              <el-form-item label="昵称">
                <el-input v-model="editForm.name"></el-input>
              </el-form-item>

              <!-- ID field -->
              <el-form-item label="邮箱">
                <el-input v-model="editForm.email"></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <br>
                <el-radio-group v-model="editForm.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="-1">女</el-radio>
                  <el-radio :label="0">保密</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- Buttons for saving and cancelling -->
              <el-form-item>
                <el-button type="primary" @click="saveForm">保存</el-button>
                <el-button @click="cancelEdit">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col v-else :span="24">
            <div class="info-item">
              <label>ID:</label>
              <span>{{ personalInfo.id }}</span>
            </div>
            <div class="info-item">
              <label>昵称:</label>
              <span>{{ personalInfo.name }}</span>
            </div>
            <div class="info-item">
              <label>邮箱:</label>
              <span>{{ personalInfo.email }}</span>
            </div>
            <div class="info-item">
              <label>性别:</label>
              <span>{{ genderLabel }}</span>
            </div>
            <div class="info-item">
              <label>创建时间:</label>
              <span>{{ personalInfo.createdAt }}</span>
            </div>
            <!-- Add more display fields as needed -->
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import {getCurrentUser} from '@/network/any'
import {updateUser} from '../../network/any'

export default {
  name: 'Information',
  data () {
    return {
      headers: {},
      isEditing: false,
      personalInfo: {
        name: '',
        id: '',
        email: '',
        createdAt: '',
        avatar_url: '',
        gender: 10
        // other fields...
      },
      editForm: {}
    }
  },
  mounted () {
    getCurrentUser().then((res) => {
      if (res.code === 200) {
        this.personalInfo = res.data
        this.editForm = {...res.data}
      } else {
        this.$message({
          message: '系统错误',
          type: 'error'
        })
      }
    })
    this.headers = {'Authorization': 'bear ' + this.$getCookie('token')}
  },
  computed: {
    genderLabel () {
      switch (this.personalInfo.gender) {
        case 1:
          return '男'
        case -1:
          return '女'
        // 更多情况
        case 0:
          return '未知'
      }
    }
  },
  methods: {
    toggleEditMode () {
      this.isEditing = true
    },
    cancelEdit () {
      this.isEditing = false
    },
    saveForm () {
      let userForm = {
        id: this.$getCookie('id'),
        name: this.editForm.name,
        email: this.editForm.email,
        gender: this.editForm.gender
      }
      updateUser(userForm).then((res) => {
        if (res.code === 200) {
          this.personalInfo = {...this.editForm}
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.isEditing = false
        } else {
          this.$message({
            message: '更新失败',
            type: 'error'
          })
        }
      })
    },
    handleAvatarSuccess (res) {
      this.personalInfo.avatar_url = res.message
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.user-profile-container {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; /* Spacing between avatar and info */
}

.info-card {
  border: none;
  box-shadow: none;
}

.info-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px; /* Spacing between info items */
  font-size: 16px;
}

.info-item label {
  font-weight: bold;
  margin-right: 12px;
  min-width: 80px;
  //color: #606266;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .user-profile-container {
    margin: 20px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
