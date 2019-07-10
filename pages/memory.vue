<template>
  <el-container class="memory">
    <el-main>
      <div class="memoryMain">
        <template v-for="(item,index) in picArr">
          <el-card v-show="picShow.indexOf(index)>-1" :key="index+111"
            :style="{backgroundImage: 'url('+(picData[item])+')'}"></el-card>
          <div class="el-card card" :id="index" v-show="picShow.indexOf(index)<0" :key="index"></div>
        </template>
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
  import axios from '~/plugins/axios'

  export default {
    layout: 'home',
    data() {
      return {
        picData: [],
        picShow: [],
        picArr: []
      }
    },
    beforeMount() {
      let picArr = new Array(8).fill(0).map((_, index) => index)
      picArr = picArr.concat(picArr)
      picArr.sort(_ => 0.5 - Math.random())
      this.picArr = picArr
    },
    mounted() {
      this.setCommentList(this.$route.path)
      try {
        this.getData()
        document.addEventListener('click', this.cardClick)
        this.setBreadcrumb({
          type: 'memory',
          path: `/memory`,
          name: '记忆大师'
        })
      } catch (error) {
        console.log(error)
      }
    },
    computed: {},
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      reSet() { },
      async getData() {
        const resData = await axios.get('/api/getPic')
        this.picData = resData.data.data
      },
      checkPicShow() {
        const newPicShow = this.picShow.map(item => this.picArr[item]).sort()
        let picShow = []
        for (let i = 0, len = newPicShow.length; i < len; i++) {
          if (
            newPicShow[i] === newPicShow[i - 1] ||
            newPicShow[i] === newPicShow[i + 1]
          ) {
            picShow.push(newPicShow[i])
          }
        }
        picShow = [...new Set(picShow)]
        const last = []
        picShow.forEach(item => {
          const index = this.picArr.indexOf(item)
          const lastIndex = this.picArr.lastIndexOf(item)
          last.push(index, lastIndex)
        })
        this.picShow = last
        document.addEventListener('click', this.cardClick)
      },
      cardClick(e) {
        try {
          const id = Number.parseInt(e.target.id, 10)
          this.picShow = this.picShow.concat(id)
          setTimeout(() => {
            document.removeEventListener('click', this.cardClick)
            this.checkPicShow()
          }, 1500)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>
<style lang="scss">
  .memory {
    margin-top: 20px;

    .el-main {
      .memoryMain {
        margin: 20px auto;
        padding: 0px;
        box-sizing: content-box;
        text-align: center;
        font-size: 0;
        width: 720px;
        height: 440px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;

        .el-card {
          cursor: pointer;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          width: 180px;
          height: 110px;
          margin: 0px;
          padding: 0px;
        }

        .card {
          background: pink;
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