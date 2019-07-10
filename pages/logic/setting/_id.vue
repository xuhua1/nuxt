<template>
  <el-container class="logic-setting">
    <el-main>
      <section>
        <el-input v-model="logic['title']">
          <template slot="prepend">标题</template>
        </el-input>
        <el-tag>问题</el-tag>
        <el-input placeholder="输入问题" :autosize="{ minRows: 3 }" type="textarea" v-model="logic['question']"></el-input>
        <el-tag>提示</el-tag>
        <el-input placeholder="输入提示" :autosize="{ minRows: 3 }" type="textarea" v-model="logic['tip']"></el-input>
        <el-tag>答案</el-tag>
        <el-input placeholder="输入答案" :autosize="{ minRows: 3 }" type="textarea" v-model="logic['answer']"></el-input>
        <el-button @click="handlePostLogic" type="primary">提交</el-button>
      </section>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="返回" placement="right">
        <nuxt-link :to="'/logic/'+id">
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
    data() {
      return {
        logic: {
          title: '',
          question: '',
          tip: '',
          answer: ''
        }
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      if (this.id) {
        this.logic.title = this.logicInfo.title;
        this.logic.question = this.logicInfo.question;
        this.logic.tip = this.logicInfo.tip;
        this.logic.answer = this.logicInfo.answer;
      }
    },
    computed: {
      ...mapState('logic', ['logicInfo', 'total', 'pageSize', 'index']),
      id() {
        return this.$route.query.id;
      }
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setCommentList']),
      async handlePostLogic() {
        let res, id;
        const { question, title, tip, answer } = this.logic
        if (this.id) {
          res = await axios.post('/api/logic/updatelogic', {
            id: this.id,
            updata: {
              question,
              title,
              tip,
              answer
            }
          })
          id = this.id;
          this.$router.push(`/logic/${this.index}/${id}`)
        } else {
          res = await axios.post('/api/logic/postlogic', {
            question,
            title,
            tip,
            answer
          })
          id = res.data._id;
          const page = (this.total / this.pageSize) + 1;
          this.$router.push(`/logic/${page}/${id}`)
        }
        if (!res.data.errors) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else {
          this.$message({
            typoe: 'error',
            message: '添加失败，请重试!'
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .logic-setting {
    margin-top: 20px;

    .el-main {
      textalign: center;

      section {
        width: 600px;
        margin: auto;

        .el-input,
        .el-textarea {
          width: 600px;
          margin: auto;
        }

        .el-tag {
          width: 600px;
          margin: auto;
          display: block;
          margin: 10px 0;
        }

        .el-button {
          margin: 20px 0;
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