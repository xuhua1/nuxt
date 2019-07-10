export const state = () => ({
  bookArr: [],
  bookInfo: {},
  total: 0,
  index: 1,
  pageSize: 10
})

export const mutations = {
  setBookArr(state, payload) {
    state.bookArr = payload
  },
  setBookInfo(state, payload) {
    state.bookInfo = payload
  },
  setTotal(state, payload) {
    state.total = payload
  },
  setIndex(state, payload) {
    state.index = payload
  }
}

export const actions = {
  setBookArr({ commit }, data) {
    commit('setBookArr', data)
  },
  setBookInfo({ commit }, data) {
    commit('setBookInfo', data)
  },
  setTotal({ commit }, data) {
    commit('setTotal', data)
  },
  setIndex({ commit }, data) {
    commit('setIndex', data)
  }
}
