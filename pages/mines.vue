<template>
  <el-container class="mines">
    <el-main>
      <el-input v-model="mineOpt" placeholder="按顺序输入行, 列, 雷数. 并以空格隔开">
        <el-button slot="append" @click="inputClick">确定</el-button>
      </el-input>
      <div class="mineTag">
        <el-tag>列: {{mines.row}}</el-tag>
        <el-tag>行: {{mines.col}}</el-tag>
        <el-tag type="info">雷: {{mines.mines}}</el-tag>
      </div>
      <div class="mines" :style="{width: mines.row*30 + 'px'}" @mouseleave="mouseOutCeil">
        <template v-for="( colItem, colInd ) in minesNum">
          <el-tag v-for="( rowItem, rowInd ) in colItem" :id="''+colInd+'-'+rowInd" :key="''+colInd+'-'+rowInd"
            @click="ceilClick"
            :class="['s'+(isShowArr[colInd][rowInd]?showNum[colInd][rowInd]==='*'?'s':showNum[colInd][rowInd]:'')]">
            {{isShowArr[colInd][rowInd]?showNum[colInd][rowInd]:
            unSurePos[colInd][rowInd]?"?":
            ""}}
          </el-tag>
        </template>
      </div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="标记" placement="right">
        <el-button @click="setIsQues" type="primary" icon="el-icon-question" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="重置" placement="right">
        <el-button @click="reSet" type="primary" icon="el-icon-refresh" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="随机" placement="right">
        <el-button @click="randomMine" type="success" icon="el-icon-refresh-right" circle></el-button>
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
    data() {
      return {
        mineOpt: '',
        mines: {},
        minesNum: [],
        showNum: [],
        isShowArr: [],
        unSurePos: [],
        isSetQues: false,

        mouse: '' //鼠标位置
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      this.init()
      this.setBreadcrumb({
        type: 'mines',
        path: `/mines`,
        name: '扫雷游戏'
      })
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      init(col = 14, row = 20, mines = 38) {
        const arr = new Array(col * row).fill(0)
        for (let k = 0; k < mines; k++) {
          arr[k] = 1
        }
        arr.sort(function () {
          return 0.5 - Math.random()
        })
        const minesNum = []
        for (let t = 0; t < col; t++)
          minesNum.push(arr.slice(t * row, t * row + row))
        const showNum = JSON.parse(JSON.stringify(minesNum))
        const get = (i, j) => {
          if (i > -1 && i < col && j > -1 && j < row) {
            return minesNum[i][j]
          }
          return 0
        }
        for (let i = 0; i < col; i++) {
          for (let j = 0; j < row; j++) {
            if (minesNum[i][j]) {
              showNum[i][j] = '*'
              continue
            }
            showNum[i][j] =
              get(i - 1, j - 1) +
              get(i - 1, j) +
              get(i - 1, j + 1) +
              get(i + 1, j - 1) +
              get(i + 1, j) +
              get(i + 1, j + 1) +
              get(i, j - 1) +
              get(i, j + 1)
          }
        }
        const isShow = new Array(col * row).fill(0)
        const isShowArr = [],
          unSurePos = []
        for (let t = 0; t < col; t++) {
          isShowArr.push(isShow.slice(t * row, t * row + row))
          unSurePos.push(isShow.slice(t * row, t * row + row))
        }
        this.mines = { col, row, mines }
        this.minesNum = minesNum
        this.showNum = showNum
        this.isShowArr = isShowArr
        this.unSurePos = unSurePos
      },
      mouseInCeil(e) {
        let id = e.target.id
        console.log(1, id)
      },
      mouseOutCeil() {
      },
      ceilClick(e) {
        let [a, b] = e.target.id.split('-')
          ;[a, b] = [parseInt(a, 10), parseInt(b, 10)]
        if (this.isSetQues) {
          const unSurePos = this.unSurePos
          const newUnSurePos = JSON.parse(JSON.stringify(unSurePos))
          newUnSurePos[a][b] = !newUnSurePos[a][b]
          this.unSurePos = newUnSurePos
        } else if (this.minesNum[a][b]) {
          this.fail()
        } else {
          this.showArr(a, b)
        }
      },
      fail() {
        this.$message({
          message: '踩雷了, hhhhhh.....',
          type: 'error'
        })
        const isShowArr = this.isShowArr
        const newIsShowArr = JSON.parse(JSON.stringify(isShowArr))
        for (let i = 0; i < this.mines.col; i++) {
          for (let j = 0; j < this.mines.row; j++) {
            if (this.minesNum[i][j]) {
              newIsShowArr[i][j] = 1
            }
          }
        }
        this.isShowArr = newIsShowArr
      },
      showArr(a, b) {
        const { isShowArr, showNum } = this
        const newIsShowArr = JSON.parse(JSON.stringify(isShowArr))
        const show = (a, b) => {
          if (a > -1 && a < this.mines.col && b > -1 && b < this.mines.row) {
            if (newIsShowArr[a][b]) return
            newIsShowArr[a][b] = 1
            if (showNum[a][b] === 0) {
              show(a - 1, b - 1)
              show(a - 1, b)
              show(a - 1, b + 1)
              show(a + 1, b - 1)
              show(a + 1, b)
              show(a + 1, b + 1)
              show(a, b - 1)
              show(a, b + 1)
            } else {
              return
            }
          } else {
            return
          }
        }
        show(a, b)
        this.isShowArr = newIsShowArr
      },
      setIsQues() {
        this.isSetQues = !this.isSetQues
      },
      reSet() {
        const {
          mines: { col, row, mines }
        } = this
        this.init(col, row, mines)
      },
      inputClick() {
        const mineOpt = this.mineOpt
        const Arr = mineOpt.split(/[^\d]/)
        const [row, col, mines] = Arr
        this.init(...[parseInt(row), parseInt(col), parseInt(mines)])
      },
      randomMine() {
        const getRad = () => Math.floor(Math.random() * 10) + 6
        const a = [getRad(), getRad(), getRad()]
        this.init(...a)
      }
    }
  }
</script>
<style lang="scss">
  .mines {
    margin-top: 20px;

    .el-main {
      padding: 0;
      text-align: center;

      .mines {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        text-align: center;

        .el-tag {
          width: 30px;
          height: 30px;
          padding: 0;
          margin: 0;
          font-size: 16px;
          line-height: 30px;
          text-align: center;
          background: #E6A23C;

          &:hover {
            background: #67C23A
          }

          &.s0 {
            background: white;
            color: #606266
          }

          &.s1 {
            background: white;
          }

          &.s2 {
            background: white;
            color: #F56C6C
          }

          &.s3 {
            background: white;
          }

          &.s3 {
            background: white;
          }

          &.ss {
            background: #F56C6C;
          }
        }
      }

      .el-input {
        width: 67%;
        min-width: 400px;
        margin: 0 auto;
      }

      .mineTag {
        width: 67%;
        min-width: 400px;
        margin: 20px auto;
        text-align: left;

        .el-tag {
          margin: 0 20px;
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