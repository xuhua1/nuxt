/**
 * 数独生成与解密算法，
 * 难度等级，
 * 数独生成器 //对角三个宫先排列，再生成数组
 * 解析器   // 解数独
 * 挖洞算法 唯一解 // 每次挖一个洞，1-9剩余数解看有没有结果, 每个洞最多被挖一次
 */
/*
function Sudo() {
  this.SudoArr = [] // 数独数组,
  this.dibbleArr = []
  this.row = 9
  this.col = 9
  this.beginFill = [10, 40, 70]
  this.centerArr = [10, 13, 16, 37, 40, 43, 64, 67, 70]
}
Sudo.prototype = {
  constructor: Sudo,
  dibble: function(num = 3) {
    //debugger;
    const arrLen = this.SudoArr.length
    this.dibbleArr = this.SudoArr.concat()
    if (arrLen !== 81) return
    const map = {}
    const ram = this.getRandomNum(arrLen)
    this.dibbleArr[ram] = 0
    map[ram] = true
    const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = 1; i < num; i++) {
      const random = this.getRandomNum(arrLen)
      if (!map[random]) {
        map[random] = true
        const ind = this.dibbleArr[random]
        let temp = false
        const newNumArr = numberArr.filter(item => item != ind)

        for (let j = 0, len = newNumArr.length; j < len; j++) {
          const item = newNumArr[j]
          this.dibbleArr[random] = item
          if (this.checkSolve()) {
            temp = true
            continue
          }
        }
        if (temp) {
          this.dibbleArr[random] = ind
          continue
        }
        this.dibbleArr[random] = 0
        console.log(this.dibbleArr)
      }
    }
    return this.dibbleArr
  },
  /* checkSudoArr: function(index) {
      const val = this.dibbleArr[index]
      for (let i = 1; i < this.row + 1; i++) {
        if (i !== val) {
          this.dibbleArr[index] = i
          this.checkSolve()
        }
      }
    },*/
