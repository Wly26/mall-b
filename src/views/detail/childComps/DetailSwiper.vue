<template>
    <swiper>
      <swiper-item  class="swiper-item" v-for="(item,index) in images" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import { swiper, swiperItem } from 'common/swiper'

export default {
  name: 'DetailSwiper',
  components: { swiper, swiperItem},
  props:{
    images: {
        type:Array,
        default:[]
    }
  },
  data(){ 
    return{
    }
  },
  created(){
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .swiper-item img{
    height: 300px;
    width: 100%;
  }
</style>
