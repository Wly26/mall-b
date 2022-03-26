<template>
  <div class="detail">
    <detail-nav @titleClick="titleClick" ref="nav"></detail-nav>
      <scroll class="content" ref="scroll" :bstype="3"  @scroll="scrollbtn" :pull-up-load = "true">
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
      showBackTop: false,
      // 联动距离
      themeTopYs:[],
      themeTopf:null
    }
  },
  created() {
    // console.log(this.iid)
    // 发送商品请求
    this._getDetail(this.iid)
    this._getRecommend()

    this.themeTopf = debounce(()=>{
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)
    },100)
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
        // 有个bug,图片没有加载完成
        // this.$nextTick(()=>{
        //   this.themeTopYs=[]
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
      })
    },
    // 图片加载完，调用
    imageLoad() {
      this.themeTopf()
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
    scrollbtn(position){
      // 是否显示返回最上方
      if(-position.y < 1000){
        this.showBackTop = false
      }else{
        this.showBackTop = true
      }
      this.istabFixed = (-position.y) > this.tabOffsetTop

      // 监听滚动到某个主题
      this._listenScrollTheme(-position.y)
      // console.log(position)
    },
    _listenScrollTheme(position) {
        /**
         * 判断的方案:
         *  方案一:
         *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTopYs[i+1]) || (i === (length-1) && currentPos >= iPos),
         *    优点: 不需要引入其他的内容, 通过逻辑解决
         *    缺点: 判断条件过长, 并且不容易理解
         *  方案二:
         *    条件: 给themeTopYs最后添加一个很大的值, 用于和最后一个主题的top进行比较.
         *    优点: 简洁明了, 便于理解
         *    缺点: 需要引入一个较大的int数字
         * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
         * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
         */
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if((i < this.themeTopYs.length - 1 && position >= this.themeTopYs[i] && position < this.themeTopYs[i+1]) || (i === this.themeTopYs.length - 1 && position >= this.themeTopYs[i])){
            // console.log(i)
            this.$refs.nav.currentIndex = i
          }
        }

      // for (let i = 0; i < this.themeTopYs.length; i++) {
      //   let iPos = this.themeTopYs[i];
      //   if (position >= iPos && position < this.themeTopYs[i+1]) {
      //     if (this.currentIndex !== i) {
      //       this.currentIndex = i;
      //     }
      //     break;
      //   }
      // }
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
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
