<template>
  <div class="Goods-list">
    <goods-list-item v-for="(item, index) in goodslist" :key="index" :goods="item.list">
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from '../goods/goodsListItem.vue'
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goodslist: {
        type: Object,
        default: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Goods-list{
    display: flex;
    flex-direction: column;
    // width: 50%;
  }
</style>
