<template>
  <div class="detail">
    <detail-nav></detail-nav>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 商品 -->
      <detail-swiper :images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <!-- 参数 -->
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <!-- 评论 -->
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <!-- 推荐 -->
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"/>
    </scroll>

    <!-- vue3语法，在组件上调用原生事件，看下方 script -->
    <back-top @click="backclick" v-show="showBackTop"></back-top>

  </div>
</template>

<script>

import scroll from 'common/scroll/scroll.vue'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import DetailNav from './childComps/DetailNav.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailRecommendInfo from './childComps/DetailRecommendInfo.vue'

import BackTop from 'content/backTop/BackTop'
import {debounce} from 'common/debounce/debounce'
import mybus from "common/mitt/mitt"

export default {
  components: { scroll, DetailNav, DetailSwiper, DetailBaseInfo, DetailShopInfo, DetailGoodsInfo, DetailParamInfo, DetailCommentInfo, DetailRecommendInfo, BackTop},
  name: 'Detail',
    // vue3语法，在组件上调用原生事件
  emits: ['backclick'],
  data(){
    return {
      iid : this.$route.query.iid,
      topImages: [],
      goods: {},
      shop: {},
	    detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTops: [],
      currentIndex: 0,
      showBackTop:false
    }
  },
  created() {
    // console.log(this.iid)
    // 发送商品请求
    this._getDetail(this.iid)
    this._getRecommend()
  },
  mounted(){
    // 调用前，先定义一个常量接收一下。
    const refresh = debounce(this.$refs.scroll.refresh)
    // 3.监听item中图片加载完成
    mybus.on('imgloadbus',data=>{
      refresh()
    })
  },
  methods:{
    _getDetail(iid) {
      getDetail(iid).then(res => {
        const data = res.data.result
        // console.log(data)
        // 获取顶部的图片数据
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详细信息
        this.detailInfo = data.detailInfo
        // 保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 保存评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })
    },
    imageLoad() {
      // this.$refs.scroll.refresh()
    },
    _getRecommend() {
      getRecommend().then((res) => {
        this.recommendList = res.data.data.list
        // console.log(this.recommendList)
      })
    },
    backclick(){
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // 1.监听backTop的显示
      console.log(position.y)
      if(position.y < -1000){
        this.showBackTop = true
      }else{
        this.showBackTop = false
      }
    }
  },
  // // 销毁
  // destroyed() {
  //   console.log('destroyed')
  // },
}
</script>

<style lang="scss" scoped>
  .detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
