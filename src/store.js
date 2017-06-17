import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',//严格模式
  state: {
    //   面包屑导航
    breadCrumbs: [],
    nickname:'',
    headPic:'',
    realname:'',
    gender:''
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
    },
    setRealName(state, platform){
      state.realname=platform;
    },
    setGender(state, platform){
      state.gender=platform;
    }
  }

})
