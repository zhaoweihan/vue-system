import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import workbench from '@/view/workbench'//工作台
import checkinmanagement from '@/view/dailywork/assessmentManagement/checkinManagement'//入住评估
Vue.use(Router)

export default new Router({
  routes: [ {
    path: '/',
    name: 'workbench',
    component: workbench,
    children:[{
      path:'/dailywork/checkinManagement',
      name:'checkinManagement',
      component:checkinmanagement
    }]
  }]
})
