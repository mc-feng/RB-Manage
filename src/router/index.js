import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/login';
import Layout from '../views/layout';
Vue.use(Router)
//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children:[
      {path:"",component: () => import('@/views/home'),name:"首页"}
    ]
  },
  {
    path: '/meet',
    component: Layout,
    name: '会议室',
    children:[
      {path:"manage",component: () => import('@/views/yuyue/manage')},
      {path:"setting",component: () => import('@/views/yuyue/setting')},
      {path:"whiteName",component: () => import('@/views/yuyue/whiteName')}
    ]
  },
  {
    path: '/tijian',
    component: Layout,
    name: '体检',
    children:[
      {path:"yuyue",component: () => import('@/views/tijian/yuyue')},
      {path:"name",component: () => import('@/views/tijian/name')},
      {path:"card",component: () => import('@/views/tijian/card')}
    ]
  },
  {
    path: '/guanli',
    component: Layout,
    name: '管理',
    children:[
      {path:"account",component: () => import('@/views/manage/account')},
      {path:"role",component: () => import('@/views/manage/role')}
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]
//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRouterMap
});
//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { role: ['admin','super_editor'] }, //页面需要的权限
    children: [
    { 
      path: 'index',
      component: Layout,
      name: '权限测试页',
      meta: { role: ['admin','super_editor'] }  //页面需要的权限
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
];