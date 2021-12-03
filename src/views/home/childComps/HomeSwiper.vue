<template>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { swiper, swiperItem } from 'common/swiper'

export default {
  name: 'HomeSwiper',
  components: { swiper, swiperItem},
  props:{
    banners: {
        type:Array,
        default:[]
    }
  },
  data(){ 
    return{
    }
  },
  created(){
  }
}
</script>

<style lang="scss" scoped>
  .slide img {
    width: 100%;
    height: 200px;
  }
</style>
