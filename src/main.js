// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css';
import iview  from "./until/iview";
import getPageTitle from '@/until/get-page-title';//设置头title
import Cookies from 'js-cookie'//在cookie中获取token
import {store} from "./until/store";//全局仓库
import {getInfo} from "./api/api";//请求
Vue.config.productionTip = false
Vue.use(iview)
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = Cookies.get("token")//判断是否有token
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({path: '/'})
    } else {
      const hasGetUserInfo = store.state.account
      if (hasGetUserInfo){
        next()
      } else {
        try {
          // get user info
          getInfo().then((e)=>{
             console.log(e)
             store.setMessageAction("account",e.data.data)        
             next()
          })
        } catch (error) {
          next(`/login?redirect=${to.path}`)
        }
      }
      // const hasGetUserInfo = store.state.name
      // if (hasGetUserInfo){
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     await store.dispatch('user/getInfo')
      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
