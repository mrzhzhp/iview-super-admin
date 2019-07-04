import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import createLogger from '../plugin/error-store/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
