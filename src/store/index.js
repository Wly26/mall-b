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
      payload.checked = false
      state.cartList.push(payload)
    }
  },
  actions: {
    // 这里是加上判断
    addToCart(context, payload){
      let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldproduct){
        // oldproduct.count +=1
        context.commit('addCounter',oldproduct)
      }else{
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
      }
    }
  },
  modules: {
  }
})
