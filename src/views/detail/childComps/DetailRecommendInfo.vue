<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <div class="Goods-list">
      <div class="goods-item" v-for="(item, index) in recommendList" :key="index">
        <img :src="item.image" @load="imgload"/>
        <div class="goods-info">
          <p>{{item.title}}</p>
          <span class="price">{{item.price}}</span>
          <span class="collect">{{item.itemSale}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

	export default {
		name: "DetailRecommendInfo",
    props: {
		  recommendList: {
		    type: Array
      }
    },
    methods: {
      imgload(){
        // mybus.emit('imgloadbus',"imgloadbus调用成功");
        // bus.emit("imgloadbus")
      }
    }
	}
</script>

<style lang="scss" scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }

  .Goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
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
  }
</style>
