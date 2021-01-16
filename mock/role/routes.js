// mock数据，路由数据

/**
 * constantRoutes
 * 不需要动态判断权限的路由
 */
const constantRoutes = [
  {
    // 登录
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  // 首页路由 /dashboard
  {
    path: '/',
    component: 'views/layout',
    name: 'Dashboard',
    // alwaysShow: true,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: 'views/dashboard',
        meta: { title: '首页', icon: 'el-icon-s-home' }
      }
    ]
  },
  // 图表
  {
    path: '/echart',
    component: 'views/layout',
    name: 'Echart',
    alwaysShow: true,
    meta: { title: '图表', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'line',
        name: 'LineChart',
        component: 'views/echart/line',
        meta: { title: '折线图', icon: 'el-icon-data-line' }
      },
      {
        path: 'mixChart',
        name: 'MixChart',
        component: 'views/echart/mix-chart',
        meta: { title: '混合图表', icon: 'el-icon-c-scale-to-original' }
      }
    ]
  },
  // 主题
  {
    path: '/theme',
    component: 'views/layout',
    alwaysShow: true,
    meta: { title: '主题', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'index',
        name: 'Theme',
        component: 'views/theme/index',
        meta: { title: '主题', icon: 'el-icon-magic-stick' }
      }
    ]
  }
]
/**
 * asyncRoutes
 * 需要动态判断权限
 * 并通过 addRoutes 动态添加的路由
 */
const asyncRoutes = [
  // 权限
  {
    path: '/permission',
    component: 'views/layout',
    redirect: '/permission/directive',
    alwaysShow: true,
    meta: {
      title: '权限',
      icon: 'el-icon-s-opportunity',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: '定向权限',
          icon: 'el-icon-s-claim'
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          icon: 'el-icon-s-custom',
          roles: ['admin']
        }
      }
    ]
  },
  // table组件
  {
    path: '/table',
    component: 'views/layout',
    name: 'Table',
    meta: { title: '表格', icon: 'el-icon-menu' },
    children: [
      {
        path: 'basis-table',
        name: 'BasisTable',
        component: 'views/table/basis-table/index',
        meta: { title: '信息展示', icon: 'el-icon-tickets' }
      },
      {
        path: 'expand-table',
        name: 'ExpandTable',
        component: 'views/table/expand-table/index',
        meta: { title: '内容展开', icon: 'el-icon-data-board' }
      },
      {
        path: 'drag-table',
        name: 'DragTable',
        component: 'views/table/drag-table/index',
        meta: { title: '拖拽表格', icon: 'el-icon-rank' }
      },
      {
        path: 'operate-table',
        name: 'OperateTable',
        component: 'views/table/operate-table/index',
        meta: { title: '基本操作', icon: 'el-icon-s-operation' }
      }
    ]
  },
  // 组件例子
  {
    path: '/example',
    component: 'views/layout',
    alwaysShow: true,
    meta: { title: '组件', icon: 'el-icon-s-cooperation' },
    children: [
      {
        path: 'tab-panel',
        name: 'TabPanel',
        component: 'views/example/tab-panel',
        meta: { title: 'tab栏', icon: 'el-icon-takeaway-box' }
      },
      {
        path: 'dropzone',
        name: 'Dropzone',
        component: 'views/example/dropzone',
        meta: { title: '上传图片', icon: 'el-icon-cloudy' }
      },
      {
        path: 'back-to-top',
        name: 'BackToTop',
        component: 'views/example/back-to-top',
        meta: { title: '返回顶部', icon: 'el-icon-top' }
      },
      {
        path: 'dnd-list',
        name: 'DndList',
        component: 'views/example/dnd-list',
        meta: { title: '拖拽功能', icon: 'el-icon-connection' }
      },
      {
        path: 'splitPane',
        name: 'SplitPane',
        component: 'views/example/split-pane',
        meta: { title: '分割面板', icon: 'el-icon-refrigerator' }
      },
      {
        path: 'todoList',
        name: 'TodoList',
        component: 'views/example/todo-list',
        meta: { title: '待办事项', icon: 'el-icon-editor' }
      }
    ]
  },
  // Page404
  {
    path: '*',
    component: 'views/layout',
    // redirect: '/404',
    meta: { title: '错误', icon: 'el-icon-s-release' },
    children: [
      {
        path: '/404',
        name: 'Page404',
        component: 'views/error/404',
        meta: { title: '错误404', icon: 'el-icon-document-delete' }
      },
      {
        path: '/401',
        name: 'Page401',
        component: 'views/error/401',
        meta: { title: '错误401', icon: 'el-icon-document-remove' }
      }
    ]
  }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
