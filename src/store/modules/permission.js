import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 判断当前用户是否对路由有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // 判断这个路由是否有 meta属性，以及meta属性的roles属性
  if (route.meta && route.meta.roles) {
    // 有roles,则判断当前角色是否在这个 roles数组中，在则返回true
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有meta属性，表示该路由都可访问
    return true
  }
}

/**
 * 递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  // 遍历 需要权限的 路由
  routes.forEach(route => {
    // route 是数组中的每一个路由对象
    const tmp = { ...route }
    // 传入函数，判断当前角色是否可访问路由
    if (hasPermission(roles, tmp)) {
      // 如果有子路由，则递归
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  // 返回可访问的路由数组
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 判断当前角色是否包含 admin权限
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        // 不包含admin，则判断当前用户可以访问的路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // 存储到State中
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
