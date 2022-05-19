<template>
  <div class="layout-basic">
    <p class="title" :style="{ color: colors[6] }">
      <span
        v-for="(word, index) in title"
        :key="index"
        :style="{ color: colors[index] }"
        >{{ word }}</span
      >
    </p>

    <el-card class="login-container">
      <el-form label-width="80px" :model="loginForm">
        <el-form-item label="账号" required>
          <el-input v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 220px" @click="_.debounce(confirmLogin,1500,{leading:true})()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    const loginForm = {
      account: '',
      password: '',
    }
    return {
      title: '朴素的登录页面',
      colors: [
        '#932ae1',
        '#c1c049',
        '#ffcd5e',
        '#3eb076',
        '#0666e8',
        '#0fd5f9',
        '#29F0FF',
      ],
      loginForm,
    }
  },
  methods: {
    async userLogin(formData) {
      const res = await this.$axios.post(
        'http://localhost:3000/login',
        formData
      )
      return res
    },
    confirmLogin() {
      this.userLogin(this.loginForm)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data)
            window.localStorage.token = res.data.data.token
            this.$router.push({ path: this.$route.query.toPath })
          }else{
            this.$message.error('账号密码输错了哦😯');
          }
        })
        .catch((err) => {
          console.err(err, 'somethingwrong')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  margin-top: 16px;
  font-size: 64px;
  text-align: center;
  font-family: 'FZSJ-XIAOTQPYT';
}
.login-container {
  width: 640px;
  height: 360px;
  margin: 80px auto 0;
  padding: 32px 80px;
}
</style>
