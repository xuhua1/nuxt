<template>
  <el-container class="article-index">
    <el-main>
      <div class="block">
        <div class="titleWrapper">
          <div class="titleItem" v-for="item in titleArr" :key="item._id">
            <nuxt-link :to="titleRoute(item._id)">
              <div class='el-tag num'>{{item.index}}</div>
              <div class='el-tag title'>{{item.title}} <span>{{setTime(item.createdAt)}}</span></div>
            </nuxt-link>
          </div>
        </div>
        <el-pagination background layout="prev, pager, next" :current-page="index" @current-change="paginChange"
          :page-size="pageSize" :total="total"></el-pagination>
      </div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="搜索(未开放)" placement="right">
        <el-button icon="el-icon-search" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="编辑器" placement="right">
        <nuxt-link :to="editorRoute">
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
  import moment from 'moment'
  const pageType = "humor"
  const cnPageType = "幽默"
  export default {
    layout: 'home',
    async fetch({ store, params }) {
      try {
        let { page } = params
        page = page ? page : 1;
        page = parseInt(page, 10)
        const number = 10;
        const res = await axios.get(`/api/article/gettitle`, {
          params: {
            type: pageType,
            skip: (page - 1) * number,
            number,
          }
        })
        store.dispatch('article/setTitleArr', res.data.title)
        store.dispatch('article/setTotal', res.data.total)
        store.dispatch('article/setIndex', page)
        store.dispatch('article/setType', pageType)
      } catch (error) {
        console.log(error)
      }
    },
    mounted() {
      this.setBreadcrumb({
        type: pageType,
        path: `/${pageType}/${this.index}`,
        name: cnPageType
      })
      this.setCommentList(this.routePath)
    },
    computed: {
      ...mapState('article', ['titleArr', 'index', 'pageSize', 'total', 'type']),
      routePath() {
        return this.$route.path
      },
      editorRoute() {
        return `/${pageType}/markdown`
      }
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      ...mapActions('article', ['setIndex', 'setTitleArr']),
      setTime(time) {
        return moment(parseInt(time)).format("YYYY.M.D");
      },
      titleRoute(id) {
        return `/${pageType}/${this.index}/${id}`
      },
      paginChange(current) {
        this.$router.push(`/${pageType}/${current}`);
      }
    }
  }
</script>