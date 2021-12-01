<template>
  <div class="tab-bar-item" @click="linkclick">
    <div class="item-icon" v-show="!isActive">
      <slot name="icon">
      </slot>
    </div>
    <div class="active-icon" v-show="isActive">
      <slot name="active-icon">
      </slot>
    </div>
    <div class="item-text" :style="activeStyle">
      <slot name="item-text">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    link:{
      type: String,
    }
  },
  data() {
    return{
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle(){
      return this.isActive ? {'color': 'red'} : {}
    }
  },
  methods:{
    linkclick(){
      this.$router.push(this.link)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-bar-item{
    flex: 1;
    .item-icon img{
      width: 24px;
      height: 24px;
      margin-top: 5px;
      vertical-align: middle;
    }
    .active-icon img{
      width: 24px;
      height: 24px;
      margin-top: 5px;
      vertical-align: middle;
    }
    .item-text{
      font-size: 12px;
      margin-top: 3px;
      color: #333;
    }
  }
</style>
