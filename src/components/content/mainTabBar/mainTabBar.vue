<template>
    <tabbar>
      <tab-bar-item link="/Home">
        <template #icon>
          <img src="~assets/img/tabbar/home.svg">
        </template>
        <template #active-icon>
          <img src="~assets/img/tabbar/home_active.svg">
        </template>
        <template #item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>

      <tab-bar-item link="/category">
        <template #icon>
          <img src="~assets/img/tabbar/category.svg">
        </template>
        <template #active-icon>
          <img src="~assets/img/tabbar/category_active.svg">
        </template>
        <template #item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>
      
      <tab-bar-item link="/cart">
        <template #icon>
          <img src="~assets/img/tabbar/cart.svg">
        </template>
        <template #active-icon>
          <img src="~assets/img/tabbar/cart_active.svg">
        </template>
        <template #item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>
      
      <tab-bar-item link="/profile">
        <template #icon>
          <img src="~assets/img/tabbar/profile.svg">
        </template>
        <template #active-icon>
          <img src="~assets/img/tabbar/profile_active.svg">
        </template>
        <template #item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>
    </tabbar>
</template>

<script>
import Tabbar from 'common/tabbar/tabbar.vue'
import TabBarItem from 'common/tabbar/TabBarItem.vue'
export default {
  components: { TabBarItem, Tabbar },
  name: 'maintabbar',
  data() {
    return{
    }
  }
}
</script>

<style lang="scss" scoped>
  img{
    flex: 1;
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }
</style>
