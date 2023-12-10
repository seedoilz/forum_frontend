<template>
  <el-container class="user-profile-container" style="">
    <el-header style="height:150px">
      <!-- Avatar section -->
      <div class="avatar-container" style="margin-top: 2%">
        <el-avatar size="300" src="path_to_avatar_image.jpg" style="width: 100px;height: 100px"></el-avatar>
      </div>
    </el-header>

    <el-main>
      <el-card class="info-card">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="info-item">
              <label>Name:</label>
              <span>{{ personalInfo.name }}</span>
            </div>
            <div class="info-item">
              <label>ID:</label>
              <span>{{ personalInfo.id }}</span>
            </div>
            <!-- Add more display fields as needed -->
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import UserView from './UserView.vue'

export default {
  name: 'Information',
  components: {UserView},
  data () {
    return {
      personalInfo: {
        name: 'John Doe', // Replace with actual data
        id: '123456' // Replace with actual data
        // other fields...
      }
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
  margin-bottom: 10px; /* Spacing between info items */
  font-size: 16px;
}

.info-item label {
  font-weight: bold;
  margin-right: 12px;
  min-width: 80px;
  color: #606266;
}

.info-item span {
  color: #303133;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .user-profile-container {
    margin: 20px;
  }
}
</style>
