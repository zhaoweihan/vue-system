import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import workbench from '@/view/workbench'

Vue.use(Router)

export default new Router({
  routes: [ {
    path: '/',
    name: 'workbench',
    component: workbench,
    // children:[{
    //   path:
    // }]
  }]
})
