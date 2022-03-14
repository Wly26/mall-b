<template>
    <navbar class="wrap">
        <template #left>
            <img class="back" @click="backClick" src="~assets/img/common/back.svg" alt="">
        </template>
        
        <template #center>
            <div class="title">
                <div class="title-item"
                    v-for="(item, index) in titles"
                    @click="titleClick(index)"
                    :class="{active: currentIndex === index}"
                    :key="index">
                    {{item}}
                </div>
            </div>
        </template>
    </navbar>
</template>

<script>
import navbar from 'common/navbar/navbar.vue';
export default {
  components: { navbar },
  name: 'DetailNav',
  data(){
    return {
        currentIndex: 0
    }
  },
  props: {
    titles: {
        type: Array,
    default: () => {
        return ['商品', '参数', '评论', '推荐']
    }
    },
  },
    methods: {
	    backClick() {
            // 路由跳转是push方法，这里可以返回上一级。
	    	this.$router.back()
        },
	    titleClick(index) {
            this.currentIndex = index
            // this.$emit('titleClick', index)
        }
    }
}
</script>

<style lang='scss' scoped>
.active {
    color: var(--color-high-text)
  }
  .back {
    margin-top: 12px;
  }
  .title {
    display: flex;
    padding: 0 20px;
    .title-item {
        flex: 1;
        font-size: 14px;
    }
  }
.wrap{
  background-color: #fff;
}
  
</style>