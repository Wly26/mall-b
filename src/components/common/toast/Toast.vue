<template>
  <div>
    <transition name="fade">
      <div class="toast" v-show="isShow">{{message}}</div>
    </transition>
  </div>
</template>

<script>
	export default {
		name: "Toast",
    props:{
      isShow:{
        type: Boolean,
      },
      message:{
        type: String,
      }
    },
    data() {
			return {
      }
    }
	}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:rgb(255, 255, 255);
    z-index: 99;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>