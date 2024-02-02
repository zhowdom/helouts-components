import Vue from 'vue'
import Vuex from 'vuex'
import twosidemenu from './modules/twosidemenu'
import floatMenus from './modules/floatMenus'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    twosidemenu,
    floatMenus
  }
})

export default store
