<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="20%"  style="height:100%;background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-menu-item v-for="item in leftNavigation" :key="item.id" :index="item.id" @click="ChoseModel(item.id)">{{ item.name }}</el-menu-item>
      </el-menu>
    </el-aside>

    <div class="contentright" style="width: 80%">
      <div v-if="leftNavigation[0].chose">
        <Information></Information>
      </div>
      <div v-if="leftNavigation[1].chose">
        <AccountSet></AccountSet>
      </div>
      <div v-if="leftNavigation[2].chose">
        <MyCollect></MyCollect>
      </div>
      <div v-if="leftNavigation[4].chose">
        <MyThumbs></MyThumbs>
      </div>
    </div>
  </el-container>
</template>

<style>

</style>

<script>
import Information from '@/components/RightContents/Information.vue'
import AccountSet from '@/components/RightContents/AccountSet.vue'
import MyCollect from '@/components/RightContents/MyCollect.vue'
import MyThumbs from '@/components/RightContents/MyThumbs_up.vue'
export default {
  name: 'UserView',
  components: {
    Information,
    AccountSet,
    MyCollect,
    MyThumbs
  },
  data () {
    return {
      leftNavigation: [{name: '个人资料', chose: true, id: 0}, {name: '账号设置', chose: false, id: 1},
        {name: '我的收藏', chose: false, id: 2},
        {name: '内容管理', chose: false, id: 3}, {name: '我的点赞', chose: false, id: 4}]
    }
  },
  methods: {
    ChoseModel (index) {
      // 选择模块
      for (let i = 0; i < this.leftNavigation.length; i++) {
        this.leftNavigation[i].chose = false
      }
      this.leftNavigation[index].chose = true

      // if (index === 4) {
      //   this.$router.push('/ContentManagement')
      // }
    }
  }
}
</script>
