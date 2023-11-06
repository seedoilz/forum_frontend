<template>
  <div></div>
</template>

<script>
import {PATH} from '@/commons/const'

export default {
  beforeMount () {
  // 获取权限，设置访问主页等
    this.$router.push(PATH.SIGN_IN_VIEW)
  }
}
</script>

<style scoped>

</style>
