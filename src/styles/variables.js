// 导入vuex，
// const { default: $store } = require('../store/index.js')
// console.log($store)
// const data = require('../store/index.js')
// console.log(data)
// // 从vuex中获取颜色数组
// const { sidebarColors } = $store.state.colors
// // 解构颜色
// const {
//   menuText,
//   menuActiveText,
//   menuBg,
//   menuHover,
//   subMenuBg,
//   activeBg
// } = sidebarColors

const styleVariables = {
  'red-bg': 'blue'
  // menuText, // 侧边栏文字颜色
  // menuActiveText, // 激活项文字颜色
  // menuBg, // 菜单背景色
  // menuHover, // 菜单悬浮背景色
  // subMenuBg, // 子项背景色
  // activeBg // 激活项背景色
}
// console.log(styleVariables)
module.exports = styleVariables
