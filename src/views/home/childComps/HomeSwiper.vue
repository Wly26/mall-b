<template>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
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
      isLoad:false
    }
  },
  created(){
  },
  methods: {
    imageLoad(){
      if(this.isLoad == false){
        // console.log('-----')
        this.$emit('swiperimageload')
        this.isLoad = true
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .slide img {
    width: 100%;
    height: 200px;
  }
</style>
