<template>
  <el-container class="typing">
    <el-main>
      <div>
        <span id="testLen">
        </span>
      </div>
      <div>
        <div v-for="(item,index) in showDataArr" :key="index">
          <span v-html="item"></span>
          <el-input ref="input" :id="index" class="input" @input="inputChange(index)" v-model="inputObj[index]">
          </el-input>
        </div>
      </div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="上传文件" placement="right">
        <el-upload action :show-file-list="false" :http-request="insertImage">
          <el-button icon="el-icon-upload" circle></el-button>
        </el-upload>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="随机文章" placement="right">
        <el-button type="primary" icon="el-icon-refresh-right" circle></el-button>
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
        data: '',
        dataArr: [],
        showDataArr: [],
        inputObj: {},
        inputObjLen: {},
        index: 0,
      }
    },
    computed: {
      testData() {
        return this.data.replace(/\s+/g, ' ');
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      this.data = "点击右侧上传文件按钮，可以上传本地文件进行打字练习";
      this.init();
      this.setBreadcrumb({
        type: 'typing',
        path: `/typing`,
        name: '打字练习'
      })
      //this.inputRefs = this.$refs.inputWrap;
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      inputChange(ind) {
        this.index = ind;
        const data = this.inputObj['' + ind];
        const len = this.inputObjLen['' + ind];
        const dataArr = this.showDataArr.concat();
        const dataItem = this.dataArr[ind];
        let newData = [];
        if (data.length === len) {
          if (this.$refs.input[ind + 1]) {
            this.$refs.input[ind + 1].focus();
          }
        }

        data.split('').forEach((item, index) => {
          if (item === dataItem[index]) {
            newData.push(`<span style=color:pink>${dataItem[index]}</span>`)
          } else {
            if (dataItem[index]) {
              newData.push(`<span style=color:red>${dataItem[index]}</span>`)
            }
          }
        })
        newData = newData.join('') + dataItem.slice(data.length);
        dataArr[ind] = newData;
        this.showDataArr = dataArr;
      },
      init() {
        this.dataArr = [];
        this.showDataArr = [];
        this.inputObj = {};
        this.inputObjLen = {};
        this.testArrDom = document.getElementById('testLen');
        let str = '';
        let beforeLen = 0;
        for (let i = 0, len = this.testData.length; i < len; i++) {
          const beforeStr = str;
          str += this.testData[i];
          this.testArrDom.innerHTML = str;
          if (this.testData[i] && this.testArrDom.offsetWidth === beforeLen) {
            this.dataArr = this.dataArr.concat(beforeStr);
            beforeLen = 0;
            str = this.testData[i];
          }
          beforeLen = this.testArrDom.offsetWidth;
        }
        if (str.length > 0) this.dataArr = this.dataArr.concat(str);
        this.testArrDom.innerHTML = '';
        const inputObjLen = {}, inputObj = {};
        this.dataArr.forEach((item, index) => {
          inputObjLen['' + index] = item.length;
          inputObj['' + index] = '';
        })
        this.inputObj = inputObj;
        this.inputObjLen = inputObjLen;
        this.showDataArr = this.dataArr.concat();
      },
      insertImage({ file }) {
        const reader = new FileReader();
        reader.readAsText(file, 'gb2312');
        const that = this;
        reader.onload = function (ev) {
          const res = ev.target.result;
          that.data = res;
          that.init()
        }
      }
    }
  }
</script>
<style lang="scss">
  .typing {
    margin-top: 20px;

    .el-main {
      padding: 0px;
      font-size: 16px;
      text-align: left;

      el-input,
      input {
        font-size: 16px;
        padding: 0px;
        line-height: 20px;
        height: 30px;
        margin: 5px 0px 15px 0;
      }

      div {
        width: 800px;
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