<template>
  <div style="width:100%; height:100vh;display: flex;align-items: center;justify-content: center;overflow: clip;">
    <div class="basic-container"
       style="display: flex;
       align-content: center;
       justify-content: center;
       width: 500px;
       padding: 100px 10px 100px 10px;
       margin: auto auto;
       "
  >
<!--    el-form-start-->
    <el-form
    label-position="left"
    label-width="100px"
    style="max-width: 400px;"
    :model="userForm"
    ref="userFormRef"
    >
      <el-form-item
        label="Username"
        prop="name"
        :rules="[
          {
            required: true,
            message: 'Username cannot be empty',
            trigger: ['blur','change']
          }
        ]"
      >
        <el-input
          v-model="userForm.name"
          placeholder="Username"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
        :rules="[
          {
            required: true,
            message: 'Password cannot be empty',
            trigger: ['blur','change']
          }
        ]"
        >
        <el-input type="password"
          v-model="userForm.password"
          placeholder="Password">
        </el-input>
      </el-form-item>
        <div style="width: 200px;margin: auto;text-align: center;">
          <el-button type="primary" color="#626aef" @click="submit('userFormRef')">
            登录
          </el-button>
          <el-button type="primary" color="#626aef" @click="register()">
            注册
          </el-button>
        </div>
      </el-form>
<!--    el-form-end-->
  </div>
  </div>
</template>

<script>

import {signIn} from '@/network/any'
import {PATH} from '@/commons/const'

export default {
  name: 'LoginView',
  data () {
    return {
      userForm: {}
    }
  },
  methods: {
    submit (form) {
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.$message({
            type: 'warning',
            message: '不符合规范'
          })
        } else {
          if (this.$checkCookie('token')) {
            this.$clearCookie('token')
          }
          signIn(this.userForm).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.$setCookie('token', res.data.token)
              this.$setCookie('id', res.data.id)
              this.$router.push(PATH.MAIN_VIEW)
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          })
        }
      })
    },
    register () {
      this.$router.push(PATH.REGISTER_VIEW)
    }
  }
}
</script>
<style scoped>
</style>
