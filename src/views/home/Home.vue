<script setup>

</script>

<template>
  <div class="body">
    <h1 class="title-style">简单美丽的</h1>
    <h1 class="title-style1">物联网设备管理系统</h1>

    <router-link to="/login?index=1" class="login-style">
      <span>Login</span>
    </router-link>
    <router-link to="/register?index=1" class="register-style">
      <span>Register</span>
    </router-link>
  </div>
</template>

<style scoped>
.body {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: auto;
  height: auto;
  background-image: url("../../assets/logo.png");
  background-size: cover;
  z-index: 0;
}

.title-style {
  position: relative;
  top: 30%;
  left: 150px;
  font-size: 60px;
  color: rgba(255, 255, 255, 0.85);
  text-align: left;

}

.title-style1 {
  position: relative;
  top: 25%;
  left: 150px;
  font-size: 60px;
  color: rgba(255, 255, 255, 0.85);
  text-align: left;

}

.login-style {
  position: relative;
  top: 27%;
  left: -31%;

  color: rgba(255, 255, 255, 0.75);
  font-size: 32px;
}

.register-style {
  position: relative;
  top: 27%;
  left: -28%;
  color: rgba(255, 255, 255, 0.75);
  font-size: 32px;
}
</style>
