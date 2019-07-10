import axios from '../plugins/axios'
export const state = () => ({
  breadcrumb: [],
  sleInd: 0,
  pageItems: {},
  showComment: false,
  commentList: [
    {
      _id: 12,
      nickname: '12',
      time: '134343535',
      content: '内容'
    },
    {
      _id: 1223,
      nickname: '1232',
      time: '134343535',
      content: '内容'
    },
    {
      _id: 123,
      nickname: '12232',
      time: '134343535',
      content: '内容'
    }
  ],
  routePath: '',
  seo: {
    title: '',
    keywords: '',
    description: ''
  },
  token: ''
})

export const mutations = {
  setData(state, payload) {
    let newBreadcrumb = JSON.parse(JSON.stringify(state.breadcrumb))
    newBreadcrumb = newBreadcrumb.filter(item => item.type !== payload.type)
    if (state.breadcrumb.length < 7) {
      state.breadcrumb = [...newBreadcrumb, payload]
    } else {
      state.breadcrumb = newBreadcrumb.slice(1).concat(payload)
    }
  },
  setShowComment(state) {
    state.showComment = !state.showComment
  },
  addComment(state, payload) {
    state.commentList = [payload, ...state.commentList]
  },
  setCommentList(state, payload) {
    state.commentList = payload.commentList
    state.routePath = payload.routePath
  },
  setPageItems(state, payload) {
    state.pageItems = payload
  },
  setSleInd(state, payload) {
    state.sleInd = payload
  },
  setItems(state, payload) {
    state.setItems = payload
  }
}

export const actions = {
  setBreadcrumb({ commit }, data) {
    commit('setData', data)
  },
  setPageItems({ commit }, data) {
    commit('setPageItems', data)
  },
  setShowComment({ commit }) {
    commit('setShowComment')
  },
  async setCommentList({ commit }, data) {
    const routePath = data
    const result = await axios.get('/api/comment/getbyroute', {
      params: {
        routePath
      }
    })
    commit('setCommentList', {
      routePath,
      commentList: result.data.commentList
    })
  },
  setSleInd({ commit }, data) {
    commit('setSleInd', data)
  },
  addComment({ commit }, data) {
    commit('addComment', data)
  }
}
