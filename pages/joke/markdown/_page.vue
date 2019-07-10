<template>
  <el-container class="article-md">
    <el-main v-show="!showPreView">
      <el-row>
        <el-col :span="2">
          <el-tag class="el-icon-caret-left"></el-tag>
        </el-col>
        <el-col :span="2">
          <el-tag class="el-icon-caret-right"></el-tag>
        </el-col>
        <el-col :span="2">
          <el-tag data-type="h1" @click="insert">H</el-tag>
        </el-col>
        <el-col :span="2">
          <el-tag data-type="list" @click="insert">列表</el-tag>
        </el-col>
        <el-col :span="2">
          <el-tag data-type="table" @click="insert">表格</el-tag>
        </el-col>
        <el-col :span="2">
          <el-tag data-type="code" @click="insert">代码</el-tag>
        </el-col>
        <el-col :span="2">
          <el-tag data-type="block" @click="insert">引用</el-tag>
        </el-col>
        <el-col :span="2">
          <el-upload action :show-file-list="false" :http-request="insertImage">
            <el-tag>图片</el-tag>
          </el-upload>
        </el-col>
        <el-col :span="2">
          <el-tag>更多</el-tag>
        </el-col>
      </el-row>
      <div>
        <el-input v-model="title"></el-input>
      </div>
      <el-input type="textarea" resize="none" :autosize="{minRows:16}" placeholder="在此输入内容" v-model="textarea"
        ref="markTextarea" id="markTextarea"></el-input>
    </el-main>
    <el-main class="forMarkdownValue" v-show="showPreView" v-html="markedValue"></el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="发布" placement="right">
        <el-button @click="postArticle" type="success" icon="el-icon-upload" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="预览" placement="right">
        <el-button @click="changePreView" type="success" icon="el-icon-d-arrow-right" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="返回" placement="right">
        <nuxt-link :to="backRoute">
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
  import textInsert from '~/assets/js/articleInsert'
  import marked from '~/assets/js/articleMarked'
  import axios from '~/plugins/axios'
  import OSS from 'ali-oss'
  import 'highlight.js/styles/tomorrow.css'
  const pageType = "joke"
  export default {
    layout: 'home',
    data() {
      return {
        type: pageType,
        title: '',
        textarea: '',
        markdowmRef: null,
        showPreView: false
      }
    },
    mounted() {
      this.markdowmRef = document.getElementById('markTextarea')
      this.setCommentList(this.routePath);
      if (this.id) {
        this.title = this.article.title;
        this.textarea = this.article.article;
      }
    },
    computed: {
      ...mapState('article', ['article', 'index', 'total', 'pageSize']),
      routePath() {
        return this.$route.path
      },
      backRoute() {
        if (this.id) {
          return `/${pageType}/${this.index}/${this.id}`
        } else {
          return `/${pageType}/${this.index}`
        }
      },
      markedValue() {
        return marked(this.textarea)
      },
      id() {
        return this.$route.query.id || '';
      },
      noIdInd() {
        return Math.floor((this.total) / this.pageSize) + 1;
      }
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setCommentList']),
      changePreView() {
        this.showPreView = !this.showPreView
      },
      insert(e, url) {
        const type = e.currentTarget
          ? e.currentTarget.getAttribute('data-type')
          : e
        textInsert(this.markdowmRef, type, url, '')
        this.textarea = this.markdowmRef.value;
      },
      async insertImage({ file }) {
        try {
          const sts = await axios.get('/api/sts')
          const { AccessKeyId, AccessKeySecret, SecurityToken } = sts.data
          let ossConfig = {
            accessKeyId: AccessKeyId,
            accessKeySecret: AccessKeySecret,
            stsToken: SecurityToken,
            endpoint: 'oss-cn-hangzhou.aliyuncs.com',
            bucket: 'zuoyecloud-file'
          }
          let client = new OSS(ossConfig)
          let result = await client.multipartUpload(file.name, file, {
            progress: async function (p, checkpoint) {
              // 记录断点, 如果关闭了浏览器，然后重新启动继续上传的话，是不行的，请参考上边对file对象的描述
              //tempCheckpoint = checkpoint;
            }
          })
          if (result.res.status === 200) {
            this.insert('image', result.res.requestUrls[0])
          }
        } catch (error) {
          console.log(error)
        }
      },
      async postArticle() {
        try {

          let res, id;
          if (this.id) {
            res = await axios.post('/api/article/updatepaper', {
              id: this.id,
              updata: {
                title: this.title,
                article: this.textarea,
              }
            })
            id = this.id;
            this.$router.push(`/${pageType}/${this.index}/${id}`)
          } else {
            res = await axios.post('/api/article/addpaper', {
              type: this.type,
              title: this.title,
              article: this.textarea
            })
            id = res.data.article._id;
            this.$router.push(`/${pageType}/${this.noIdInd}/${id}`)
          }
          if (!res.errors) {
            this.$message({
              type: 'success',
              message: '成功上传',
            })
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>