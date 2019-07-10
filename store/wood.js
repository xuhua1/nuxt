export const state = () => ({
  blocks: [
    { id: '1', type: 13, position: [0, 0] },
    { id: '2', type: 21, position: [1, 2] },
    { id: '3', type: 12, position: [2, 3] },
    { id: '4', type: 31, position: [0, 5] },
    { id: '5', type: 13, position: [3, 0] },
    { id: '6', type: 21, position: [4, 2] },
    { id: '7', type: 31, position: [3, 3] },
    { id: '8', type: 12, position: [5, 4] }
  ]
})

export const mutations = {
  setPosArr(state, payload) {
    state.blocks = payload
  }
}

export const actions = {
  setPosArr({ commit }, data) {
    commit('setPosArr', data)
  }
}
