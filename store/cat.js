export const state = () => ({
  posArr: []
})

export const mutations = {
  setPosArr(state, payload) {
    state.posArr = payload
  }
}

export const actions = {
  setPosArr({ commit }, data) {
    commit('setPosArr', data)
  }
}
