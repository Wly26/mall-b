<template>
  <div class="tab-control">
    <div class="tab-control-item"
         v-for="(item, index) in titles"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)"
         :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        // console.log(index)
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: rgb(255, 255, 255);
    z-index: 9;
    .tab-control-item{
      flex: 1;
      span {
        padding: 5px;
      }
    }
  }
  .active {
    color: var(--color-high-text);
  }
  .tab-control-item.active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>