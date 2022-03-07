<template>
  <div id="home">
    <navbar class="nav-bar"><template #center>购物街</template></navbar>
    <home-swiper :banners="banners" class="fixed"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="titles"></tab-control>    
  </div>
</template>

<script>
// 组件直接写名字
import navbar from 'common/navbar/navbar.vue';
import TabControl from 'content/tabcontrol/TabControl.vue';

import HomeSwiper from './childComps/HomeSwiper.vue';
import HomeRecommend from './childComps/HomeRecommend.vue';
import FeatureView from './childComps/FeatureView.vue';

// 没有default导出的，要有{}
import { getHomeMultidata, getProductData} from 'network/home.js';

export default {
  name: 'Home',
  components: { navbar, HomeSwiper, HomeRecommend, FeatureView, TabControl},
  data(){
    return{
      banners: [],
      recommends: [],
      titles:['流行', '新款', '精选'],
      goods: {
        'pop': {page: 1, list: []},
        'new': {page: 1, list: []},
        'sell': {page: 1, list: []}
      },
    }
  },
  created(){
    this._getHomeMultidata()
    // this._getProductData()
  },
  methods:{
    _getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners =res.data.data.banner.list;
        this.recommends =res.data.data.recommend.list;
      })
    }
    // _getProductData() {
    //   getProductData().then(res => {
    //     console.log(res)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  #home {
    height: 100%;
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
    .tab-control{
      position: sticky;
      top: 44px;
    }
  }
</style>
