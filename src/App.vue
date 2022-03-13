<template>
  <div id="app">
    
  <!-- vue3语法 -->
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Detail">
      <component :is="Component" />
    </keep-alive>
  </router-view>
   
  <main-tab-bar></main-tab-bar>
    
  </div>
</template>

<script> 
import mainTabBar from 'content/mainTabBar/mainTabBar.vue'
export default { 
  components: { mainTabBar },
}
</script>

<style lang="scss">
@import "assets/css/base.css";
  #app {
    position: relative;
  }
</style>
