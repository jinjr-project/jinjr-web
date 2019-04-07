<template>
  <div id="login">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-form ref="site" :model="site" label-width="80px">
          <el-form-item>
            <el-input placeholder="你的网站名" v-model="site.name" width="200">
              <template slot="append">jinjr.com</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="site.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-input v-model="site.first" placeholder="名"></el-input>
            </el-col>
            <el-col :span="2"> &nbsp; </el-col>
            <el-col :span="11">
              <el-input v-model="site.last" placeholder="姓"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-input v-model="site.email" type="email" placeholder="你的邮件地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-button" @click="signup">开通</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <router-link to="/user/registration">登录</router-link>
          </el-form-item> -->
        </el-form>
        
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      site: {
        name: '',
        email: '',
        username: '',
        fullname: {
          first: '',
          last: ''
        },
        password: ''
      }
    }
  },
  methods: {
    signup() {
      this.$router.push("/collaboration/")
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