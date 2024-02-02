import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import taishi from '@/components/taishi'
import environment from '@/components/environment'
import electric from '@/components/electric'
import instrument from '@/components/instrument'
import energy from '@/components/energy'
import security from '@/components/security'
import business from '@/components/business'
import robot from '@/components/robot'
import global from '@/components/global'
import jiegou from '@/components/jiegou'
import login from '@/components/login'
import demo from '@/components/demo'

Vue.use(Router)

const newRouter =  new Router({
  routes: [
    {
      path: '/',
      name: 'indexDefault',
      component: index
    },
    {
      path: '/index', // 区位
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/situation', // 原旧首页
      name: 'situation', // 态势新路由地址
      component: taishi
    },
    {
      path: '/environment',
      name: 'environment',
      component: environment
    },
    {
      path: '/electrical',
      name: 'electrical',
      component: electric
    },
    {
      path: '/instrument',
      name: 'instrument',
      component: instrument
    },
    {
      path: '/energy',
      name: 'energy',
      component: energy
    },
    {
      path: '/security',
      name: 'security',
      component: security
    },
    {
      path: '/business',
      name: 'business',
      component: business
    },
    {
      path: '/robot',
      name: 'robot',
      component: robot
    },
    {
      path: '/global',
      name: 'global',
      component: global
    },
    {
      path: '/structure',
      name: 'structure', // 结构新路由地址
      component: jiegou
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})

// newRouter.beforeEach((to, from, next) => {
//   // to 将要访问的路径  from 从哪个路径跳转过来  next 一个函数，表示放行
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default newRouter
