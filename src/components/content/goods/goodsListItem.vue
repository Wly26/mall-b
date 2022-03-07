<template>
  <div class="goods" v-for="(item,index) in goods" :key="index">
    <!-- 这里用嵌套，是可以的 -->
    <img :src="item.show.img"/>
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">{{item.orgPrice}}</span>
      <span class="collect">{{item.popularStar}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
		  goods: {
		    type: Object,
        default: {}
      }
    },
    mounted: function () {
      console.log(this.goods);
    },
    data() {
      return {
      }
    },
    computed:{
      imgurl(){
        const a = this.goods.show.img
        return console.log(a)
      }
    },
    methods: {
      // goToDetail(){
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    img {
      width: 100%;
    }
    .goods-info {
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
          top: 0;
          width: 14px;
          height: 14px;
          background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
        }
      }
    }
  }
</style>
