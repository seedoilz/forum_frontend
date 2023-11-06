<template>
  <el-card class="post-card">
<!--    header-start-->
    <template #header>
      <div class="post-card-header">
        <span>Header</span>
        <el-button plain>edit</el-button>
      </div>
    </template>
<!--    header-end-->
    <div class="post-card-body">
      <div class="content">
        This is the content here;<br/>
        This is the content here;<br/>
        This is the content here;<br/>
        This is the content here;<br/>
        This is the content here;<br/>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PostCard'
}
</script>

<style scoped>
.el-card{
  background-color: rgba(32,32,32,0.7);
  backdrop-filter: blur(7px);
}

.post-card{
  width: 100%;
  height: 500px;
  border: 0;
}

.post-card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-card-body{
  display: flex;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
}

.post-card .post-card-body .content{
  width: 120%;
  z-index: 1;
  position: relative;
  left: 0;
  color: #FFF;
  padding: 10px 40px;
  /*background-color: rgba(255,255,255,0.1);*/
  /*backdrop-filter: blur(10px);*/
  transition: 0.5s;
}

.post-card .post-card-body:hover .content{
  padding: 30px 40px;
}
</style>
