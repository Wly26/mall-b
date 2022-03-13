<template>
  <div id="app">

  <!-- <router-view></router-view> -->


  <!-- vue3语法 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
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
