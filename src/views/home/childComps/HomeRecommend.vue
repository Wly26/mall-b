<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item" class="item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'HomeRecommend',
  props:{
    recommends: {
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
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 10px;
    border-bottom: 8px solid rgb(235, 235, 235);
    .item{
      flex: 1;
      img{
        width: 65px;
        height: 65px;
        margin-bottom: 10px;
      }
    }
  }
</style>
