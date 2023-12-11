<template>
  <el-container class="user-profile-container" style="">
    <el-header style="height:150px">
      <!-- Avatar section -->
      <div class="avatar-container" style="margin-top: 2%">
        <el-avatar size="300" src="path_to_avatar_image.jpg" style="width: 100px;height: 100px"></el-avatar>
      </div>
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
                <el-input v-model="personalInfo.name"></el-input>
              </el-form-item>

              <!-- ID field -->
              <el-form-item label="邮箱">
                <el-input v-model="personalInfo.email"></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <br>
                <el-radio-group v-model="personalInfo.gender">
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
              <span>{{ personalInfo.created_time }}</span>
            </div>
            <!-- Add more display fields as needed -->
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Information',
  data () {
    return {
      isEditing: false,
      personalInfo: {
        name: 'John Doe', // Replace with actual data
        id: '123456', // Replace with actual data
        email: '123456789@outlook.com',
        created_time: 'xxxx年x月x日',
        gender: 1
        // other fields...
      }
    }
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
      // TODO
      this.isEditing = false
    },
    saveForm () {
      // TODO
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

.avatar-container {
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
</style>
