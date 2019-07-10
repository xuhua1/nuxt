<template>
  <div class="home">
    <div type="border-card">
      <div class="blocks">
        <div class="tab">
          <div class="tabItem" @click="tagClick" v-for="(item,index) in pageItems" :key="item.title" :id="index">
            <el-tag type="info" :id="index" :class="[sleInd===index?'sleInd':'']">
              <i class="el-icon-date" :id="index"></i>
              {{item.title}}
            </el-tag>
          </div>
        </div>

        <div class="flex-box">
          <el-card class="box-card" v-for="item in selItem.items" :key="item.title">
            <div slot="header" class="clearfix">
              <span>{{item.title}}</span>
              <nuxt-link :to="item.url">
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
              </nuxt-link>
            </div>
            <div class="text">{{item.content}}</div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import axios from '~/plugins/axios'

  export default {
    layout: 'home',
    async fetch({ store, params }) {
      const res = await axios.get('/api/getItems')
      store.dispatch('global/setPageItems', res.data)
    },
    computed: {
      ...mapState('global', ['pageItems', 'sleInd']),
      selItem() {
        return this.pageItems[this.sleInd]
      }
    },
    methods: {
      ...mapActions('global', ['setPageItems', 'setSleInd']),
      tagClick(e) {
        console.log(e.target.id)
        try {
          let ind = e.target.id
          ind = Number.parseInt(ind, 10)
          if (ind > -1 && ind < this.selItem.items.length) {
            this.setSleInd(ind)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    margin-top: 20px;

    .border-card {
      margin-top: 20px;
    }

    .blocks {
      .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .tab {
        display: flex;
        justify-content: flex-start;

        .tabItem {
          cursor: pointer;
          padding-top: 5px;
          padding-left: 15px;
          padding-right: 15px;

          .el-tag {
            &:hover {
              background-color: #e6a23c;
              color: black;
            }

            &.sleInd {
              background-color: #67c23a;
              color: black;
            }
          }
        }
      }

      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 18px;
      }

      .clearfix:before,
      .clearfix:after {
        display: table;
        content: '';
      }

      .clearfix:after {
        clear: both;
      }

      .box-card {
        width: 300px;
        margin-top: 20px;
      }
    }
  }
</style>