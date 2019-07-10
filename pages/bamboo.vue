<template>
  <el-container class="bamboo">
    <el-main ref="main" id="bamboo-main">
      <div class="card" v-for="(item,index) in bambooPos" :key="index" :style="{ 
          width: ''+item.width*40+'px',
          left:' '+item.left*40+'px'
        }">
        <div class="bam" :style="{ 
            top:''+(-item.height)+'px',
            height:item.height+'px', 
            transform: 'rotate('+item.angle+'deg)', 
            transformOrigin: 'right bottom'
          }"></div>
      </div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="重置" placement="right">
        <el-button @click.stop="reSet" id="reset" icon="el-icon-refresh" circle></el-button>
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
        seInd: 0,
        bamPos: null,
        bambooPos: [
          { width: 3, left: 1, height: 20, angle: 0 },
          { width: 2, left: 6, height: 20, angle: 10 }
        ]
      }
    },
    mounted() {
      this.setBreadcrumb({
        type: 'bamboo',
        path: `/bamboo`,
        name: '竹竿游戏'
      })
    },
    computed: {
      filterBamPos() {
        return this.bambooPos.filter(item => item.type + item.left > 0)
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      document.addEventListener('mousedown', this.mainClick)
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      mainClick(e) {
        if (e.target.id === 'reset') return null
        if (!this.bambooPos[this.seInd]) return null
        document.removeEventListener('mousedown', this.mainClick)
        document.addEventListener('mouseup', this.mainLeave)
        this.interval = setInterval(() => {
          const bPos = JSON.parse(JSON.stringify(this.bambooPos))
          bPos[this.seInd].height = bPos[this.seInd].height + 4
          this.bambooPos = bPos;
        }, 50)
      },
      reSet() {
        const bam1 = {
          width: this.getRandom(1, 3),
          left: 0,
          height: 20,
          angle: 0
        }
        const bam2 = {
          width: this.getRandom(1, 3),
          left: bam1.width + this.getRandom(1, 2),
          height: 20,
          angle: this.getRandom(0, 1) * 10
        }
        this.bambooPos = [bam1, bam2]
        document.addEventListener('mousedown', this.mainClick)
      },
      mainLeave() {
        window.clearInterval(this.interval)
        this.beginAngle()
        document.removeEventListener('mouseup', this.mainLeave)
      },
      getRandom(a, b) {
        return Math.floor(Math.random() * (b - a)) + a
      },
      beginAngle() {
        this.angleInterval = setInterval(() => {
          const bPos = JSON.parse(JSON.stringify(this.bambooPos))
          bPos[this.seInd].angle = bPos[this.seInd].angle + 2
          this.bambooPos = bPos;
          if (this.bambooPos[this.seInd].angle === 90) {
            const [left, right] = [
              this.bambooPos[this.seInd].left,
              this.bambooPos[this.seInd + 1].left
            ]
            const [leftWid, rightWid] = [
              this.bambooPos[this.seInd].width,
              this.bambooPos[this.seInd + 1].width
            ]
            const [min, max] = [
              (right - left - leftWid / 2) * 40,
              (right - left - leftWid / 2 + rightWid) * 40
            ]
            const bambooHeight = this.bambooPos[this.seInd].height
            if (bambooHeight < max && bambooHeight > min) {
              this.seInd = this.seInd + 1
              const newBPos = JSON.parse(JSON.stringify(this.bambooPos))
              let toleft = 0
              if (newBPos[this.seInd - 2]) {
                toleft = newBPos[this.seInd - 2].left
              }
              const lastLeft = newBPos[newBPos.length - 1].left
              const lastWid = newBPos[newBPos.length - 1].width
              const [width, left, height, angle] = [
                this.getRandom(1, 3),
                lastLeft + lastWid + this.getRandom(1, 2),
                20,
                this.getRandom(0, 4) * 10
              ]
              newBPos.push({ width, left, height, angle })
              newBPos.forEach(item => {
                item.left = item.left - toleft
              })
              this.bambooPos = newBPos;
              document.addEventListener('mousedown', this.mainClick)
            } else {
              this.$message({
                type: 'error',
                message: '你输了'
              })
            }
            window.clearInterval(this.angleInterval)
          }
        }, 30)
      }
    }
  }
</script>
<style lang="scss">
  .bamboo {
    margin-top: 20px;

    .el-main {
      position: relative;
      height: 500px;
      width: 100%;
      overflow: hidden;

      .card {
        height: 220px;
        position: absolute;
        bottom: 0;
        background: brown;
        transition: all 0.8s;

        &>div {
          padding: 0px;
        }

        .bam {
          position: absolute;
          left: 0;
          background: chartreuse;
          width: 20px;
          margin-left: -20px;
          left: 50%;
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