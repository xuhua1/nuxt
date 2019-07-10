function getPOS(arr, x, y) {
  const len = x * y
  const map = {}
  const posArr = [arr]
  let gotRes = false
  const sortArr = arr.sort((a, b) => a - b).join()
  while (posArr.length > 0) {
    if (gotRes) return posArr
    const first = posArr.shift()
    pos(first)
  }
  const pos = arr => {
    const mInd = arr.indexOf(len)
    const ardInd = [mInd + 1, mInd - 1, mInd - x, mInd + x]
    ardInd.forEach(item => {
      if (arr[item] > 0) {
        const newArr = arr.concat()
        ;[newArr[item], newArr[mInd]] = [newArr[mInd], newArr[item]]
        const arrStr = newArr.join()
        if (!map[arrStr]) {
          map[arrStr] = true
          posArr.push(newArr)
        }
        if (arrStr === sortArr) {
          gotRes = true
        }
      }
    })
  }
}
