<template>
  <div class="componentComment">
    <div class="drawer-mask" @click.stop="setShowComment"></div>
    <vue-scroll class="vuescroll" :ops="ops">
      <el-form :model="commentVal" ref="commentVal" class="commentVal">
        <el-form-item prop="nickname">
          <el-input placeholder="请输入昵称" v-model="commentVal.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="content" :rules="[
          { required: true, message: '评论内容必填', trigger: 'blur' },
          { min: 5, message: '内容不少于5个字符', trigger: ['blur', 'change'] }
        ]">
          <el-input placeholder="输入评论内容" v-model="commentVal.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('commentVal')">提交</el-button>
        </el-form-item>
      </el-form>

      <div class="commentI" v-for="item in commentList" :key="item._id">
        <div class="comment-item">
          <el-button type="success" circle>{{item.nickname[0]}}</el-button>
          <div class="tag">
            <el-tag>{{item.nickname}}</el-tag>
            <el-tag>{{setTime(item.createdAt)}}</el-tag>
          </div>
        </div>
        <p class="content">{{item.content}}</p>
      </div>
    </vue-scroll>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import axios from '../plugins/axios.js'
  import moment from 'moment'
  export default {
    data() {
      return {
        commentVal: {
          nickname: '',
          content: ''
        },
        ops: {
          sizeStrategy: 'percent',
          detectResize: true,
          scroller: {
            bouncing: false
          },
          scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: true
          },
          rail: {
            opacity: '0.2',
            background: 'none',
            border: 'none',
            size: '6px',
            keepShow: false
          },
          bar: {
            /** 当不做任何操作时滚动条自动消失的时间 */
            showDelay: 500,
            /** Specify bar's border-radius, or the border-radius of rail and bar will be equal to the rail's size. default -> false **/
            specifyBorderRadius: false,
            /** 是否只在滚动的时候现实滚动条 */
            onlyShowBarOnScroll: true,
            /** 是否保持显示 */
            keepShow: false,
            /** 滚动条颜色, default -> hsla(220,4%,58%,.3) */
            background: 'hsla(220,4%,58%,.3)',
            /** 滚动条透明度, default -> 1  */
            opacity: 1,
            /** Styles when you hover scrollbar, it will merge into the current style */
            hoverStyle: false
          }
        }
      }
    },
    computed: {
      ...mapState('global', ['commentList', 'routePath'])
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'addComment']),
      setTime(time) {
        return moment(parseInt(time)).fromNow();
      },
      submitForm(formName) {
        const { content, nickname } = this.commentVal;
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const result = await axios.post('/api/comment/postCm', {
              content, nickname,
              routePath: this.routePath
            })
            this.addComment({ content, nickname, createdAt: moment().valueOf(), routePath: this.routePath })
            this.commentVal.content = '';
            this.commentVal.nickname = '';
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .componentComment {
    width: 500px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    .drawer-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.65);
      z-index: 99;
    }

    .vuescroll {
      z-index: 999;
      background-color: #e9eef3;
      background: white;

      .el-form {
        margin: 20px;
      }

      .commentI {
        margin: 20px;

        .content {
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
          font-size: 16px;
        }

        .comment-item {
          display: flex;
          margin-top: 20px;

          .el-button {
            width: 40px;
            height: 40px;
          }

          .tag {
            .el-tag {
              padding: 0;
              height: 18px;
              font-size: 12px;
              line-height: 18px;
              margin-top: 1px;
              display: block;
            }
          }
        }
      }
    }
  }
</style>