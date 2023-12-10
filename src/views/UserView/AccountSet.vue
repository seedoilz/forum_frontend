<template>
  <el-card style="border: 0">
    <div slot="header" class="clearfix">
      <span style="font-size:1.5rem">账户设置</span>
    </div>
    <div class="accountSet">
      <div style="height:50px; display: flex; justify-content: space-between; align-items: center;">
        <span style="display: flex; width:70px; justify-content: space-between;padding-left: 16px">
          <span>密</span>
          <span>码</span>
        </span>
        <span style="padding-right: 16px">修改密码</span>
      </div>
      <el-divider></el-divider>
      <div style="height:50px; display: flex; justify-content: space-between; align-items: center;">
        <span style="display: flex; width:70px; justify-content: space-between;padding-left: 16px">
          <span>手</span>
          <span>机</span>
        </span>
        <span style="padding-right: 16px">修改手机</span>
      </div>
      <el-divider></el-divider>
      <div style="height:50px; display: flex; justify-content: space-between; align-items: center;">
        <span style="display: flex; width:70px; justify-content: space-between;padding-left: 16px">
          <span>邮</span>
          <span>箱</span>
        </span>
        <span style="padding-right: 16px">修改邮箱</span>
      </div>
      <el-divider></el-divider>
      <div style="height:50px; display: flex; justify-content: space-between; align-items: center;">
        <span style="display: flex; width:70px; justify-content: space-between;padding-left: 16px">
          <span>账</span>
          <span>号</span>
          <span>注</span>
          <span>销</span>
        </span>
        <span style="padding-right: 16px">立即注销</span>
      </div>
      <el-divider></el-divider>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'AccountSet'
}
</script>
<style>

</style>
