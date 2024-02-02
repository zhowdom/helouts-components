import { CHANGE_TWOSIDEMENU } from '../mutation-types'

const state = {
  openOrfold: '',
  isType: '',
}

const mutations = {
  CHANGE_TWOSIDEMENU (state, params) {
    state.openOrfold = params.openOrFold
    state.isType = params.type
  }
}

const actions = {
  changedTwoSideMenu ({ commit }, params) {
    commit('CHANGE_TWOSIDEMENU', params)
  }
}

const getters = {
  twosidemenu: state => state.openOrfold,
  isType: state => state.isType,
}

export default {
  state,
  mutations,
  actions,
  getters
}
