import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import Status from '../views/Status.vue'
import Control from '../views/Control.vue'
import Additional from '../views/Additional.vue'
import History from '../views/History.vue'
import Errors from '../views/Errors.vue'
import ChamberService from '@/services/ChamberService'

Vue.use(VueRouter)

function todayDate() {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = String(today.getFullYear())

  return `${yyyy}-${mm}-${dd}`
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/Status'
  },{
    path: '/Status',
    name: 'Status',
    component: Status
  },{
    path: '/Control',
    redirect: { name: 'Control', params: { chamberNo: '1' }}
  },{
    path: '/Control/:chamberNo',
    name: 'Control',
    component: Control,
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (ChamberService.Count === 0) {
        next({name: 'Status'});
      } else {
        const toNo = Number(to.params.chamberNo)
        
        if (toNo === NaN || toNo < 1 || toNo > ChamberService.Count)
          next({ name: 'Control', params: { chamberNo: "1" }});
        else
          next();
      }


    }
  },{
    path: '/Additional',
    name: 'Additional',
    component: Additional
  },{
    path: '/History',
    redirect: () => {
      const today = todayDate();
      return { name: 'History', params: {  
        chamberNo: '1',
        startDay: today,
        endDay: today,
      } }
    }
  },{
    path: '/History/:chamberNo',
    redirect: route => {
      const today = todayDate();

      return `${route.path}/${today}/${today}`;
    }
  },{
    path: '/History/:chamberNo/:startDay',
    redirect: route => {
      const today = todayDate();

      return `${route.path}/${today}`;
    }
  },{
    path: '/History/:chamberNo/:startDay/:endDay',
    name: 'History',
    component: History
  },{
    path: '/Errors',
    name: 'Errors',
    component: Errors
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