/*
  checkSolve: function() {
    const indexArr = []
    const map = {}
    const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.dibbleArr.forEach((item, index) => {
      if (!item) {
        indexArr.push(index)
        const newNumber = numberArr.filter(item => item !== this.SudoArr[index])
        map[index] = newNumber.map(item => ',' + item)
      }
    })
    const first = indexArr[0]
    const arr = map[first].filter(item => this.checkPos(item, indexArr))
    const that = this
    const addNext = function(begin) {
      const nextIndex = begin.match(/,/g).length
      const nextArr = map[indexArr[nextIndex]]
      if (nextArr) {
        nextArr.forEach(item => {
          const addItem = begin + item
          if (that.checkPos(addItem, indexArr)) {
            arr.push(addItem)
          }
        })
      } else {
        if (that.checkResult(begin, indexArr)) {
          return true
        }
      }
    }
    while (arr.length > 0) {
      const begin = arr.shift()
      addNext(begin)
    }
    return false
  },
  checkResult: function(begin, indexArr) {
    const arr = begin.split(',').filter(item => item != '')
    const newDibbleArr = this.dibbleArr.concat()
    indexArr.forEach((item, index) => {
      if (arr[index]) {
        newDibbleArr[item] = Number.parseInt(arr[index], 10)
      }
    })
    if (this.checkSudoResult(newDibbleArr)) {
      return true
    }
    return false
  },
  checkSudoResult: function(sudoArr) {
    for (let i = 0; i < this.row; i++) {
      let total1 = 0,
        total2 = 0,
        total3 = 0
      for (let j = 0; j < this.col; j++) {
        total1 += sudoArr[i * this.row + j]
        total2 += sudoArr[j * this.row + i]
        total3 +=
          sudoArr[
            (Math.floor(i / 3) * 3 + Math.floor(j / 3)) * this.row + (j % 3)
          ]
      }
      if ((total1 !== 45) | (total2 !== 45) | (total3 !== 45)) {
        return false
      }
    }
    return true
  },
  checkPos: function(addItem, indexArr) {
    const arr = addItem.split(',').filter(item => item != '')
    const newDibbleArr = this.dibbleArr.concat()
    indexArr.forEach((item, index) => {
      if (arr[index]) {
        newDibbleArr[item] = arr[index]
      }
    })

    const last = indexArr[arr.length - 1]
    const [x, y] = [Math.floor(last / this.row), last % this.row]
    const [gongX, gongY] = [Math.floor(x / 3) * 3, Math.floor(y / 3) * 3]
    for (let m = gongX; m < gongX + 3; m++) {
      for (let n = gongY; n < gongY + 3; n++) {
        const mn = m * this.row + n
        const num = this.SudoArr[mn]
        if (num && num === last) return false
      }
    }
    for (let j = x * this.row; j < (x + 1) * this.row; j++) {
      const num = this.SudoArr[Number.parseInt(j)]
      if (num && num === last) return false
    }
    for (let k = y; k < this.row * this.col - 1; k = k + this.row) {
      const num = this.SudoArr[Number.parseInt(k)]
      if (num && num === last) return false
    }
    return true
  },
  createSudoArr: function() {
    this.SudoArr = []
    this.beginFill.forEach(item => {
      this.setThird(item)
    })
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let c = 0, len = this.centerArr.length; c < len; c++) {
      const xy = this.centerArr[c]
      if (!this.SudoArr[xy]) {
        const indexArr = [
          xy - 1,
          xy,
          xy + 1,
          xy - 10,
          xy - 9,
          xy - 8,
          xy + 8,
          xy + 9,
          xy + 10
        ]
        const mapNum = []
        for (let k = 0, len = indexArr.length; k < len; k++) {
          const item = indexArr[k]
          const fillNum = this.fillArr(item, mapNum)
          if (!fillNum) {
            this.createSudoArr()
            return
          }
          mapNum.push(fillNum)
        }
      }
    }
  },
  fillArr: function(i, mapNum) {
    const tempArr = new Array(this.col + 1).fill(0)
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [x, y] = [Math.floor(i / this.row), i % this.row]
    mapNum.forEach(item => {
      tempArr[item] = 1
    })
    for (let j = x * this.row; j < (x + 1) * this.row; j++) {
      const num = this.SudoArr[Number.parseInt(j)]
      if (numArr.indexOf(num) > -1) {
        tempArr[num] = 1
      }
    }
    for (let k = y; k < this.row * this.col - 1; k = k + this.row) {
      const num = this.SudoArr[Number.parseInt(k)]
      if (numArr.indexOf(num) > -1) {
        tempArr[num] = 1
      }
    }
    const newNumArr = []
    tempArr.forEach((item, index) => {
      if (index > 0) {
        if (!item) {
          newNumArr.push(index)
        }
      }
    })
    const fillNum = newNumArr[this.getRandomNum(newNumArr.length)]
    this.SudoArr[i] = fillNum
    return fillNum
  },
  setThird: function(xy) {
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.randomSort(numArr)
    this.randomSort(numArr)
    const indexArr = [
      xy - 1,
      xy,
      xy + 1,
      xy - 10,
      xy - 9,
      xy - 8,
      xy + 8,
      xy + 9,
      xy + 10
    ]
    indexArr.forEach((item, index) => {
      this.SudoArr[item] = numArr[index]
    })
  },
  randomSort: function(numArr) {
    for (let i = 0, len = numArr.length; i < len; i++) {
      const radnNum = this.getRandomNum(len)
      ;[numArr[i], numArr[radnNum]] = [numArr[radnNum], numArr[i]]
    }
  },
  getRandomNum: function(b, a = 0) {
    return Math.floor(Math.random() * (b - a)) + a
  }
}*/

/**
 * 数独生成与解密算法，
 * 难度等级，
 * 数独生成器 //对角三个宫先排列，再生成数组
 * 解析器   // 解数独
 * 挖洞算法 唯一解 // 每次挖一个洞，1-9剩余数解看有没有结果, 每个洞最多被挖一次
 */
