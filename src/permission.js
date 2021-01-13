/**
 * 设置路由守卫，验证用户权限等
 */
import router from './router'
import store from './store'
// Progress 进度条
import NProgress from 'nprogress'
// Progress 进度条样式
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
// import getPageTitle from '@/utils/get-page-title'

// NProgress设置
NProgress.configure({ showSpinner: false })
// 不重定向白名单，即用户无需登录即可访问的页面
const whiteList = ['/login']
// const whiteList = ['/login', '/dashaboard', '/example', '/form']

// 路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 设置页面标题
  // document.title = getPageTitle(to.meta.title)

  // 用于判断用户是否登录
  const hasToken = getToken()
  if (hasToken) {
    // ，有token值，表示用户登录了
    if (to.path === '/login') {
      // 如果用户去登录页面，则跳转到首页，因为已经登录
      next({ path: '/' })
      // 如果当前页面是dashboard不会触发的，在每次 hook 后手动处理它
      NProgress.done() // afterEach hook, so manually handle it
    } else {
      // 如果去其它页面
      // 获取vuex中的 角色权限
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        // 有角色权限
        next()
      } else {
        // 没有角色权限
        try {
          // 则尝试重新获取用户信息
          // dispatch 用于调用vuex中actions中的异步函数
          await store.dispatch('user/getInfo')
          // 获取成功后则放行访问
          next()
        } catch (error) {
          // 获取用户角色信息失败，清除token，重定向到登陆页
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有 token 值，表示没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果用户点击跳转的页面在白名单中，则直接放行
      next()
    } else {
      // 如果没有在白名单中，则先重定向到登陆页，将要访问的地址也传入
      next(`/login?redirect=${to.path}`)
      // next('/login')
      NProgress.done()
    }
  }
})
// 在路由跳转之后
router.afterEach((to, from) => {
  NProgress.done() // 结束Progress
})
