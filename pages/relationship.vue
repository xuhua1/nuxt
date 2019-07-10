<template>
  <el-container class="relationship">
    <el-main>
      <el-input type="textarea" :autosize="{minRows: 2}" resize="none" v-model="inputVal"></el-input>
      <el-row>
        <el-col :span="2" v-for="(item,index) in btnValue" :key="item" :offset="index===0?2:0">
          <el-button @click="btnClick(index)">{{item}}</el-button>
        </el-col>
      </el-row>
      <div>{{reltsInfo}}</div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="清空" placement="right">
        <el-button @click="clearVal" icon="el-icon-refresh" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import relationship from 'relationship.js'
  export default {
    layout: 'home',
    data() {
      return {
        inputVal: '我',
        reltsInfo: '',
        btnValue: ['父', '母', '夫', '妻', '子', '女', '兄', '弟', '姐', '妹'],
        textValue: [
          '父亲',
          '母亲',
          '丈夫',
          '妻子',
          '儿子',
          '女儿',
          '哥哥',
          '弟弟',
          '姐姐',
          '妹妹'
        ]
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      this.setBreadcrumb({
        type: 'relationship',
        path: `/relationship`,
        name: '亲戚计算器'
      })
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      btnClick(index) {
        const tVal = this.textValue[index]
        this.inputVal = this.inputVal + ' 的 ' + tVal
        const trimTextArea = this.inputVal.replace(/\s/g, '')
        const options = { text: trimTextArea, sex: 1 }
        const text = relationship(options)
        this.reltsInfo = text[0] ? text[0] : '计算出错'
      },
      clearVal() {
        this.inputVal = '我'
      }
    }
  }
</script>
<style lang="scss">
  .relationship {
    margin-top: 20px;

    .el-main {
      .el-row {
        margin: 20px 0;
        text-align: center;
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