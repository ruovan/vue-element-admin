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

// NProgress设置
NProgress.configure({ showSpinner: false })

// 不重定向白名单，即用户无需登录即可访问的页面
const whiteList = ['/login']
// const whiteList = ['/login', '/dashaboard', '/example', '/form']

// 路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 用于判断用户是否登录:从缓存中获取 token值
  const hasToken = getToken()
  if (hasToken) {
    // 如果有token值，表则示用户登录了
    if (to.path === '/login') {
      // 如果用户去登录页面，则跳转到首页，因为已经登录
      next({ path: '/home' })
      // 如果当前页面是dashboard不会触发的，在每次 hook 后会手动处理它
      NProgress.done()
    } else {
      // 如果去的是其它页面，则需要判断用户是否有权限
      // 获取vuex中的 角色权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 有角色权限，判断用户权限是否能够 访问要前往的页面
        next()
      } else {
        // 没有角色权限，则尝试重新获取用户信息，以重新获取角色权限
        try {
          // 获取用户信息，用户权限数组对象，如: ['admin'] 、['developer','editor']
          // 通过结构赋值将权限结构出来
          const { roles } = await store.dispatch('user/getInfo')
          // 调用vuex中方法，验证roles并获取roles可进入路由
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          // 动态添加路由,这里似乎无法添加成功，改用state中的数据了
          // issue解决问题，原侧边栏获取的路由是 routes原数据，需要改为新的数据 permission_routes
          router.addRoutes(accessRoutes)
          // router.options.routes = store.getters.permission_routes
          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 获取用户角色信息失败，则清除token，并重定向到登陆页
          await store.dispatch('user/resetToken')
          Message.error(error)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 如果没有 token 值，则表示没有登录
    // 进行白名单的判断
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
