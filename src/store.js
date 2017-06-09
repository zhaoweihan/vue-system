import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    //   面包屑导航
    breadCrumbs: []
  },
  mutations: {
    // Count (state, platform) {
    //   state.count = platform
    // },
    defineBreadCrumbs(state, platform) {
      state.breadCrumbs = platform;
    }
  }

})
