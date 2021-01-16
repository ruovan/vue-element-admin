/**
 * 用户相关 Vuex
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  // 调用auth.js中的 getToken 函数，获取 token值
  token: getToken(),
  // 存储角色名：管理员~！~
  name: '',
  // 存储头像
  avatar: '',
  roles: [],
  introduction: ''
}

const mutations = {
  // 设置 token 值，并保存到vuex中
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置用户名，并保存到vuex中
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 设置头像，并保存到vuex中
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 设置权限
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  }
}
// 仍然需要通过过 commit 来调用 mutations 中的函数
// 这里通过结构赋值的方式，直接将 commit 提取出来，后面直接使用 commit 即可
const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用用户接口中的 login 函数，发起请求登录,登录只会设置 token值，不会获取用户信息
      login({ username: username.trim(), password: password })
        .then(response => {
          // 这里返回数据存储的是token值
          const { data } = response
          commit('SET_TOKEN', data.token)
          // 调用auth.js中的 setToken 函数，设置 token值
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用用户接口中的 getInfo 函数，通过token值请求获取用户信息
      getInfo(state.token)
        .then(response => {
          // 请求成功，返回用户信息
          const { data } = response
          // 判断数据是否有效
          if (!data) {
            // 这里需要遵循ESLint规范，错误需要放在new Error('...')中
            // reject('getInfo: roles must be a non-null array !')
            reject(new Error('验证失败，请重新登录'))
          }

          const { name, avatar, roles, introduction } = data
          // 判断返回的 用户信息中的 roles 是否是一个非空数组
          if (!roles || roles.length <= 0) {
            reject(new Error('角色权限必须是一个非空数组'))
          }

          // 设置权限
          commit('SET_ROLES', roles)
          // 调用 SET_NAME 函数，设置 name
          commit('SET_NAME', name)
          // 调用 SET_AVATAR 函数，设置 avatar
          commit('SET_AVATAR', avatar)
          // 设置权限介绍
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        })
        .catch(error => {
          // 请求失败
          reject(error)
        })
    })
  },

  // 登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // 调用用户接口中的 logout 函数，清除相关信息
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          // 移除token
          removeToken()
          resetRouter()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      // 在调用方法初始化
      resolve()
    })
  },

  // 动态修改权限
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // 基于角色生成可访问路线图
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    // 动态添加可访问路由
    router.addRoutes(accessRoutes)
  }
}

export default {
  // namespaced：解决不同模块命名冲突的问题
  namespaced: true,
  state,
  mutations,
  actions
}
