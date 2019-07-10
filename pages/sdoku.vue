<template>
  <el-container class="sdoku">
    <el-main>
      <div class="inputWrapper">
        <el-input v-for="(__,ind) in col*row" :key="''+ind" v-model="position[''+ind]"></el-input>
      </div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="答案" placement="right">
        <el-button @click="getAnswer" icon="el-icon-check" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="换一题" placement="right">
        <el-button @click="changeData" icon="el-icon-refresh" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="检查" placement="right">
        <el-button @click="resCheck" type="success" icon="el-icon-question" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="评论" placement="right">
        <el-button @click="setShowComment" type="success" icon="el-icon-edit-outline" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import axios from '../plugins/axios.js';
  export default {
    layout: 'home',
    data() {
      return {
        input: '',
        col: 9,
        row: 9,
        position: {},
        resPositon: {}
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      this.changeData();
      this.setBreadcrumb({
        type: 'sdoku',
        path: `/sdoku`,
        name: '数独'
      })
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      async changeData() {
        const RData = await axios.get('/api/sdoku/getsudo');
        const { data: { sdoku } } = RData;
        /* for (let i = 0; i < 9; i++) {
           const a = [];
           for (let j = 0; j < 9; j++) {
             a.push(sdoku.data[(i * 9 + j)]);
           }
           console.log(a);
         }
         console.log('--------------------')
         for (let i = 0; i < 9; i++) {
           const a = [];
           for (let j = 0; j < 9; j++) {
             a.push(sdoku.resData[(i * 9 + j)]);
           }
           console.log(a);
         }*/
        this.position = sdoku.data;
        this.resPositon = sdoku.resData;
      },
      checkSudoResult: function (beforeSudoArr) {
        const sudoArr = {};
        for (let i in Object.keys(beforeSudoArr)) {
          sudoArr[i] = parseInt(beforeSudoArr[i]);
        }
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
      getAnswer() {
        this.position = JSON.parse(JSON.stringify(this.resPositon));
      },
      resCheck() {
        if (this.checkSudoResult(this.position)) {
          this.$message({
            type: 'success',
            message: "你赢了"
          })
        } else {
          this.$message({
            type: "error",
            message: "有错误的输入"
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .sdoku {
    margin-top: 20px;

    .el-main {
      .inputWrapper {
        width: 360px;
        height: 360px;
        margin: auto;

        .el-input {
          box-sizing: border-box;
          width: 40px;
          height: 40px;
          padding: 0px;

          input {
            padding: 0px;
            text-align: center;
            font-size: 18px;
            line-height: 40px;
          }
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