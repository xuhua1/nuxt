<template>
  <el-container class="klotski3">
    <el-main>
      <div class="klti3" @click="cardClick" :style="{width:col*120+'px',height:row*120+'px'}">
        <el-card v-for="(item,index) in col*row" :class="item===col*row?'last':''" :key="item+index" :style="{
            top: getXY(item).x,
            left: getXY(item).y
          }">{{item}}</el-card>
      </div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="随机重置" placement="right">
        <el-button @click="reSet" icon="el-icon-refresh" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="回复初始" placement="right">
        <el-button @click="reSetBefore" icon="el-icon-refresh" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="解密" placement="right">
        <el-button @click="getResult" type="success" icon="el-icon-question" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="评论" placement="right">
        <el-button @click="setShowComment" type="success" icon="el-icon-edit-outline" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    fetch({ store, params }) {
      const posArr = new Array(4 * 4).fill(0).map((_, index) => {
        return index + 1
      })
      store.dispatch('klotski3/setPosArr', posArr)
    },
    layout: 'home',
    data() {
      return {
        col: 4,
        row: 4,
        orderArr: [],
        initArr: []
      }
    },
    computed: {
      ...mapState('klotski3', ['posArr'])
    },
    created() {
      console.log(this.posArr)
    },
    mounted() {
      this.setCommentList(this.$route.path)
      setTimeout(() => {
        this.init()
      }, 1000)
      this.setBreadcrumb({
        type: 'klotski3',
        path: `/klotski3`,
        name: '数字华容道'
      })
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      ...mapActions('klotski3', ['setPosArr']),
      getXY(item) {
        const pos = this.posArr.indexOf(item)
        const x = Math.floor(pos / this.col)
        const y = pos - x * this.col
        return {
          x: '' + x * 120 + 'px',
          y: '' + y * 120 + 'px'
        }
      },
      getResult() {
        const len = this.orderArr.length
        for (let i = 0; i < len; i++) {
          setTimeout(() => {
            this.setPosArr(this.orderArr[i])
          }, (len - i - 1) * 500)
        }
      },
      init() {
        const last = this.posArr.length
        const { col, row } = this
        const map = {}
        let step = 0
        let beforeArr = this.posArr.concat()
        const orderArr = []
        orderArr.push(this.posArr.concat());
        while (step < 60) {
          const newlayArr = beforeArr.concat()
          const lastInd = newlayArr.indexOf(last)
          const arr = [lastInd + 1, lastInd - 1, lastInd + col, lastInd - col]
          if (arr[0] % this.col === 0) {
            arr[0] = -1
          }
          if (arr[1] % this.col === this.col - 1) {
            arr[1] = -1
          }
          const randomInd = Math.floor(Math.random() * 4)
          const index = arr[randomInd]
          if (newlayArr[index]) {
            ;[newlayArr[lastInd], newlayArr[index]] = [
              newlayArr[index],
              newlayArr[lastInd]
            ]
            const layArrStr = newlayArr.join()
            if (!map[layArrStr]) {
              map[layArrStr] = true
              beforeArr = newlayArr
              orderArr.push(newlayArr)
              step++
            }
          }
        }
        this.orderArr = orderArr
        this.initArr = beforeArr
        this.setPosArr(beforeArr)
      },
      reSetBefore() {
        this.setPosArr(this.initArr)
      },
      reSet(e, x = 4, y = 4) {
        const posArr = new Array(x * y).fill(0).map((_, index) => {
          return index + 1
        })
        posArr.sort(() => 0.5 - Math.random())
        this.setPosArr(posArr)
        this.col = x
        this.row = y
      },
      cardClick(e) {
        const id = e.target.innerHTML
        const idNum = parseInt(id, 10)
        if (Number.isNaN(idNum)) return
        const pId = this.posArr.indexOf(idNum)
        const arr = [pId + 1, pId - 1, pId + 4, pId - 4]
        const newPArr = this.posArr.concat()
        arr.forEach(item => {
          if (newPArr[item] === this.row * this.col) {
            ;[newPArr[item], newPArr[pId]] = [newPArr[pId], newPArr[item]]
          }
        })
        this.setPosArr(newPArr)
      }
    }
  }
</script>
<style lang="scss">
  .klotski3 {
    margin-top: 20px;

    .el-main {
      .klti3 {
        border: 1px solid purple;
        box-sizing: border-box;
        margin: 20px auto;
        position: relative;
        text-align: center;

        .el-card {
          width: 120px;
          height: 120px;
          cursor: pointer;
          box-sizing: border-box;
          font-size: 30px;
          line-height: 80px;
          background-color: #67c23a;
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0.8s;
        }

        .last {
          background-color: white;
          z-index: -1;
        }
      }
    }

    .el-aside {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .el-button {
        margin: 10px;
      }
    }
  }
</style>