/**
 * 页面相关
 */
import Cookies from 'js-cookie'

const state = {
  // 侧边栏状态
  sidebar: {
    // 是否处于展开状态
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    // 是否关闭动画效果
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  // 侧边栏切换
  TOGGLE_SIDEBAR: state => {
    // 切换时：展开就关闭，关闭就展开
    state.sidebar.opened = !state.sidebar.opened
    // 动画
    state.sidebar.withoutAnimation = false
    // 将值存储到 Cookies 中
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 关闭侧边栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换显示设备
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  // namespaced：解决不同模块命名冲突的问题
  namespaced: true,
  state,
  mutations,
  actions
}
