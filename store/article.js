export const state = () => ({
  article: '',
  titleArr: [],
  index: 0,
  pageSize: 10,
  total: 0,
  type: ''
})

export const mutations = {
  setArticle(state, payload) {
    state.article = payload
  },
  setTitleArr(state, payload) {
    state.titleArr = payload
  },
  setIndex(state, payload) {
    state.index = payload
  },
  setTotal(state, payload) {
    state.total = payload
  },
  setType(state, payload) {
    state.type = payload
  }
}

export const actions = {
  setArticle({ commit }, data) {
    commit('setArticle', data)
  },
  setTitleArr({ commit }, data) {
    commit('setTitleArr', data)
  },
  setIndex({ commit }, data) {
    commit('setIndex', data)
  },
  setTotal({ commit }, data) {
    commit('setTotal', data)
  },
  setType({ commit }, data) {
    commit('setType', data)
  }
}
