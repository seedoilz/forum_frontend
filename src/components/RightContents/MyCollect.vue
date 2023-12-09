<template>
  <div class="content">
    <div class="myCollect">
      <div class="myCollectB">我的收藏</div>
      <div v-if="noneCollect" class="noneCollect">
        你还没有收藏哦,快去找些优质文章吧！
      </div>
      <div v-else class="myCollectA" v-for="(item,index) in collectList" :key="index">
        <div class="myCollectTitle" @click="TurnToDetail(item.id)">
          <div class="title">{{ item.title }}</div>
          <div class="description">{{ item.description }}</div>
          <div class="releaseTime">{{ item.releaseTime }}</div>
        </div>
        <div class="myCollectStar">
          <img ref="star" @click="ChangeStar(index)"
               :src="item.starStation? collectStar1:collectStar2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCollect'
}
</script>

<style>
.content{
    width: 100%;
    background: white;
    border-radius: 5px;
}
.myCollect{
    width: 100%;
    padding:20px;
}
.myCollect .noneCollect{
    width:100%;
    height: 500px;
    display: block;
    font-size: 2rem;
    font-weight: bold;
    line-height: 500px;
    text-align: center;
    color: #ffafaf;
}
.myCollectB{
    width: 100%;
    line-height: 50px;
    font-size: 1.5rem;
    font-weight: 800;
    color: black;
}
.myCollectA{
    width: 100%;
    min-height: 80px;
    background: white;
    border: 1px solid rgb(213, 211, 211);
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin:10px 0;
    transition: all 0.1s linear;
    &:hover{
        transform: scale(1.01);
    }
}
.myCollectA:hover{
    box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.myCollectA .myCollectTitle{
    font-size: 1rem;
    height: 100%;
    margin-left: 25px;
    font-weight: 600;
    color: rgb(56, 52, 52);
    flex: 9;
    .title{
        margin-bottom: 10px;
        font-size: 1.2rem;
    }
}
.myCollectA .myCollectStar{
    width: 10%;
    height: 100%;
    margin-left: 40px;
    text-align: center;
    flex: 1;
}
.myCollectA .myCollectStar img{
    width: 30px;
    display: block;
}
</style>
