<template>
  <div id="login">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <h1>用户登录</h1>
        <el-form ref="login" :model="login" label-width="80px">
          <el-form-item>
            <el-input v-model="login.email" placeholder="请输入邮件地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="login.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-button">登录</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/user/registration">注册</router-link>
          </el-form-item>
        </el-form>
        
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  }
}
</script>
<style scoped>

  h1 {
    text-align: center;
  }
  #login {
    .row-bg {
      backgroud-color: #FFF;
    }
  }

  .login-button {
      width: 100%;
    }
</style>