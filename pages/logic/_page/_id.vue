<template>
  <el-container class="logic-id">
    <el-main>
      <section class="quesWrapper">
        <h2>第{{logicInfo.index}}题: {{logicInfo.title}}</h2>
        <section class="question">{{logicInfo.question}}</section>
        <el-collapse>
          <el-collapse-item title="提示" name="1">
            <section class="ansWer">{{logicInfo.tip}}</section>
          </el-collapse-item>
          <el-collapse-item title="答案" name="2">
            <section class="ansWer">{{logicInfo.answer}}</section>
          </el-collapse-item>
        </el-collapse>
      </section>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="上一个" placement="right">
        <el-button @click="next(-1)" type="primary" icon="el-icon-d-arrow-left" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="下一个" placement="right">
        <el-button @click="next(1)" type="success" icon="el-icon-d-arrow-right" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="编辑" placement="right">
        <nuxt-link :to="editorRoute">
          <el-button type="success" icon="el-icon-setting" circle></el-button>
        </nuxt-link>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="返回" placement="right">
        <nuxt-link to="/logic">
          <el-button type="success" icon="el-icon-back" circle></el-button>
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

  export default {
    layout: 'home',
    async fetch({ store, params }) {
      let { page, id } = params
      page = parseInt(page, 10)
      const res = await axios.get('/api/logic/getlogicbyid', {
        params: {
          id
        },
      })
      store.dispatch('logic/setLogicInfo', res.data.logic)
      store.dispatch('logic/setIndex', page)
    },
    data() {
      return {}
    },
    mounted() {
      this.setCommentList(this.$route.path)
    },
    computed: {
      ...mapState('logic', ['logicInfo', 'index']),
      editorRoute() {
        return { path: '/logic/setting/' + this.index, query: { id: this.logicInfo._id } }
      }
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setCommentList']),
      async next(num) {
        const res = await axios.get('/api/logic/getlogicbyarg', {
          params: {
            index: this.logicInfo.index + num
          }
        })
        if (res.data.logic) {
          const id = res.data.logic.id
          this.$router.push(`/logic/${id}`)
        } else {
          this.$message({
            type: 'warning',
            message: '到头了'
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .logic-id {
    margin-top: 20px;

    .quesWrapper {
      width: 100%;
      min-width: 400px;
      margin: 0 auto;

      section {
        display: block;
        overflow: hidden;
        width: 100%;
        margin: 20px 0;
      }

      .el-collapse {
        display: block;
        margin-top: 30px;
      }
    }
  }
</style>