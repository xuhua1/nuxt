export const state = () => ({
  hero: [
    'caocao',
    'zhangfei',
    'machao',
    'huangzhong',
    'zhaoyun',
    'guanyu',
    'zu1',
    'zu2',
    'zu3',
    'zu4'
  ],
  heroZH: {
    caocao: '曹操',
    zhangfei: '张飞',
    machao: '马超',
    huangzhong: '黄忠',
    zhaoyun: '赵云',
    guanyu: '关羽',
    zu1: '卒1',
    zu2: '卒2',
    zu3: '卒3',
    zu4: '卒4'
  },
  appearent: {
    caocao: 'rgb(255, 85, 0)',
    zhangfei: '#eb2f96',
    machao: '#52c41a',
    huangzhong: '#722ed1',
    zhaoyun: '#4169E1',
    guanyu: '#13c2c2',
    zu1: 'rgba(0,0,0,0.45)',
    zu2: 'rgba(0,0,0,0.45)',
    zu3: 'rgba(0,0,0,0.45)',
    zu4: 'rgba(0,0,0,0.45)'
  },
  klotski: {
    name: '横刀立马',
    blocks: [
      { type: 4, position: [0, 1] },
      { type: 2, position: [0, 0] },
      { type: 2, position: [0, 3] },
      { type: 2, position: [2, 0] },
      { type: 2, position: [2, 3] },
      { type: 3, position: [2, 1] },
      { type: 1, position: [3, 1] },
      { type: 1, position: [3, 2] },
      { type: 1, position: [4, 0] },
      { type: 1, position: [4, 3] }
    ]
  }
})

export const mutations = {
  setKlotski(state, payload) {
    state.klotski = payload
  }
}

export const actions = {
  setKlotski({ commit }, data) {
    commit('setKlotski', data)
  }
}
