/**
 * 用户相关 Vuex
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // 调用auth.js中的 getToken 函数，获取 token值
    token: getToken(),
    // 存储角色：管理员~！~
    name: '',
    // 存储头像
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state,调用方法清空信息
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
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
  }
}
// 仍然需要通过过 commit 来调用 mutations 中的函数
// 这里通过结构赋值的方式，直接将 commit 提取出来，后面直接使用 commit 即可
const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用用户接口中的 login 函数，发起请求登录
      login({ username: username.trim(), password: password })
        .then(response => {
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
          // 判断返回的 用户信息中的 roles 是否是一个非空数组
          if (!data) {
            // 这里需要遵循ESLint规范，错误需要放在new Error('...')中
            // reject('getInfo: roles must be a non-null array !')
            return reject(new Error('验证失败，请重新登录'))
          }
          const { name, avatar } = data
          // 调用 SET_NAME 函数，设置 name
          commit('SET_NAME', name)
          // 调用 SET_AVATAR 函数，设置 avatar
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch(error => {
          // 请求失败
          reject(error)
        })
    })
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用用户接口中的 logout 函数，清除相关信息
      logout(state.token)
        .then(() => {
          // 调用auth.js中的 removeToken 函数，移除 token值
          removeToken()
          resetRouter()
          commit('RESET_STATE')
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
      // 必须先移除 token
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // namespaced：解决不同模块命名冲突的问题
  namespaced: true,
  state,
  mutations,
  actions
}
