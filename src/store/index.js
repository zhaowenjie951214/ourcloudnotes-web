import Vue from 'vue'
import Vuex from 'vuex'
import window from './modules/window'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    window
  },
  getters
})

export default store
