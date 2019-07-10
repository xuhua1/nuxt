export const state = () => ({
  logicArr: [],
  logicInfo: {},
  total: 0,
  index: 1,
  pageSize: 10
})

export const mutations = {
  setLogicArr(state, payload) {
    state.logicArr = payload
  },
  setLogicInfo(state, payload) {
    state.logicInfo = payload
  },
  setTotal(state, payload) {
    state.total = payload
  },
  setIndex(state, payload) {
    state.index = payload
  }
}

export const actions = {
  setLogicArr({ commit }, data) {
    commit('setLogicArr', data)
  },
  setLogicInfo({ commit }, data) {
    commit('setLogicInfo', data)
  },
  setTotal({ commit }, data) {
    commit('setTotal', data)
  },
  setIndex({ commit }, data) {
    commit('setIndex', data)
  }
}
