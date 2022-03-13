<template>
  <div class="detail">
    <detail-nav></detail-nav>

    <detail-swiper :images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <!-- <detail-param-info ref="param" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="goodsList"/> -->

  </div>
</template>

<script>
import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import DetailNav from './childComps/DetailNav.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
// import DetailParamInfo from './childComps/DetailParamInfo'
// import DetailCommentInfo from './childComps/DetailCommentInfo'
export default {
  components: { DetailNav, DetailSwiper, DetailBaseInfo, DetailShopInfo, DetailGoodsInfo},
  name: 'Detail',
  data(){
    return {
      iid : this.$route.query.iid,
      topImages: [],
      goods: {},
      shop: {},
	    detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      themeTops: [],
      currentIndex: 0
    }
  },
  created() {
    // console.log(this.iid)
    // 发送商品请求
    this._getDetail(this.iid)
    // this._getRecommend()
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
    }
    // _getRecommend(){

    // }
  }
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
