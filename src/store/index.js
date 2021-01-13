import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// import colors from './modules/colors'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 模块化
  modules: {
    app,
    settings,
    user
    // colors
  },
  getters
})

export default store
