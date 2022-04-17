import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: []
  },
  mutations: {
    // 这里写逻辑操作
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      // 在模型里，加入属性：这里为true
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    // 这里是加上判断
    addToCart(context, payload){
      return new Promise((resolve,reject) => {
        // 查看之前数组中是否有该商品
        let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 判断oldproduct
        if(oldproduct){
          // oldproduct.count +=1
          context.commit('addCounter',oldproduct)
          resolve('当前商品，数量加一')
        }else{
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit('addToCart',payload)
          resolve('添加了新的商品')
        }
      })
    }
  },
  getters:{
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  },
  modules: {
  }
})
