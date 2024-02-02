import { SET_FLOAT_MENUS } from '../mutation-types'

const state = {
  floatMenus: ''
}

const mutations = {
  SET_FLOAT_MENUS (state, params) {
    state.floatMenus = params.floatMenus
    localStorage.setItem('floatMenus', JSON.stringify(params.floatMenus))
  }
}

const actions = {
  setFloatMenus ({ commit }, params) {
    commit('SET_FLOAT_MENUS', params)
  }
}

const getters = {
  floatMenus: state => state.floatMenus || JSON.parse(localStorage.getItem('floatMenus'))
}

export default {
  state,
  mutations,
  actions,
  getters
}
