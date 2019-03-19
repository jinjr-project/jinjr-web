import Vue from 'vue'
import Vuex from 'vuex'
import issue from './modules/issue'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    issue
  },
  strict: debug,
//   plugins: debug ? [createLogger()] : []
})