<template>
  <div class="login">
    <el-form :model="regForm" label-position="right" :rules="rules" ref="regForm" label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="regForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="regForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('regForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        regForm: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 4, message: '密码最小4位', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapActions('user', [
        'login',
      ]),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { type } = await this.login(this.regForm)
            if (type === 'yes') {
              this.$router.push('/home')
            } else {
              this.$message({
                message: '用户名或密码错误',
                type: 'warning'
              });
            }
          } else {
            return false
          }
        });
      },
    }
  }
</script>
<style>
  .login {
    width: 400px;
    height: 500px;
    position: fixed;
    top: 50%;
    margin-top: -160px;
    left: 50%;
    margin-left: -300px;
  }
</style>