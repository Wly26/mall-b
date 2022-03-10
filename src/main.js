import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// //导入插件mitt
// import mitt from "mitt"

// //创建Vue应用实例
// const bus = createApp(App)
// //挂载事务总线为全局属性
// bus.config.globalProperties.$bus = new mitt()

createApp(App).use(store).use(router).mount('#app')
