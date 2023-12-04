<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loading: false,
      pwdType: "password",
    };
  },
  methods: {
    handleLogin() {
      this.$axios
          .post('http://localhost:8088/admin/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$router.replace({
                path: '/UserHome',
                query: { username: this.loginForm.username }
              })
            } else if (successResponse.data.code === 404) {
              alert('登录失败，用户名或者密码错误')
            }
          })
          .catch(failResponse => {
          })
    }
  }
};
</script>

<template>
  <div>
    <div class="body">
      <router-link to="/?index=1" class="home-style">
        <span class="el-icon-s-home"> Home</span>
      </router-link>
      <el-form autocomplete="on" :model="loginForm" ref="loginForm" label-position="left">

        <div class="login-register">
          <h2 class="login-title">Login</h2>
          <router-link to="/Register?index=1" class="register-box">
            <span>Register</span>
          </router-link>
        </div>
        <div class="box">
          <el-form-item prop="username">
            <el-input class="username-box" name="username" type="text" v-model="loginForm.username" autocomplete="on"
                      placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="password-box" name="password" :type="pwdType" @keyup.enter.native="handleLogin"
                      v-model="loginForm.password" autocomplete="on" placeholder="请输入密码" show-password>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 60px">
            <el-button class="login-box" type="primary" :loading="loading"
                       @click.native.prevent="handleLogin">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.title-style {
  position: absolute;
  top: 5%;
  left: 30px;
  width: 90%;
  height: 50px;
}

.body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  background-image: url("../../assets/logo.png");
  background-size: cover;
  z-index: 0;
}

.home-style {
  position: absolute;
  top: 30px;
  left: 40px;
  font-size: 30px;
  color: #fff;
  text-decoration: none;

}

.login-register {
  position: absolute;
  top: 5%;
  left: 15%;
}

.login-title {
  position: relative;
  z-index: 2;
  float: left;
  color: #fff;
  font-family: 'Exo', sans-serif;
  font-size: 120px;
  font-weight: 400
}

.register-box {
  position: absolute;
  top: 75%;
  left: 60%;
  color: rgba(255, 255, 255, 0.75);
  font-size: 30px;
}

.box {
  position: absolute;
  top: 10%;
  left: 8%;
}

.username-box {
  position: relative;
  top: 300px;
  left: 0;
  width: 350px;
  height: 40px;
  background: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 2px;
  color: #a18d6c;
  font-family: 'Exo', sans-serif;
  font-size: 18px;
  font-weight: 400;
  padding: 6px;
  margin-top: 10px;
  opacity: 0.75;

}

.password-box {
  position: relative;
  top: 300px;
  left: 0;
  width: 350px;
  height: 40px;
  background: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 2px;
  color: #a18d6c;
  font-family: 'Exo', sans-serif;
  font-size: 18px;
  font-weight: 400;
  padding: 6px;
  margin-top: 10px;
  opacity: 0.75;
}

.login-box {
  position: relative;
  top: 300px;
  left: 0;
  width: 360px;
  height: 40px;
  background: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 2px;
  color: #a18d6c;
  font-family: 'Exo', sans-serif;
  font-size: 20px;
  font-weight: 400;
  padding: 6px;
  margin-top: 10px;
  opacity: 0.75;
}

.login-box:hover {
  opacity: 0.8;
}

.login-box:active {
  opacity: 0.6;
}

.username-box:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.password-box:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login-box:focus {
  width: 300px;
  height: 35px;
  background: #fff;
  outline: none;
}

::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
}
</style>
