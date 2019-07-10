<template>
  <el-container class="cat">
    <el-main>
      <div class="cat">
        <div v-for="(rowItem,rowInd) in row" :key="rowItem +100" @click="btnClick">
          <el-button circle v-for="(colItem,colInd) in col" :key="colItem" :id="rowInd*row+colInd"
            :type="getState(rowInd,colInd)===1?'primary':getState(rowInd,colInd)===2?'danger':''"></el-button>
        </div>
      </div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="重置" placement="right">
        <el-button @click="reSet" icon="el-icon-refresh" circle></el-button>
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
    layout: 'home',
    fetch({ store, params }) {
      const posArr = new Array(80).fill(0).map((_, index) => {
        return index < 16 ? 1 : 0
      })
      posArr.sort(_ => 0.5 - Math.random())
      posArr.splice(30, 0, 2)
      store.dispatch('cat/setPosArr', posArr)
    },
    data() {
      return {
        row: 9,
        col: 9
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      this.setBreadcrumb({
        type: 'cat',
        path: `/cat`,
        name: '围住神经猫'
      })
    },
    computed: {
      ...mapState('cat', ['posArr'])
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      ...mapActions('cat', ['setPosArr']),
      getState(a, b) {
        return this.posArr[a * this.row + b]
      },
      reSet() {
        const posArr = new Array(80).fill(0).map((_, index) => {
          return index < 16 ? 1 : 0
        })
        posArr.sort(_ => 0.5 - Math.random())
        posArr.splice(30, 0, 2)
        this.setPosArr(posArr)
      },
      btnClick(e) {
        try {
          const index = Number.parseInt(e.target.id)
          const state = this.posArr[index]
          if (state) return
          const newPosArr = this.posArr.concat()
          newPosArr[index] = 1
          //this.setPosArr(newPosArr)
          const result = this.moveCat(newPosArr)
          let rightRoad, type
          if (typeof result === 'object') {
            let minRoad = result[0]
            result.forEach(item => {
              if (minRoad.length > item.length) {
                minRoad = item
              }
            })
            rightRoad = minRoad.slice(1).split(',')
            if (rightRoad.length === 2) {
              this.$message({
                message: '你输了',
                type: 'error'
              })
            }
          } else {
            rightRoad = result.slice(1).split(',')
            if (rightRoad.length === 1) {
              this.$message({
                message: '你赢了',
                type: 'success'
              })
            }
          }
          if (rightRoad.length > 1) {
            const [x, y] = [rightRoad[0], rightRoad[1]]
              ;[newPosArr[x], newPosArr[y]] = [newPosArr[y], newPosArr[x]]
          }
          this.setPosArr(newPosArr)
        } catch (error) {
          console.log(error)
        }
      },
      moveCat(newPosArr) {
        const index = newPosArr.indexOf(2)
        const indexArr = [',' + index],
          resArr = []
        const map = {},
          { col, row } = this
        let maxRoad = ''
        while (indexArr.length) {
          const first = indexArr.shift()
          if (first.length > maxRoad.length) {
            maxRoad = first
          }
          posFun(first)
        }
        if (resArr.length) {
          return resArr
        } else {
          return maxRoad
        }
        function posFun(index) {
          const last = index.match(/,\d+$/)[0].replace(/[^\d]/, '')
          const lastNum = parseInt(last, 10)
          const upy = Math.floor(lastNum / col) % 2 ? 1 : -1

          const sixArr = [
            lastNum + row,
            lastNum + row + upy,
            lastNum - row,
            lastNum - row + upy,
            lastNum + 1,
            lastNum - 1
          ]
          for (let i = 0, len = sixArr.length; i < len; i++) {
            const item = sixArr[i]
            const road = index + ',' + item
            if (!newPosArr[item]) {
              const [x, y] = [Math.floor(item / col), item % col]
              if (!x || !y || x === row - 1 || y === col - 1) {
                resArr.push(road)
              } else {
                if (!map[item]) {
                  indexArr.push(road)
                  map[item] = true
                }
              }
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .cat {
    margin-top: 20px;

    .el-main {
      .cat {
        margin: 20px auto;
        text-align: center;
        font-size: 0;

        div {
          width: 450px;
          height: 50px;
          margin: 0 auto;

          .el-button {
            width: 50px;
            height: 50px;
            margin: 0px;
          }
        }

        div:nth-child(2n) {
          position: relative;
          left: 25px;
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