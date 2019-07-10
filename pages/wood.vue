<template>
  <el-container class="wood">
    <el-main>
      <div class="klti2">
        <div v-for="(item,index) in blocks" :style="{
            width: ''+(item.type%10)*80+'px',
            height: ''+Math.floor(item.type/10)*80+'px',
            top: ''+item.position[0] * 80+'px',
            left: ''+item.position[1] * 80 + 'px',
            lineHeight: ''+(Math.floor(item.type/10)*80)+'px',
          }" @mouseenter="mouseIn(item.position.join())"
          :class="['s'+item.type, (item.position[0]===2&&item.type===12)?'center':'','woodCard']" :key="item.id">
          {{item.type}}
          <template v-if="mouse === item.position.join()">
            <div class="top" @click="dirClick(item,-1,0)" v-show="showDir(item,'top')"></div>
            <div class="bottom" @click="dirClick(item,1,0)" v-show="showDir(item,'bottom')"></div>
            <div class="left" @click="dirClick(item,0,-1)" v-show="showDir(item,'left')"></div>
            <div class="right" @click="dirClick(item,0,1)" v-show="showDir(item,'right')"></div>
          </template>
        </div>
      </div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="跳转" placement="right">
        <el-button icon="el-icon-search" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="上一个" placement="right">
        <el-button @click="changeWood(-1)" type="primary" icon="el-icon-d-arrow-left" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="下一个" placement="right">
        <el-button @click="changeWood(1)" type="success" icon="el-icon-d-arrow-right" circle></el-button>
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
  import Wood from '../assets/js/wood'
  import axios from '../plugins/axios.js'
  export default {
    layout: 'home',
    data() {
      return {
        mousedown: [],
        mouse: null
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      this.setBreadcrumb({
        type: 'wood',
        path: `/wood`,
        name: '木板华容道'
      })
    },
    computed: {
      ...mapState('wood', ['blocks']),
      woodLay() {
        const layout = this.blocks;
        console.log(layout);
        if (!layout) {
          return null
        } else {
          const arr = [[], [], [], [], [], []]
          layout.forEach((item, index) => {
            const {
              type,
              position: [x, y]
            } = item
            switch (type) {
              case 13:
                arr[x][y] = 1;
                arr[x][y + 1] = 1;
                arr[x][y + 2] = 1;
                break
              case 21:
                arr[x][y] = 1;
                arr[x + 1][y] = 1;
                break
              case 12:
                arr[x][y] = 1;
                arr[x][y + 1] = 1;
                break;
              case 31:
                arr[x][y] = 1;
                arr[x + 1][y] = 1;
                arr[x + 2][y] = 1;
                break;
              case 13:
                arr[x][y] = 1;
                arr[x][y + 1] = 1;
                arr[x][y + 2] = 1;
                break;
              case 21:
                arr[x][y] = 1;
                arr[x + 1][y] = 1;
                break;
              case 31:
                arr[x][y] = 1;
                arr[x + 1][y] = 1;
                arr[x + 2][y] = 1;
                break;
              case 12:
                arr[x][y] = 1;
                arr[x][y + 1] = 1;
                break;
              default:
                break
            }
          })
          return arr
        }
      }
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      ...mapActions('wood', ['setPosArr']),
      changeWood() {
        this.$message({
          type: 'error',
          message: '到头了'
        })
      },
      dirClick(item, x, y) {
        const layout = this.blocks
        const newLayout = JSON.parse(JSON.stringify(layout))
        layout.forEach((layItem, index) => {
          if (JSON.stringify(item) === JSON.stringify(layItem)) {
            console.log(layItem)
            const [xx, yy] = layItem.position
            newLayout[index].position = [xx + x, yy + y]
          }
        })
        this.setPosArr(newLayout);
      },
      getResult() {
        const test = new Wood(this.blocks)
        const result = test.woodSolve()
        const resultArr = result.split(',');
        const dir = {
          L: [0, -1],
          R: [0, 1],
          U: [-1, 0],
          D: [1, 0]
        }
        resultArr.shift();
        resultArr.forEach((item, index) => {
          setTimeout(() => {
            const newBlocks = JSON.parse(JSON.stringify(this.blocks));
            const dirArr = dir[item[1]];
            const [x, y] = newBlocks[item[0]].position;
            newBlocks[item[0]].position = [x + dirArr[0], y + dirArr[1]];
            this.setPosArr(newBlocks);
          }, index * 1000);
        })
      },
      showDir(item, dir) {
        const {
          type,
          position: [xx, yy]
        } = item
        const getPos = (x, y) => {
          if (x > -1 && x < 6 && y > -1 && y < 6) {
            return !this.woodLay[x][y]
          }
          return false;
        }
        switch (type) {
          case 13:
            switch (dir) {
              case 'left':
                return getPos(xx, yy - 1)
              case 'right':
                return getPos(xx, yy + 3)
            }
            return false
          case 12:
            switch (dir) {
              case 'left':
                return getPos(xx, yy - 1)
              case 'right':
                return getPos(xx, yy + 2)
            }
            return false
          case 31:
            switch (dir) {
              case 'top':
                return getPos(xx - 1, yy)
              case 'bottom':
                return getPos(xx + 3, yy)
            }
            return false
          case 21:
            switch (dir) {
              case 'top':
                return getPos(xx - 1, yy)
              case 'bottom':
                return getPos(xx + 2, yy)
            }
            return false
        }
        return false
      },
      mouseIn(xy) {
        if (this.mouse !== xy) {
          this.mouse = xy
        }
      }
    }
  }
</script>
<style lang="scss">
  .wood {
    margin-top: 20px;

    .el-main {
      .klti2 {
        width: 480px;
        height: 480px;
        border: 1px solid purple;
        box-sizing: content-box;
        margin: 20px auto;
        position: relative;
        overflow: hidden;

        .woodCard {
          box-sizing: border-box;
          background-color: #909399;
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          user-select: none;
          cursor: pointer;
          border: 1px solid pink;
          transition: all 0.8s;

          div {
            border: #ff0 100% solid;
            /* border-radius: 40% 50% 50% 40%; */
            font-weight: bold;
            transition: opacity 0.6s;
            position: absolute;
            background: #67c23a;
            width: 100%;
            height: 100%;
            cursor: pointer;
            overflow: auto;
          }

          .top {
            height: 40px;
            top: -40px;
            left: 0;
            border-radius: 70% 70% 0 0;
          }

          .bottom {
            height: 40px;
            bottom: -40px;
            left: 0;
            border-radius: 0 0 70% 70%;
          }

          .left {
            width: 40px;
            left: -40px;
            top: 0;
            border-radius: 70% 0 0 70%;
          }

          .right {
            width: 40px;
            right: -40px;
            top: 0;
            border-radius: 0 70% 70% 0;
          }
        }

        .center {
          background: red;
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