import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bannerObj: {},
    systemInfo: {},
    userInfo: {}
  },
  mutations: {
    setBanner: (state, data) => {
      state.bannerObj = data
    },
    setSysInfo: (state, data) => {
      state.systemInfo = data
    },
    setUserInfo: (state, data) => {
      state.userInfo = data
    }
  }
})
export default store
