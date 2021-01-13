/**
 * 页面相关
 */
import Cookies from 'js-cookie'

// 如果cookies中有颜色，则取cookies中的颜色，没有颜色，则取后面默认颜色
// 侧边栏文字颜色
// const menuText = Cookies.get('menuText') || '#bfcbd9'
// // 激活项文字颜色
// const menuActiveText = Cookies.get('menuActiveText') || '#409eff'
// // 子级菜单激活项文字颜色
// const subMenuActiveText = Cookies.get('subMenuActiveText') || '#f4f4f5'
// // 菜单背景色
// const menuBg = Cookies.get('menuBg') || '#2541b2'
// // 菜单悬浮背景色
// const menuHover = Cookies.get('menuHover') || '#1e3591'
// // 子项背景色
// const subMenuBg = Cookies.get('subMenuBg') || '#03256c'
// // 激活项背景色
// const activeBg = Cookies.get('activeBg') || '#1768ac'

// const sidebarColors = [
//   {
//     menuText: Cookies.get('menuText') || '#bfcbd9'
//   }, // 侧边栏字体颜色
//   menuActiveText, // 激活项文字颜色
//   subMenuActiveText, // 子级菜单激活项文字颜色
//   menuBg, // 菜单背景色
//   menuHover, // 菜单悬浮背景色
//   subMenuBg, // 子项背景色
//   activeBg // 激活项背景色
// ]

const state = {
  sidebarColors: {
    menuText: Cookies.get('menuText') || '#bfcbd9',
    menuActiveText: Cookies.get('menuActiveText') || '#409eff',
    menuBg: Cookies.get('menuBg') || '#2541b2',
    menuHover: Cookies.get('menuHover') || '#1e3591',
    subMenuBg: Cookies.get('subMenuBg') || '#03256c',
    activeBg: Cookies.get('activeBg') || '#1768ac'
  }
}
console.log('------------------------------')
console.log(Cookies.get('menuText'))
console.log(state.sidebarColors.menuBg)
console.log('------------------------------')
const mutations = {
  // 设置侧边栏字体颜色
  CHANGE_COLOR: (state, obj) => {
    // console.log(obj)
    state.sidebarColors[obj.name] = obj.color
    // console.log('------------123----')
    // console.log(key)
    // console.log(state.sidebarColors[obj.name])
    Cookies.set(obj.name, obj.color)
  }
  // // 设置激活项文字颜色
  // CHANGE_menuActiveText: (state, newColor) => {
  //   state.menuActiveText = newColor
  //   Cookies.set('menuActiveText', newColor)
  // },
  // // 设置子级菜单激活项文字颜色
  // CHANGE_subMenuActiveText: (state, newColor) => {
  //   state.subMenuActiveText = newColor
  //   Cookies.set('subMenuActiveText', newColor)
  // },
  // // 设置菜单背景色
  // CHANGE_menuBg: (state, newColor) => {
  //   state.menuBg = newColor
  //   Cookies.set('menuBg', newColor)
  // },
  // // 设置菜单悬浮背景色
  // CHANGE_menuHover: (state, newColor) => {
  //   state.menuHover = newColor
  //   Cookies.set('menuHover', newColor)
  // },
  // // 设置子项背景色
  // CHANGE_subMenuBg: (state, newColor) => {
  //   state.subMenuBg = newColor
  //   Cookies.set('subMenuBg', newColor)
  // },
  // // 设置激活项背景色
  // CHANGE_activeBg: (state, newColor) => {
  //   state.activeBg = newColor
  //   Cookies.set('activeBg', newColor)
  // }
}

const actions = {
  changeColor: ({ commit }, obj) => {
    commit('CHANGE_COLOR', obj)
  }
  // changeMenuText: ({ commit }, newColor) => {
  //   commit('CHANGE_menuText', newColor)
  // },
  // changeMenuActiveText: ({ commit }, newColor) => {
  //   commit('CHANGE_menuActiveText', newColor)
  // },
  // changeSubMenuActiveText: ({ commit }, newColor) => {
  //   commit('CHANGE_subMenuActiveText', newColor)
  // },
  // changeMenuBg: ({ commit }, newColor) => {
  //   commit('CHANGE_menuBg', newColor)
  // },
  // changeMenuHover: ({ commit }, newColor) => {
  //   commit('CHANGE_menuHover', newColor)
  // },
  // changeSubMenuBg: ({ commit }, newColor) => {
  //   commit('CHANGE_subMenuBg', newColor)
  // },
  // changeActiveBg: ({ commit }, newColor) => {
  //   commit('CHANGE_activeBg', newColor)
  // }
}

export default {
  // namespaced：解决不同模块命名冲突的问题
  namespaced: true,
  state,
  mutations,
  actions
}
