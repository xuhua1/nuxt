/**
   * //参考 https://blog.csdn.net/weixin_34196559/article/details/79356847
   * 木板华容道解密算法
   * @in 木板华容道数组
   * @out 木板华容道解决过程数组
      [
        { type: 13, position: [0, 0] },
        { type: 21, position: [1, 2] },
        { type: 12, position: [2, 3] },
        { type: 31, position: [0, 5] },
        { type: 13, position: [3, 0] },
        { type: 21, position: [4, 2] },
        { type: 31, position: [3, 3] },
        { type: 12, position: [5, 4] }
      ]
   */
function Wood(woodArr = []) {
  this.woodArr = JSON.parse(JSON.stringify(woodArr))
  this.woodStateArr = []
  this.map = {}
  this.centerInd = 2
  this.centerSuccess = '1224'
}

Wood.prototype = {
  constructor: Wood,
  moveItem: function(woodItem, arr) {
    const beforeStr = woodItem ? woodItem : ''

    let beforeState = beforeStr.split(',')
    beforeState.shift()

    const newWoodStateArr = this.woodStateArr.concat()

    beforeState.forEach(item => {
      const index = parseInt(item[0])
      const dir = {
        L: [0, -1],
        R: [0, 1],
        U: [-1, 0],
        D: [1, 0]
      }
      const arr = dir[item[1]]
      const state = newWoodStateArr[index]
      const [x, y] = [parseInt(state[2]), parseInt(state[3])]
      const newState = state[0] + state[1] + (x + arr[0]) + (y + arr[1])
      newWoodStateArr[index] = newState
    })
    const newWoodStateArrStr = newWoodStateArr.join()
    if (this.map[newWoodStateArrStr]) {
      return false
    } else if (newWoodStateArr[this.centerInd] === this.centerSuccess) {
      return true
    } else {
      this.map[newWoodStateArrStr] = true
    }
    const posArr = this.checkPos(newWoodStateArr)

    for (let i = 0, len = newWoodStateArr.length; i < len; i++) {
      const item = newWoodStateArr[i]
      const [h, w, x, y] = [
        parseInt(item[0]),
        parseInt(item[1]),
        parseInt(item[2]),
        parseInt(item[3])
      ]
      if (h === 1) {
        if (posArr[x][y - 1] === 0) {
          arr.push(beforeStr + ',' + i + 'L')
        }
        if (posArr[x][y + w] === 0) {
          arr.push(beforeStr + ',' + i + 'R')
        }
      } else {
        if (posArr[x - 1] && posArr[x - 1][y] === 0) {
          arr.push(beforeStr + ',' + i + 'U')
        }
        if (posArr[x + h] && posArr[x + h][y] === 0) {
          arr.push(beforeStr + ',' + i + 'D')
        }
      }
    }
  },
  checkPos: function(woodStateArr) {
    const posItem = new Array(6).fill(0)
    const posArr = posItem.map(item => posItem.concat())

    woodStateArr.length &&
      woodStateArr.forEach(item => {
        let newItem = item.split('')
        const [h, w, x, y] = [
          parseInt(newItem[0]),
          parseInt(newItem[1]),
          parseInt(newItem[2]),
          parseInt(newItem[3])
        ]
        for (let i = 0; i < h; i++) {
          for (let j = 0; j < w; j++) {
            posArr[x + i][y + j] = 1
          }
        }
      })
    return posArr
  },
  woodSolve: function() {
    // debugger;
    const arr = []
    this.woodStateArr = this.woodArr.map(
      item => '' + item.type + item.position[0] + item.position[1]
    )
    do {
      const begin = arr.shift()
      const state = this.moveItem(begin, arr)
      if (state) {
        return begin
      }
    } while (arr.length > 0)
  }
}
export default Wood
