<template>
  <div class="register">
    <el-form :model="loginForm" label-position="right" :rules="rules" ref="loginForm" label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="昵称" prop="nickName">
        <el-input type="text" v-model="loginForm.nickName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="loginForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        loginForm: {
          nickName: '',
          email: '',
          password: ''
        },
        rules: {
          nickName: [
            { required: true, message: '昵称不能为空', trigger: 'blur' },
          ],
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
        'register',
      ]),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const { data } = await this.register(this.loginForm)
            if (data.success) {
              this.$router.push('/home')
              this.$message({
                message: '注册成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '用户名已存在',
                type: 'error'
              });
            }
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style>
  .register {
    width: 400px;
    height: 500px;
    position: fixed;
    top: 50%;
    margin-top: -160px;
    left: 50%;
    margin-left: -300px;
  }
</style>