const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')
// 动态获取的 routes
const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: '超级管理员。可以查看所有页面',
    routes: routes // 管理员拥有所有权限，所有路由都可访问
  },
  {
    key: 'editor',
    name: 'editor',
    description: '普通用户。可以查看除权限页以外的所有页',
    routes: routes.filter(i => i.path !== '/permission') // 只允许访问没有权限验证的路由
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: '访客。只能看到主页',
    routes: [
      {
        path: '/home',
        redirect: 'dashboard',
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            meta: { title: '首页', icon: 'el-icon-s-home' }
          }
        ]
      }
    ]
  }
]

module.exports = [
  // 从服务器端获取所有角色的路由
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // 从服务器端获取所有角色权限
  {
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // 添加角色
  {
    url: '/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // 更新角色
  {
    url: '/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // 删除角色
  {
    url: '/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
