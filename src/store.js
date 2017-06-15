import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    //   面包屑导航
    breadCrumbs: [],
    nickname:'',
    headPic:''
  },
  mutations: {
    defineBreadCrumbs(state, platform) {
      state.breadCrumbs = platform;
    },
    setNickName(state, platform){
      state.nickname=platform;
    },
    setHeadPic(state, platform){
      state.headPic=platform;
    }
  }

})
