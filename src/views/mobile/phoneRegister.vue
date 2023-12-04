<script>
export default {
  name: 'Register',
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      password2: '',
      userNameLenValid: true,
      passwordLenValid: true,
      passwordMismatch: false,
      verification_code: ''
    }
  },
  created() {

  },
  methods: {
    register: function () {
      if (this.userName.length < 6 || this.password.length < 6)
        if (this.userName.length < 6) {
          this.userNameLenValid = false
        } else {
          this.passwordLenValid = false
        }
      else {
        this.userNameLenValid = true
        this.passwordLenValid = true
        if (this.password === this.password2) {
          this.passwordMismatch = false;
          this.$axios.post('http://localhost:8088/admin/register', {
            userName: this.userName,
            email: this.email,
            password: this.password,
            verification: this.verification_code
          }).then(res => {
            // alert(res.data.msg)
            if (res.data.code === 200) {
              // 回到登录界面
              alert('注册成功')

              this.$router.push({
                path: '/login'
              })
            }else if(res.data.code === 250){
              alert('用户名已经存在')
            }else if(res.data.code === 404){
              alert('验证码错误')
            }
          }).catch(res => {
            // alert(res.data.msg)
          })
        } else {
          this.passwordMismatch = true
        }
      }
    },
    send: function () {
      if (this.email === '') {
        alert('请输入邮箱')
        return
      }
      this.$axios
          .post('http://localhost:8088/send', {
            email: this.email
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              // alert('发送成功')
            } else if (successResponse.data.code === 250) {
              alert('邮箱已经被注册')
            }
          })
          .catch(failResponse => {
          })
    }
  }
}
</script>

<template>
  <div>
    <div class="body">
      <!--      <h1 class="title-style">This is a simple iot device management platform</h1>-->
      <router-link to="/?index=1" class="home-style">
        <span class="el-icon-s-home"> Home</span>
      </router-link>
      <div class="login-register">
        <h2 class="register-title">Register</h2>
        <router-link to="/login?index=1" class="login-box">
          <span>Login</span>
        </router-link>
      </div>

      <div class="box txt-type" style="text-align: right;">
        <div style="  padding: 40px;">
          <form @submit="register">
            用户名 : <el-input id="userName" type="text" v-model="userName" placeholder=" 请输入用户名" class="input-type" />
            <br><br>
            邮箱 : <el-input id="email" type="text" v-model="email" placeholder=" 请输入邮箱号" class="input-type" />
            <br><br>
            密码 : <el-input id="password" type="password" v-model="password" placeholder=" 请输入密码" class="input-type"  show-password/>
            <br><br>
            确认密码 : <el-input id="password2" type="password" v-model="password2" placeholder=" 请再次输入密码" class="input-type" show-password/>
            <br><br>
            验证码 : <el-input id="verification_code" type="text" v-model="verification_code" placeholder=" 请输入邮箱中获取的验证码"
                               class="input-type" />
            <br><br>
            <button type="button" @click="send()" >获取验证码</button>
            <br><br>
            <button @click="register()" class="register2-box">Register</button>
            <br><br>
          </form>
        </div>
      </div>

    </div>
    <el-alert v-if="passwordMismatch" title="两次输入密码不同" type="error" show-icon class="title-style"></el-alert>
    <el-alert v-if="!userNameLenValid" title="用户名长度不足6位" type="error" show-icon class="title-style"></el-alert>
    <el-alert v-if="!passwordLenValid" title="密码长度不足6位" type="error" show-icon class="title-style"></el-alert>
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
  top: 3%;
  left: 7%;
}

.register-title {
  position: relative;
  z-index: 2;
  float: left;
  color: #fff;
  font-family: 'Exo', sans-serif;
  font-size: 80px;
  font-weight: 400
}

.login-box {
  position: absolute;
  top: 75%;
  left: 65%;
  color: rgba(255, 255, 255, 0.75);
  font-size: 30px;
}

.box {
  position: relative;
  top: 35%;
  left: 2%;
  width: 400px;
  height: 520px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px rgba(255, 255, 255, 0.5);
  border-radius: 30px;

}

.txt-type {
  font-family: 'Exo', sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-top: 5px;
}

.input-type {
  width: 220px;
  height: 30px;
  font-family: 'Exo', sans-serif;
  font-size: 14px;
  font-weight: 400;
  padding: 4px;
  opacity: 0.6;
}

.register2-box {
  width: 300px;
  height: 35px;
  background: #fff;
  cursor: pointer;
  border-radius: 2px;
  font-family: 'Exo', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 2px;
  margin-top: 2px;
  opacity: 0.5;
}
</style>
