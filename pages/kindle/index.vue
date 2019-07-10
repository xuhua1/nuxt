<template>
  <el-container class="kindle">
    <el-main>
      收集资源中。。。。。。
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="评论" placement="right">
        <el-button @click="setShowComment" type="success" icon="el-icon-edit-outline" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  const pageType = 'kindle'
  const cnPageType = "kindle电子书"
  export default {
    layout: 'home',
    mounted() {
      this.setBreadcrumb({
        type: pageType,
        path: `/${pageType}`,
        name: cnPageType
      })
    },
    mounted() {
      this.setCommentList(this.$route.path)
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
    },
  }
</script>
<style lang="scss">
  .kindle {}
</style>