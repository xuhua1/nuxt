<template>
  <el-container class="template">
    <el-main>
      收集资源中......
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="重置" placement="right">
        <el-button icon="el-icon-refresh" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="评论" placement="right">
        <el-button type="success" icon="el-icon-edit-outline" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    layout: 'home',
    fetch({ store, params }) {

      // store.dispatch('cat/setPosArr', posArr)
    },
    data() {
      return {
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
    },
    computed: {
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setCommentList']),
    }
  }
</script>
<style lang="scss">
  .template {
    margin-top: 20px;

    .el-main {}

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