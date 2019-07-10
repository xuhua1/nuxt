<template>
  <div class="bodyWrapper">
    <Comment v-show="showComment"></Comment>
    <section class="navBar">
      <el-breadcrumb separator=">" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <nuxt-link to="/">首页</nuxt-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path" :to="item.path">
          <nuxt-link :to="item.path"> {{item.name}}</nuxt-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <vue-scroll :ops="ops">
      <div class="layout-home">
        <nuxt />
      </div>
    </vue-scroll>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import Comment from '../components/Comment'
  export default {
    components: {
      Comment
    },
    data() {
      return {
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
      ...mapState('global', ['breadcrumb', 'showComment']),
    },
    methods: {
      ...mapActions('global', ['setBreadcrumb'])
    }
  }
</script>
<style lang="scss" scoped>
  .bodyWrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 0;

    .navBar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #e9eef3;
      z-index: 9;

      .el-breadcrumb {
        width: 68%;
        min-width: 960px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        margin: auto;
      }
    }

    .layout-home {
      width: 68%;
      min-width: 960px;
      height: 100%;
      box-sizing: border-box;
      padding: 40px 0;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  }
</style>