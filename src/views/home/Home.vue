<template>
  <div id="home">
    <navbar class="nav-bar"><template #center>购物街</template></navbar>
    <scroll class="content" ref="scroll" :bstype="3"  @scroll="scrollbtn" :pull-up-load = "true" @pullingUp='pullingUpbtn'>
      <home-swiper :banners="banners" class="fixed"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="titles" @tabClick="tabClickbtn"></tab-control>
      <goods-list :goodslist="showGoodsList"></goods-list>
    </scroll>
    <!-- vue3语法，在组件上调用原生事件，看下方 script -->
    <back-top @click="backclick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
// 组件直接写名字
import navbar from 'common/navbar/navbar.vue';
import TabControl from 'content/tabcontrol/TabControl.vue';
import BackTop from 'content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper.vue';
import HomeRecommend from './childComps/HomeRecommend.vue';
import FeatureView from './childComps/FeatureView.vue';

// 没有default导出的，要有{}
import { getHomeMultidata, getHomedata} from 'network/home.js';
import goodsList from 'content/goods/goodslist.vue';
import scroll from 'common/scroll/scroll.vue'

import {debounce} from 'common/debounce/debounce'
import mybus from "common/mitt/mitt";

export default {
  name: 'Home',
  // vue3语法，在组件上调用原生事件
  emits: ['backclick'],
  components: { navbar, HomeSwiper, HomeRecommend, FeatureView, TabControl, goodsList,scroll,BackTop},
  data(){
    return{
      banners: [],
      recommends: [],
      titles:['流行', '新款', '精选'],
      goodslist: {
        'pop': {page: 1, list: []},
        'new': {page: 1, list: []},
        'sell': {page: 1, list: []}
      },
      currentType:'pop',
      showBackTop: false
    }
  },
  computed: {
    showGoodsList() {
      return this.goodslist[this.currentType].list
    }
  },
  created(){
    // 1.请求多个数据
    this._getHomeMultidata()

    // 2.请求商品数据
    this._getHomedata('pop')
    this._getHomedata('new')
    this._getHomedata('sell')

  },
  mounted(){
    // 3.监听item中图片加载完成
    mybus.on('imgloadbus',data=>{
      debounce( this.$refs.scroll.refresh, 500)
    })
  },
  methods:{
    _getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners =res.data.data.banner.list;
        this.recommends =res.data.data.recommend.list;
      })
    },
    _getHomedata(currentType) {
      // 当前页码 + 1
      const page = this.goodslist[currentType].page + 1
      getHomedata(currentType,page).then(res => {
        // console.log(res)
        // 把一个数组的数据，放到另一个数据里 
        // 1.可以遍历数组
        // for( let n of list){
        //   newlist.push(n)
        // }
        // 2.数组解构
        // newlist.push(...n)
        const newList = res.data.data.list
        this.goodslist[currentType].list.push(...newList),
        this.goodslist[currentType].page += 1
        // 完成上拉加载后，刷新
        this.$refs.scroll.finishPullUp()
      })
    },
    tabClickbtn(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    },
    backclick(){
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    scrollbtn(position){
      if(-position.y < 1000){
        this.showBackTop = false
      }else{
        this.showBackTop = true
      }
    },
    // 上拉加载更多事件
    pullingUpbtn(){
      // 再次调用请求函数
      this._getHomedata(this.currentType)
    }
  }
}
</script>

<style lang="scss" scoped>
  #home {
    // vh是视口高度
    height: 100vh;
    padding-top: 44px;
    position: relative;
    .nav-bar {
      background-color: var(--color-tint);
      font-weight: 700;
      color: #fff;
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
    }
    .content{
      overflow: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
    }
    .tab-control{
      position: sticky;
      top: 60px;
    }
  }
</style>
