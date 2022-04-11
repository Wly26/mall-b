<template>
  <scroll :data="[cartList]" class="cart-list" ref="scroll">
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/scroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
    activated(){
      // 让scroll刷新一下，可重新获得高度
      this.$refs.scroll.refresh()
    }
	}
</script>

<style scoped>
  .cart-list {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
    /* background-color: aquamarine; */
    overflow: hidden;
  }
</style>
