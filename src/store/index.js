import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bannerObj: {}
  },
  mutations: {
    setBanner: (state, data) => {
      state.bannerObj = data
    }
  }
})
export default store
