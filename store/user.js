import axios from '~/plugins/axios'

export const state = () => ({
  user: {},
  page: {}
})

export const mutations = {
  setData(state, payload) {
    state[payload.key] = payload.value
  }
}
export const actions = {
  async register({ commit }, data) {
    return await axios.post('/api/register', data)
  },
  async login({ commit }, data) {
    const resData = await axios.post('/api/login', data)
    const { type } = resData.data
    if (type === 'yes') {
      commit('setData', {
        key: 'user',
        value: {
          nickName: data.nickName
        }
      })
      return {
        type
      }
    } else {
      return {
        type
      }
    }
  }
}
