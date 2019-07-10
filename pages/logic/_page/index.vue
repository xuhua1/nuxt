<template>
  <el-container class="logic">
    <el-main>
      <el-input v-model="input" placeholder="请输入内容">
        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <section class="logics" v-for="(item,ind) in showLogicArr" :key="item.id">
        <nuxt-link :to="'/logic/'+index+'/'+item._id" class="logicItem">
          <div class="el-tag num">{{item.index}}</div>
          <div class="el-tag title">{{item.title}}</div>
        </nuxt-link>
      </section>
      <el-pagination v-show="searchArr.length===0" :current-page="index" background layout="prev, pager, next"
        :page-size="pageSize" @current-change="paginChange" :total="total"></el-pagination>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="上一页" placement="right">
        <el-button type="primary" icon="el-icon-d-arrow-left" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="下一页" placement="right">
        <el-button type="success" icon="el-icon-d-arrow-right" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="编辑器" placement="right">
        <nuxt-link :to="{path:'/logic/setting'}">
          <el-button type="success" icon="el-icon-setting" circle></el-button>
        </nuxt-link>
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
  const pageType = 'logic'
  const cnPageType = "逻辑题"
  export default {
    layout: 'home',
    async fetch({ store, params }) {
      try {
        let { page } = params
        page = page ? page : 1;
        page = parseInt(page, 10)
        const number = 10;
        const res = await axios.get(`/api/logic/getlogictitle`, {
          params: {
            skip: (page - 1) * number,
            number,
          }
        })
        console.log(res.data)
        store.dispatch('logic/setLogicArr', res.data.logicTitle)
        store.dispatch('logic/setTotal', res.data.total)
        store.dispatch('logic/setIndex', page)
      } catch (error) {
        console.log(error)
      }
    },
    data() {
      return {
        input: '',
        searchArr: []
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
      ...mapState('logic', ['logicArr', 'total', 'index', 'pageSize']),
      showLogicArr() {
        return this.logicArr;
      }
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      ...mapActions('logic', ['setLogicArr', 'setTotal']),
      paginChange(current) {
        this.$router.push(`/${pageType}/${current}`);
      },
      async search() {
        const res = await axios.get('/api/logic/search', {
          params: {
            args: this.input.toLowerCase()
          }
        })
        this.searchArr = res.data.logicTitle
      }
    }
  }
</script>
<style lang="scss">
  .logic {
    margin-top: 20px;

    .el-main {
      section {
        margin: 20px 0;
        position: relative;
        height: 32px;

        .logicItem {
          cursor: pointer;
        }

        .num {
          width: 30px;
          position: absolute;
          left: 0;
        }

        .title {
          position: absolute;
          left: 38px;
          right: 0px;
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