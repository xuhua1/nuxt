/**
 * 数字华容道
 * @input numberArr [6, 11, 3, 4, 9, 1, 7, 8, 14, 13, 2, 12, 5, 16, 10, 15]
 * //时间太长未解决问题
 */
function Num(numberArr) {
  this.numArr = numberArr
  this.orderArrStr = this.numArr
    .concat()
    .sort((a, b) => a - b)
    .join()
}
Num.prototype = {
  constructor: Number,
  checkSolve: function() {
    const arr = []
    const map = {}
    const swap = (a, b, arr) => {
      ;[arr[a], arr[b]] = [arr[b], arr[a]]
    }

    const checkBegin = begin => {
      const beforeStr = begin ? begin : ''
      const newNumArr = this.numArr.concat()

      const beforeArr = beforeStr.split(',')
      beforeArr.shift()
      beforeArr.forEach(item => {
        const index = newNumArr.indexOf(16)
        swap(item, index, newNumArr)
      })
      if (newNumArr.join() === this.orderArrStr) {
        return begin
      }

      const index = newNumArr.indexOf(16)
      const dir = [index - 1, index + 1, index - 4, index + 4]

      if (dir[0] % 4 === 3) dir[0] = -1
      if (dir[1] % 4 === 0) dir[1] = -1
      dir.forEach(item => {
        if (item >= 0 && item < 16) {
          arr.push(',' + item)
        }
      })
    }
    do {
      const begin = arr.shift()
      checkBegin(begin)
    } while (arr.length > 0)
  }
}
export default Num
