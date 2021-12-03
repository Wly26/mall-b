<template>
  <div id="home">
    <navbar class="nav-bar"><template #center>购物街</template></navbar>
    <home-swiper :banners="banners" class="fixed"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view :features="recommends"></feature-view>
    <br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>
 
<script>
// 组件直接写名字
import navbar from 'common/navbar/navbar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue';
import HomeRecommend from './childComps/HomeRecommend.vue';
import FeatureView from './childComps/FeatureView.vue';

// 没有default导出的，要有{}
import { getHomeMultidata } from 'network/home.js';

export default {
  name: 'Home',
  components: { navbar, HomeSwiper, HomeRecommend, FeatureView},
  data(){
    return{
      banners: [],
      recommends: []
    }
  },
  created(){
    getHomeMultidata().then(res => {
      this.banners =res.data.data.banner.list;
      this.recommends =res.data.data.recommend.list;
      // console.log(res.data.data)
    })
  }
}
</script>

<style lang="scss" scoped>
  // .fixed {
  //   position: fixed;
  //   top: 44px;
  //   left: 0;
  //   right: 0;
  // }
  #home {
    height: 100vh;
    padding-top: 44px;
    .nav-bar {
      background-color: var(--color-tint);
      font-weight: 700;
      color: #fff;
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
    }
  }
</style>
