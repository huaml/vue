import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

// 显式安装
Vue.use(Vuex)

var debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters: getters,
  state: state,
  mutations: mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
