/**
 * 路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/views/layout'

// 在development-env中不使用延迟加载，因为延迟加载过多的页面会导致webpack热更新太慢。所以只在生产中使用延迟加载

Vue.use(Router)

/**
 * Note: 子菜单只在路由子菜单长度大于1，即至少两个子菜单时 出现
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
    // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    hidden: true // (默认 false)

    //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
    redirect: 'noRedirect'

    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    // 若你想不管路由下面的 children 声明的个数都显示你的根路由
    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    alwaysShow: true

    name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    meta: {
      roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
      title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
      icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
      noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
      breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑导航中显示(默认 true)
      affix: true // 如果设置为true，它则会固定在tags-view中(默认 false),不可关闭

      // 当路由设置了该属性，则会高亮相对应的侧边栏。
      // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
      // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
      activeMenu: '/article/list'
    }
 */

// 这里所有的路由页面都使用 路由懒加载

/**
 * constantRoutes
 * 不需要动态判断权限的路由
 */
export const constantRoutes = [
  // 登录路由
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登陆页', icon: 'el-icon-s-shop' },
    hidden: true
  },
  // 首页路由 /dashboard
  {
    path: '/',
    component: Layout,
    name: 'Home',
    alwaysShow: true,
    meta: { title: '首页', icon: 'el-icon-s-home' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '数据展示', icon: 'el-icon-house' }
      }
    ]
  },
  // table组件
  {
    path: '/table',
    component: Layout,
    name: 'Table',
    meta: { title: '表格', icon: 'el-icon-menu' },
    children: [
      {
        path: 'basis-table',
        name: 'BasisTable',
        component: () => import('@/views/table/basis-table/index'),
        meta: { title: '信息展示', icon: 'el-icon-tickets' }
      },
      {
        path: 'expand-table',
        name: 'ExpandTable',
        component: () => import('@/views/table/expand-table/index'),
        meta: { title: '内容展开', icon: 'el-icon-data-board' }
      },
      {
        path: 'drag-table',
        name: 'DragTable',
        component: () => import('@/views/table/drag-table/index'),
        meta: { title: '拖拽功能', icon: 'el-icon-rank' }
      },
      {
        path: 'operate-table',
        name: 'OperateTable',
        component: () => import('@/views/table/operate-table/index'),
        meta: { title: '基本操作', icon: 'el-icon-s-operation' }
      }
    ]
  },
  // 图表
  {
    path: '/echart',
    component: Layout,
    name: 'Echart',
    alwaysShow: true,
    meta: { title: '图表', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'line',
        name: 'LineChart',
        component: () => import('@/views/echart/line'),
        meta: { title: '折线图', icon: 'el-icon-data-line' }
      },
      {
        path: 'mixChart',
        name: 'MixChart',
        component: () => import('@/views/echart/mix-chart'),
        meta: { title: '混合图表', icon: 'el-icon-c-scale-to-original' }
      }
    ]
  },
  // 组件例子
  {
    path: '/example',
    component: Layout,
    alwaysShow: true,
    meta: { title: '组件', icon: 'el-icon-s-cooperation' },
    children: [
      {
        path: 'tab-panel',
        name: 'TabPanel',
        component: () => import('@/views/example/tab-panel'),
        meta: { title: 'tab栏', icon: 'el-icon-takeaway-box' }
      },
      {
        path: 'dropzone',
        name: 'Dropzone',
        component: () => import('@/views/example/dropzone'),
        meta: { title: '上传图片', icon: 'el-icon-cloudy' }
      },
      {
        path: 'dragDialog',
        name: 'DragDialog',
        component: () => import('@/views/example/drag-dialog'),
        meta: { title: '拖拽对话框', icon: 'el-icon-thumb' }
      },
      {
        path: 'back-to-top',
        name: 'BackToTop',
        component: () => import('@/views/example/back-to-top'),
        meta: { title: '返回顶部', icon: 'el-icon-top' }
      },
      {
        path: 'sticky',
        name: 'Sticky',
        component: () => import('@/views/example/sticky'),
        meta: { title: '粘性布局', icon: 'el-icon-hot-water' }
      },
      {
        path: 'dnd-list',
        name: 'DndList',
        component: () => import('@/views/example/dnd-list'),
        meta: { title: '拖拽列表', icon: 'el-icon-connection' }
      },
      {
        path: 'splitPane',
        name: 'SplitPane',
        component: () => import('@/views/example/split-pane'),
        meta: { title: '分割面板', icon: 'el-icon-refrigerator' }
      }
    ]
  },

  // 主题
  {
    path: '/theme',
    component: Layout,
    alwaysShow: true,
    meta: { title: '主题', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'index',
        name: 'Theme',
        component: () => import('@/views/theme/index'),
        meta: { title: '主题', icon: 'el-icon-magic-stick' }
      }
    ]
  },
  // Page404
  {
    path: '*',
    component: Layout,
    // redirect: '/404',
    meta: { title: '错误', icon: 'el-icon-s-release' },
    children: [
      {
        path: '/404',
        name: 'Page404',
        component: () => import('@/views/error/404'),
        meta: { title: '错误404', icon: 'el-icon-document-delete' }
      },
      {
        path: '/401',
        name: 'Page401',
        component: () => import('@/views/error/401'),
        meta: { title: '错误401', icon: 'el-icon-document-remove' }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
