<template>
  <div id="home">
    <navbar class="nav-bar"><template #center>购物街</template></navbar>
    <home-swiper :banners="banners" class="fixed"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClickbtn"></tab-control>
    <goods-list :goodslist="showGoodsList"></goods-list>
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
import { getHomeMultidata, getHomedata} from 'network/home.js';
import goodsList from '../../components/content/goods/goodslist.vue';

export default {
  name: 'Home',
  components: { navbar, HomeSwiper, HomeRecommend, FeatureView, TabControl, goodsList},
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
      currentType:'pop'
    }
  },
  computed: {
    showGoodsList() {
      console.log(this.goodslist[this.currentType].list)
      return this.goodslist[this.currentType].list
    }
  },
  created(){
    this._getHomeMultidata()
    this._getHomedata('pop')
    this._getHomedata('new')
    this._getHomedata('sell')
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
      // console.log(index)
      // console.log(this.currentType)
      // console.log(this.goodslist['pop'].list)
      // console.log(this.goodslist[this.currentType].list)
    }
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
