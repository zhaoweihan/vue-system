import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import workbench from '@/view/workbench' //工作台
import shoppingcart from '@/view/shoppingCart/shoppingCart'
import checkinmanagement from '@/view/dailywork/assessmentManagement/checkinManagement' //入住评估
import checkinedit from '@/view/dailywork/assessmentManagement/checkinEdit'
import userinfo from '@/view/usercenter/userinfo'
import login from '@/view/login'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'workbench',
    component: workbench,
    children: [{
      path: '/dailywork/checkinManagement',//入住评估列表
      name: 'checkinManagement',
      component: checkinmanagement,
    }, {
      path: '/dailywork/checkinEdit/:id',//入住评估编辑
      name: 'checkinEdit',
      component: checkinedit,
    }, {
      path: '/usercenter/userinfo',
      name: 'userinfo',
      component: userinfo,
    }, {
      path: '/',
      name: 'shoppingCart',
      component: shoppingcart,
    }]
  }, {
    path: '/login',
    name: 'login',
    component: login,
  }]
})
