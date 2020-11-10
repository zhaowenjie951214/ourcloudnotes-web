import Vue from 'vue'
import Router from 'vue-router'
// import { getToken } from '@/utils/auth'
// import store from '@/store'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
// import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

/**
 * @Description:  该函数用于将所有分区路由中的路由添加到路由数组
 * @params1: routerArr 路由arr
 * @returns: constantRouterMap 拼接完成的路由组件
 */
const constantRouterMap = [] // 路由数组 - 存放所有路由
function importAll(routerArr) {
  routerArr.keys().forEach(item => {
    const comp = routerArr(item)
    console.log("comp",comp)
    constantRouterMap.push((comp).default)
  })
  // 将路由按照sort大小从小到大升序排序
  constantRouterMap.sort((prev, next) => prev.sort - next.sort < 0 ? -1 : 1)
}

// 获取当前目录的父目录下的所有以routes.js结尾的文件，得到的是路径字符串组成的数组
const routerArr = require.context('.', true, /\.routes\.js/)
importAll(routerArr)

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

//  const whiteList = ['/login', '/board/qcboard', '/board/llboard'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // const token = getToken()
  // const realName = store.state.user.realName
  // const id = store.state.user.id
  // if (token && realName) {
  //   if (!store.state.permission.hasGetRules) {
  //     store.dispatch('getPermission', id).then(() => {
  //       next()
  //     }).catch(() => {
  //       next({ name: 'login' })
  //     })
  //   } else {
  //     if (to.name === 'login') {
  //       next({ name: 'dashboard' })
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
    console.log("to",to)
    next()
    // if (whiteList.indexOf(to.path) !== -1) next()
    // else next({ name: 'login' })
  // }
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router