function Sudo() {
  this.SudoArr = [] // 数独数组,
  this.dibbleArr = []
  this.number = 0
  this.row = 9
  this.col = 9
  this.beginFill = [10, 40, 70]
  this.centerArr = [10, 13, 16, 37, 40, 43, 64, 67, 70]
}
Sudo.prototype = {
  constructor: Sudo,
  dibble: function(num = 3) {
    const arrLen = this.SudoArr.length
    const randomArr = new Array(arrLen)
      .fill(0)
      .map((_, ind) => ind)
      .sort(_ => 0.5 - Math.random())
    this.dibbleArr = this.SudoArr.concat()
    if (arrLen !== 81) return
    const ram = this.getRandomNum(arrLen)
    this.dibbleArr[ram] = 0
    const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const map = {}
    for (let ij = 0; ij < num; ij++) {
      j = randomArr[ij]
      if (this.dibbleArr[j] && !map[j]) {
        const ind = this.dibbleArr[j]
        const newNumArr = numberArr.filter(item => item !== ind)
        let temp = false
        for (let k = 0, len = newNumArr.length; k < len; k++) {
          const item = newNumArr[k]
          this.dibbleArr[j] = item
          if (this.checkSolve()) {
            temp = true
            break
          }
        }
        if (temp) {
          map[j] = 1
          this.dibbleArr[j] = ind
        } else {
          this.dibbleArr[j] = 0
          this.number++
        }
      }
    }
    return this.dibbleArr
  },
  /* checkSudoArr: function(index) {
      const val = this.dibbleArr[index]
      for (let i = 1; i < this.row + 1; i++) {
        if (i !== val) {
          this.dibbleArr[index] = i
          this.checkSolve()
        }
      }
    },*/
  checkSolve: function() {
    const indexArr = []
    const map = {}
    const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const numStrArr = numberArr.map(item => ',' + item)

    this.dibbleArr.forEach((item, index) => {
      if (!item) {
        indexArr.push(index)
      }
    })
    const arr = numStrArr.filter(item => this.checkPos(item, indexArr))
    const that = this
    const addNext = function(begin) {
      const nextIndex = begin.match(/,/g).length
      const nextArr = numStrArr.concat()
      if (nextIndex < indexArr.length) {
        nextArr.forEach(item => {
          const addItem = begin + item
          if (that.checkPos(addItem, indexArr)) {
            arr.push(addItem)
          }
        })
      } else {
        if (that.checkResult(begin, indexArr)) {
          return true
        }
      }
    }
    while (arr.length > 0) {
      const begin = arr.shift()
      if (addNext(begin)) {
        return true
      }
    }
    return false
  },
  checkResult: function(begin, indexArr) {
    const arr = begin.split(',').filter(item => item != '')
    const newDibbleArr = this.dibbleArr.concat()
    indexArr.forEach((item, index) => {
      if (arr[index]) {
        newDibbleArr[item] = Number.parseInt(arr[index], 10)
      }
    })
    if (this.checkSudoResult(newDibbleArr)) {
      return true
    }
    return false
  },
  checkSudoResult: function(sudoArr) {
    for (let i = 0; i < this.row; i++) {
      let total1 = 0,
        total2 = 0,
        total3 = 0
      for (let j = 0; j < this.col; j++) {
        total1 += sudoArr[i * this.row + j]
        total2 += sudoArr[j * this.row + i]
        total3 +=
          sudoArr[
            (Math.floor(i / 3) * 3 + Math.floor(j / 3)) * this.row + (j % 3)
          ]
      }
      if ((total1 !== 45) | (total2 !== 45) | (total3 !== 45)) {
        return false
      }
    }
    return true
  },
  checkPos: function(addItem, indexArr) {
    const arr = addItem.split(',').filter(item => item != '')
    const newDibbleArr = this.dibbleArr.concat()
    indexArr.forEach((item, index) => {
      if (arr[index]) {
        newDibbleArr[item] = parseInt(arr[index])
      }
    })

    const last = indexArr[arr.length - 1]
    const [x, y] = [Math.floor(last / this.row), last % this.row]
    const [gongX, gongY] = [Math.floor(x / 3) * 3, Math.floor(y / 3) * 3]
    let tepp = 0
    for (let m = gongX; m < gongX + 3; m++) {
      for (let n = gongY; n < gongY + 3; n++) {
        const mn = m * this.row + n
        const num = newDibbleArr[mn]
        if (num && num === newDibbleArr[last]) {
          tepp++
        }
      }
    }
    if (tepp === 2) {
      return false
    } else {
      tepp = 0
    }
    for (let j = x * this.row; j < (x + 1) * this.row; j++) {
      const num = newDibbleArr[Number.parseInt(j)]
      if (num && num === newDibbleArr[last]) {
        tepp++
      }
    }
    if (tepp === 2) {
      return false
    } else {
      tepp = 0
    }
    for (let k = y; k < this.row * this.col - 1; k = k + this.row) {
      const num = newDibbleArr[Number.parseInt(k)]
      if (num && num === newDibbleArr[last]) {
        tepp++
      }
    }
    if (tepp === 2) {
      return false
    } else {
      return true
    }
  },
  createSudoArr: function() {
    this.SudoArr = []
    this.beginFill.forEach(item => {
      this.setThird(item)
    })
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let c = 0, len = this.centerArr.length; c < len; c++) {
      const xy = this.centerArr[c]
      if (!this.SudoArr[xy]) {
        const indexArr = [
          xy - 1,
          xy,
          xy + 1,
          xy - 10,
          xy - 9,
          xy - 8,
          xy + 8,
          xy + 9,
          xy + 10
        ]
        const mapNum = []
        for (let k = 0, len = indexArr.length; k < len; k++) {
          const item = indexArr[k]
          const fillNum = this.fillArr(item, mapNum)
          if (!fillNum) {
            this.createSudoArr()
            return
          }
          mapNum.push(fillNum)
        }
      }
    }
  },
  fillArr: function(i, mapNum) {
    const tempArr = new Array(this.col + 1).fill(0)
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [x, y] = [Math.floor(i / this.row), i % this.row]
    mapNum.forEach(item => {
      tempArr[item] = 1
    })
    for (let j = x * this.row; j < (x + 1) * this.row; j++) {
      const num = this.SudoArr[Number.parseInt(j)]
      if (numArr.indexOf(num) > -1) {
        tempArr[num] = 1
      }
    }
    for (let k = y; k < this.row * this.col - 1; k = k + this.row) {
      const num = this.SudoArr[Number.parseInt(k)]
      if (numArr.indexOf(num) > -1) {
        tempArr[num] = 1
      }
    }
    const newNumArr = []
    tempArr.forEach((item, index) => {
      if (index > 0) {
        if (!item) {
          newNumArr.push(index)
        }
      }
    })
    const fillNum = newNumArr[this.getRandomNum(newNumArr.length)]
    this.SudoArr[i] = fillNum
    return fillNum
  },
  setThird: function(xy) {
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.randomSort(numArr)
    this.randomSort(numArr)
    const indexArr = [
      xy - 1,
      xy,
      xy + 1,
      xy - 10,
      xy - 9,
      xy - 8,
      xy + 8,
      xy + 9,
      xy + 10
    ]
    indexArr.forEach((item, index) => {
      this.SudoArr[item] = numArr[index]
    })
  },
  randomSort: function(numArr) {
    for (let i = 0, len = numArr.length; i < len; i++) {
      const radnNum = this.getRandomNum(len)
      ;[numArr[i], numArr[radnNum]] = [numArr[radnNum], numArr[i]]
    }
  },
  getRandomNum: function(b, a = 0) {
    return Math.floor(Math.random() * (b - a)) + a
  }
}
const getData = num => {
  try {
    const sudo = new Sudo()
    sudo.createSudoArr()
    const dataArr = sudo.SudoArr
    const dibble = sudo.dibble(num)

    const data = {}
    const resData = {}
    for (let i = 0, len = dataArr.length; i < len; i++) {
      const item = dibble[i]
      data['' + i] = item === 0 ? '' : item
      const resItem = dataArr[i]
      resData['' + i] = resItem
    }
    return { resData, data }
  } catch (error) {
    return getData(num)
  }
}
module.exports = getData
