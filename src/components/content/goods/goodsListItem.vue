<template>
  <div class="goods-item" @click="itemClick">
    <!-- 这里用嵌套，是可以的 -->
    <img :src="goods.show.img" @load="imgload"/>
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">{{goods.orgPrice}}</span>
      <span class="collect">{{goods.popularStar}}</span>
    </div>

  </div>
</template>

<script>
import mybus from "../../common/mitt/mitt";
  export default {
    name: "GoodsListItem",
    props: {
		  goods: {
		    type: Object,
        default: {}
      }
    },
    mounted: function () {
      // console.log(this.goods);
    },
    data() {
      return {
      }
    },
    methods: {
      imgload(){
        mybus.emit('imgloadbus',"imgloadbus调用成功");
        // bus.emit("imgloadbus")
      },
      itemClick(){
        console.log('11')
      }
    }
  }
</script>

<style lang="scss" scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .goods-info{
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      overflow: hidden;
      text-align: center;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
      }
      .price {
        color: var(--color-high-text);
        margin-right: 20px;
      }
      .collect {
        position: relative;
        &:before {
          content: '';
          position: absolute;
          left: -15px;
          top: -1px;
          width: 14px;
          height: 14px;
          background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
        }
      }
    }
  }
</style>
