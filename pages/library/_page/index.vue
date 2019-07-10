<template>
  <el-container class="book">
    <el-main>
      <el-input v-model="input" placeholder="请输入内容">
        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="tag">
        <el-tag>node.js</el-tag>
        <el-tag>服务器</el-tag>
        <el-tag>框架</el-tag>
        <el-tag>vuejs</el-tag>
      </div>
      <section class="books" v-for="item in showBookArr" :key="item.id">
        <nuxt-link :to="'/library/'+index+'/'+item.id" class="bookItem">{{item.title}}</nuxt-link>
        <div class="tab">{{item.createdAt}}&nbsp;&nbsp; |&nbsp;&nbsp; {{(item.size/1024/1024).toFixed(2)}}MB
          &nbsp;&nbsp;|&nbsp;&nbsp; {{item.downloadnum}}次下载 &nbsp;&nbsp;|
          &nbsp;&nbsp; 贡献者:{{item.author}}
        </div>
      </section>
      <el-pagination v-show="searchArr.length===0" :current-page="index" background layout="prev, pager, next"
        :page-size="pageSize" @current-change="paginChange" :total="total">
      </el-pagination>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="刷新书库" placement="right">
        <el-button @click="getBookTitle" icon="el-icon-upload" circle></el-button>
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
  import OSS from 'ali-oss'
  //在右下角根据搜索推荐群名称, 推荐群。 可以换一个
  //可以改成资源
  const pageType = 'library'
  const cnPageType = "专业书"
  export default {
    layout: 'home',
    async fetch({ store, params }) {
      try {
        let { page } = params
        page = page ? page : 1;
        page = parseInt(page, 10)
        const number = 10;
        const res = await axios.get(`/api/book/getbooktitle`, {
          params: {
            skip: (page - 1) * number,
            number,
          }
        })
        store.dispatch('book/setBookArr', res.data.bookTitle)
        store.dispatch('book/setTotal', res.data.total)
        store.dispatch('book/setIndex', page)
      } catch (error) {
        console.log(error)
      }
    },
    data() {
      return {
        input: '',
        searchArr: [],
      }
    },
    mounted() {
      this.setBreadcrumb({
        type: pageType,
        path: `/${pageType}`,
        name: cnPageType
      })
      this.setCommentList(this.$route.path)
    },
    computed: {
      ...mapState('book', ['bookArr', 'total', 'index', 'pageSize']),
      showBookArr() {
        if (this.searchArr.length > 0) {
          return this.searchArr;
        }
        return this.bookArr;
      }
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setCommentList', 'setBreadcrumb']),
      ...mapActions('book', ['setBookArr', 'setTotal']),
      paginChange(current) {
        this.$router.push(`/${pageType}/${current}`);
      },
      async search() {
        const res = await axios.get('/api/book/search', {
          params: {
            args: this.input.toLowerCase(),
          }
        })
        this.searchArr = res.data.bookTitle;
      },
      async getBookTitle() {
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
          let result = await client.list()

          const resArr = result.objects;
          const newArr = resArr.filter(item => item.size).map(item => {
            return {
              urlkey: item.name,
              title: item.name.split('/').pop(),
              size: item.size,
            }
          })
          const res = await axios.post('/api/book/postbook', {
            bookList: newArr
          })
        } catch (error) {
          console.log(errow)
        }
      }
    }
  }
</script>
<style lang="scss">
  .book {
    margin-top: 20px;

    .el-main {
      text-align: center;

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