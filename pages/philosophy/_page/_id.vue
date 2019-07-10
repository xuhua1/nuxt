<template>
  <el-container class="article-id">
    <el-main class="forMarkdownValue">
      <div>{{article.title}}</div>
      <div v-html="markedValue"></div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="编辑" placement="right">
        <nuxt-link :to="editorRoute">
          <el-button type="success" icon="el-icon-setting" circle></el-button>
        </nuxt-link>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="返回" placement="right">
        <nuxt-link :to="backRoute">
          <el-button type="success" icon="el-icon-back" circle></el-button>
        </nuxt-link>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="评论" placement="right">
        <el-button @click="setShowComment(routePath)" type="success" icon="el-icon-edit-outline" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import axios from '~/plugins/axios'
  import marked from '../../../assets/js/articleMarked'
  import 'highlight.js/styles/tomorrow.css'
  const pageType = "philosophy"
  export default {
    layout: 'home',
    async fetch({ store, params }) {
      try {
        let { page, id } = params
        page = parseInt(page, 10)
        const res = await axios.get(`/api/article/getbyid`, {
          params: {
            id
          }
        })
        store.dispatch('article/setArticle', res.data.article)
        store.dispatch('article/setIndex', page)
      } catch (error) {
        console.log(error)
      }
    },
    mounted() {
      this.setCommentList(this.routePath)
    },
    computed: {
      ...mapState('article', ['article', 'index']),
      editorRoute() {
        return { path: `/${pageType}/markdown/` + this.index, query: { id: this.article._id } }
      },
      backRoute() {
        return `/${pageType}/` + this.index
      },
      routePath() {
        return this.$route.path
      },
      markedValue() {
        return marked(this.article.article)
      }
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setCommentList']),
    }
  }
</script>