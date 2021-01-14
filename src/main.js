import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入初始化样式文件
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 导入ElementUI相关文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 国际化：lang i18n
// import locale from 'element-ui/lib/locale/lang/en'
// 导入全局样式
import '@/styles/index.scss'
// 导入图标样式
// import '@/icons'
// 导入permission，用于设置路由守卫、权限等
import '@/permission'

/**
 * 如果你不想使用模拟服务器 mock-server
 * 您想将MockJs用于mock api
 * 你可以执行：mockXHR（）
 * 目前 MockJs 将用于生产环境
 * 上线前请先删除！
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 设置 ElementUI 为英语格式
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
