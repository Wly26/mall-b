<template>
  <div class="cart">
    <navbar class="nav-bar"><template #center>购物车({{$store.state.cartList.length}})</template></navbar>
    <cart-list :cart-list="cartList"/> 
    <cart-bottom-bar/>
  </div>
</template>

<script>
import navbar from 'common/navbar/navbar.vue';
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

export default {
  name: 'Cart',
  components: {
    navbar,
    CartList,
    CartBottomBar
  },
  computed:{
    cartList(){
      return this.$store.state.cartList
    }
  }
}
</script>

<style lang="scss" scoped>
.cart{
  position: relative;
  height: 100vh;
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
}

</style>
