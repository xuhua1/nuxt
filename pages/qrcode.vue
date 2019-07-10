<template>
  <el-container class="qrcode">
    <el-main>
      <el-input v-model="urlVal" placeholder="请输入网址"></el-input>
      <div class="qrcode" id="qrcode"></div>
    </el-main>
    <el-aside width="160px">
      <el-tooltip class="item" effect="dark" content="清空" placement="right">
        <el-button @click="clear" icon="el-icon-magic-stick" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="下载" placement="right">
        <el-button @click="download" type="primary" icon="el-icon-download" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="评论" placement="right">
        <el-button @click="setShowComment" type="success" icon="el-icon-edit-outline" circle></el-button>
      </el-tooltip>
    </el-aside>
  </el-container>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import QRCode from 'qrcodejs2';
  export default {
    layout: 'home',
    data() {
      return {
        urlVal: '',
        qrcode: null,
      }
    },
    mounted() {
      this.setCommentList(this.$route.path)
      this.qrcode = document.getElementById('qrcode')
      this.setBreadcrumb({
        type: 'qrcode',
        path: `/qrcode`,
        name: '生成二维码'
      })
    },
    methods: {
      ...mapActions('global', ['setShowComment', 'setBreadcrumb', 'setCommentList']),
      clear() {
        this.urlVal = '';
      },
      download() {
        const baseToBlob = this.base64ToBlob(this.qrcode.childNodes[1].src);
        const link = document.createElement('a');
        const linkHref = window.URL.createObjectURL(baseToBlob);
        link.href = linkHref;
        link.download = "qrcode";
        link.click();
        window.URL.revokeObjectURL(linkHref);
      },
      base64ToBlob(urlData) {
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
        // 去掉url的头，并转化为byte
        let bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {
          type: "image/png",
        });
      }
    },
    watch: {
      urlVal() {
        this.qrcode.innerHTML = '';
        new QRCode(this.qrcode, {
          text: this.urlVal,
          width: 300,
          height: 300,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      }
    }
  }
</script>
<style lang="scss">
  .qrcode {
    margin-top: 20px;

    .el-main {
      .qrcode {
        text-align: center;

        img {
          margin: auto;
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