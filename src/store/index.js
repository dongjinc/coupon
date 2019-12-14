import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bannerObj: {},
    systemInfo: {}
  },
  mutations: {
    setBanner: (state, data) => {
      state.bannerObj = data
    },
    setSysInfo: (state, data) => {
      state.systemInfo = data
    }
  }
})
export default store
