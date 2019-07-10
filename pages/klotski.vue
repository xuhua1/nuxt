<template>
  <el-container class="klotski">
    <el-main>
      <el-tag>{{klotski.name}}</el-tag>
      <section class="klotski">
        <div v-for="(item,index) in (klolayout||klotski.blocks)"
          :class="'s'+(item.type>2?item.type-2:item.type)+(item.type>2?2:1)+ ' block'" :key="index"
          :id="item.position.join()" @mouseenter="mouseIn" :style="{
            background: appearent[hero[index]],
            top:''+item.position[0]*100+'px',
            left:''+ item.position[1]*100+'px',
            }">
          {{heroZH[hero[index]]}}
          <template v-if="mouse === item.position.join()">
            <div class="top" @click="dirClick(item,-1,0)" v-show="showDir(item,'top')"></div>
            <div class="bottom" @click="dirClick(item,1,0)" v-show="showDir(item,'bottom')"></div>
            <div class="left" @click="dirClick(item,0,-1)" v-show="showDir(item,'left')"></div>
            <div class="right" @click="dirClick(item,0,1)" v-show="showDir(item,'right')"></div>
          </template>
        </div>
      </section>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="上一个" placement="right">
        <el-button @click='changeKlotski(-1)' type="primary" icon="el-icon-d-arrow-left" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="下一个" placement="right">
        <el-button @click='changeKlotski(1)' type="success" icon="el-icon-d-arrow-right" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="解密" placement="right">
        <el-button @click="getResult" type="success" icon="el-icon-question" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="暂停" placement="right">
        <el-button @click="stopResult" type="success" icon="el-icon-video-pause" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="评论" placement="right">
        <el-button type="success" icon="el-icon-edit-outline" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import KlotskiResult from '../assets/js/klotski'
  import axios from '../plugins/axios.js'
  export default {
    layout: 'home',
    data() {
      return {
        klolayout: null,
        mouse: null,
        id: 0,
      }
    },
    computed: {
      ...mapState('klotski', ['hero', 'appearent', 'klotski', 'heroZH']),
      klolayoutArr() {
        const layout = this.klolayout || this.klotski.blocks
        if (!layout) {
          return null
        } else {
          const arr = [[], [], [], [], []]
          layout.forEach((item, index) => {
            const {
              type,
              position: [x, y]
            } = item
            switch (type) {
              case 4:
                arr[x][y] = 1
                arr[x + 1][y] = 1
                arr[x][y + 1] = 1
                arr[x + 1][y + 1] = 1
                break
              case 2:
                arr[x][y] = 1
                arr[x + 1][y] = 1
                break
              case 3:
                arr[x][y] = 1
                arr[x][y + 1] = 1
                break;
              case 1:
                arr[x][y] = 1
                break;
              default:
                break
            }
          })
          return arr
        }
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      this.klolayout = this.klotski.blocks
      this.setBreadcrumb({
        type: 'klotski',
        path: `/klotski`,
        name: '华容道'
      })
    },
    beforeDestroy() {
      clearInterval(this.resInterval)
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      ...mapActions('klotski', ['setKlotski']),
      async changeKlotski(i) {
        const data = await axios.get('/api/klotski/getbytype', {
          params: {
            id: this.id + i,
          }
        });
        if (data.data) {
          this.id = this.id + i;
          this.setKlotski(data.data)
          this.klolayout = data.data.blocks;
        } else {
          this.$message({
            type: 'warning',
            message: '到头了'
          })
        }
      },
      mouseIn(e) {
        const xy = e.target.id
        console.log(xy, this.mouse)
        if (this.mouse !== xy) {
          this.mouse = xy
        }
      },
      dirClick(item, x, y) {
        const layout = this.klolayout || this.klotski.blocks
        const newLayout = JSON.parse(JSON.stringify(layout))
        layout.forEach((layItem, index) => {
          if (JSON.stringify(item) === JSON.stringify(layItem)) {
            console.log(layItem)
            const [xx, yy] = layItem.position
            newLayout[index].position = [xx + x, yy + y]
          }
        })
        this.klolayout = newLayout
      },
      showDir(item, dir) {
        const klolayoutArr = this.klolayoutArr
        const [xx, yy] = item.position
        const getPos = (x, y) => {
          if (x > -1 && x < 5 && y > -1 && y < 4) {
            return !klolayoutArr[x][y]
          }
          return false
        }
        try {
          switch (item.type) {
            case 4:
              switch (dir) {
                case 'top':
                  return getPos(xx - 1, yy) && getPos(xx - 1, yy + 1)
                case 'left':
                  return getPos(xx, yy - 1) && getPos(xx + 1, yy - 1)
                case 'bottom':
                  return getPos(xx + 2, yy) && getPos(xx + 2, yy + 1)
                case 'right':
                  return getPos(xx, yy + 2) && getPos(xx + 1, yy + 2)
              }
              return false
            case 2:
              switch (dir) {
                case 'top':
                  return getPos(xx - 1, yy)
                case 'left':
                  return getPos(xx, yy - 1) && getPos(xx + 1, yy - 1)
                case 'bottom':
                  return getPos(xx + 2, yy)
                case 'right':
                  return getPos(xx, yy + 1) && getPos(xx + 1, yy + 1)
              }
              return false
            case 3:
              switch (dir) {
                case 'top':
                  return getPos(xx - 1, yy) && getPos(xx - 1, yy + 1)
                case 'left':
                  return getPos(xx, yy - 1)
                case 'bottom':
                  return getPos(xx + 1, yy) && getPos(xx + 1, yy + 1)
                case 'right':
                  return getPos(xx, yy + 2)
              }
              return false
            case 1:
              switch (dir) {
                case 'top':
                  return getPos(xx - 1, yy)
                case 'left':
                  return getPos(xx, yy - 1)
                case 'bottom':
                  return getPos(xx + 1, yy)
                case 'right':
                  return getPos(xx, yy + 1)
              }
              return false
            default:
              return false
          }
        } catch (error) {
          return false
        }
      },
      stopResult() {
        clearInterval(this.resInterval)
      },
      beginMotion(result) {
        const directions = [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: -1 },
          { x: -1, y: 0 }
        ]
        const res = result.reverse()
        let idx = 0
        this.resInterval = setInterval(() => {
          const { klolayout } = this
          const newLayout = JSON.parse(JSON.stringify(klolayout))
          const bx =
            newLayout[res[idx].blockIdx].position[0] +
            directions[res[idx].dirIdx].y
          const by =
            newLayout[res[idx].blockIdx].position[1] +
            directions[res[idx].dirIdx].x
          newLayout[res[idx].blockIdx].position = [bx, by]
          this.klolayout = newLayout
          if (!res[idx + 1]) {
            clearInterval(this.resInterval)
          } else {
            idx += 1
          }
        }, 1000)
      },
      getResult() {
        if (!this.resInterval) {
          this.mouse = ''
          const klotskiResult = new KlotskiResult()
          const result = klotskiResult.solve(this.klolayout, {
            useMirror: true
          })
          this.beginMotion(result)
        }
      }
    }
  }
</script>
<style lang="scss">
  .klotski {
    margin-top: 20px;

    .el-main {
      text-align: center;

      .el-tag {
        font-size: 33px;
      }

      .klotski {
        width: 400px;
        height: 500px;
        margin: 20px auto;
        background: pink;
        position: relative;

        .block {
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0.8s;
          font-size: 33px;
          text-align: center;
          cursor: pointer;

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

        .s22 {
          width: 200px;
          height: 200px;
          line-height: 200px;
        }

        .s21 {
          width: 100px;
          height: 200px;
          line-height: 200px;
        }

        .s12 {
          width: 200px;
          height: 100px;
          line-height: 100px;
        }

        .s11 {
          width: 100px;
          height: 100px;
          line-height: 100px;
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