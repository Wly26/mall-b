<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view/>
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
