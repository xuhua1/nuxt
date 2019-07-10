<template>
  <el-container class="book-id">
    <el-main>
      <section>
        <template v-if="!showSet">
          <h2>
            {{bookInfo.title}}
          </h2>
          <div class="intro">作者: {{setInfo.author||bookInfo.bookinfo.author}}</div>
          <div class="intro">版本: {{setInfo.edition||bookInfo.bookinfo.edition}}</div>
          <div class="intro">出版商: {{setInfo.publisher||bookInfo.bookinfo.publisher}}</div>
          <div class="intro">介绍: {{setInfo.brief||bookInfo.bookinfo.brief}}</div>
          <div class="intro">备注: {{setInfo.remarks||bookInfo.bookinfo.remarks}}</div>
        </template>

        <div class="editor" v-if="showSet">
          <h2>
            {{bookInfo.title}}
          </h2>
          <el-input v-model="info['author']">
            <template slot="prepend">&nbsp;&nbsp;作&nbsp;&nbsp;&nbsp;&nbsp;者&nbsp;</template>
          </el-input>
          <el-input v-model="info['edition']">
            <template slot="prepend">版本信息</template>
          </el-input>
          <el-input v-model="info['publisher']">
            <template slot="prepend">&nbsp;出&nbsp;版&nbsp;商&nbsp;</template>
          </el-input>
          <el-input placeholder="书籍内容介绍" :autosize="{ minRows: 3 }" type="textarea" v-model="info['brief']">
          </el-input>
          <el-input placeholder="备注" :autosize="{ minRows: 3 }" type="textarea" v-model="info['remarks']">
          </el-input>
          <el-button @click="handleSetting">提交</el-button>
        </div>
        <div class="tab">{{bookInfo.createdAt}}&nbsp;&nbsp; |&nbsp;&nbsp; {{(bookInfo.size/1024/1024).toFixed(2)}}MB
          &nbsp;&nbsp;|&nbsp;&nbsp; {{bookInfo.downloadnum}}次下载 &nbsp;&nbsp;|
          &nbsp;&nbsp; 贡献者:{{bookInfo.author}}
        </div>
      </section>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="下载" placement="right">
        <el-button @click="download" icon="el-icon-download" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="编辑图书" placement="right">
        <el-button @click="setBook" icon="el-icon-setting" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="返回" placement="right">
        <nuxt-link to="/library">
          <el-button type="success" icon="el-icon-back" circle></el-button>
        </nuxt-link>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="评论" placement="right">
        <el-button type="success" icon="el-icon-edit-outline" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import axios from '~/plugins/axios'
  import OSS from 'ali-oss'
  export default {
    layout: 'home',
    async fetch({ store, params }) {
      let { page, id } = params
      page = parseInt(page, 10)
      const res = await axios.get('/api/book/getbookbyid', {
        params: {
          id
        },
      })
      store.dispatch('book/setBookInfo', res.data.data)
      store.dispatch('book/setIndex', page)
    },
    data() {
      return {
        setInfo: {},
        showSet: false,
        info: {
          author: '',
          edition: '',
          publisher: '',
          brief: '',
          remarks: ''
        }
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
    },
    computed: {
      ...mapState('book', ['bookInfo']),
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setCommentList']),
      async handleSetting() {
        this.setInfo = this.info;
        this.showSet = false;
        const res = await axios.post('/api/book/setting', {
          id: this.bookInfo._id,
          bookinfo: this.info
        })
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: "成功保存"
          })
        }
      },
      setBook() {
        this.showSet = !this.showSet;
        this.info = Object.keys(this.setInfo).length > 0 ? JSON.parse(JSON.stringify(this.setInfo)) : JSON.parse(JSON.stringify(this.bookInfo.bookinfo));
      },
      async download(e, key = this.bookInfo.urlkey) {
        try {
          const sts = await axios.get('/api/sts')
          const { AccessKeyId, AccessKeySecret, SecurityToken } = sts.data
          let ossConfig = {
            accessKeyId: AccessKeyId,
            accessKeySecret: AccessKeySecret,
            stsToken: SecurityToken,
            endpoint: 'oss-cn-hangzhou.aliyuncs.com',
            bucket: 'daxuetool'
          }
          let client = new OSS(ossConfig)
          let url = client.signatureUrl(key)
          let ele = document.createElement('a')
          ele.setAttribute('href', url)
          ele.click()
        } catch (error) {
          console.log(errow)
        }
      }
    }
  }
</script>
<style lang="scss">
  .book-id {
    margin-top: 20px;

    .el-main {
      text-align: center;

      .intro {
        margin: 20px;
      }

      .editor {
        width: 600px;
        margin: auto;

        .el-input,
        .el-textarea {
          width: 600px;
          margin-bottom: 20px;
        }

        .el-button {
          margin: 10px;
        }
      }

      .el-input {
        width: 68%;
        margin: 10px auto;
      }

      .tag {
        margin: 10px 0 30px 0;

        .el-tag {
          cursor: pointer;
          margin: 0px 10px;
        }
      }

      .books {
        text-align: left;
        margin: 10px 30px 0 30px;
        border-top: 1px solid pink;
        padding: 18px 0px 0px 0px;

        .tab {
          margin: 10px 0px;
        }
      }
    }
  }
</style>