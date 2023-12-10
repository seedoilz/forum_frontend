<template>
  <el-card class="content">
    <div slot="header" class="clearfix">
      <span style="font-size:1.5rem">我的点赞</span>
    </div>
    <div v-if="noneLike" class="noneLike">
      你都舍不得点赞吗？
    </div>
    <div v-else class="myLikeA" v-for="(item,index) in likeList" :key="item.id">
      <div class="myLikeTitle">
        <div class="title" @click="TurnToDetail(item.id)">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
      </div>
      <div class="myLikeStar">
        <svg
          :class="{active:item.thumbs}"
          @click="Like(item.id,item.authorId,index)"
          aria-hidden="true">
          <use xlink:href="#icon-dianzan_kuai"></use>
          <!-- use是复制一个图标的意思 -->
        </svg>
        {{ item.thumbs }}{{ likeList[index].thumbs }}
      </div>
    </div>

  </el-card>
</template>

<script>
export default {
  name: 'MyThumbs_up',
  data () {
    return {
      likeList: [],
      config: {
        headers: {
          'token': localStorage.getItem('token')
        }
      },
      // 后端没有数据返回时显示此部分
      noneLike: true,
      start: true
    }
  }
}
</script>

<style>
.content {
  width: 100%;
//background: linear-gradient(to top, rgb(230, 113, 186), #FF834FFF); //border-radius: 5px; //padding: 10px 20px;
}

.myLike {

}

.myLike .myLikeB {
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 1.5rem;
  font-weight: 800;
//color: #fff7ec;
}

.myLikeA {
  width: 100%;
  min-height: 100px;
  border: 1px solid rgb(213, 211, 211);
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s ease-in;
}

.myLikeA:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.myLikeA .myLikeTitle {
  flex: 8;
  font-size: 1rem;
  margin-left: 2rem;
  font-weight: 600;
  color: rgb(56, 52, 52);
  display: inline-block;
  cursor: pointer;

  .title {
    margin-bottom: 10px;
    font-size: 1.3rem;
  }
}

.myLikeA .myLikeStar {
  flex: 2;
  width: 10%;
  height: 100%;
  margin-left: 40px;
  text-align: center;
}

.myLikeA .myLikeStar svg {
  width: 30px;
  height: 30px;
  fill: #ffffff;

  &.active {
    fill: #ff1e1e;
  }
}
</style>
