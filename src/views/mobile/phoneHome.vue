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

.title-style {
  position: absolute;
  top: 27%;
  left: 55px;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.85);
  text-align: left;

}

.title-style1 {
  position: absolute;
  top: 35%;
  left: 55px;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.85);
  text-align: left;

}

.login-style {
  position: absolute;
  top: 50%;
  left: 22%;
  color: rgba(255, 255, 255, 0.75);
  font-size: 30px;
}

.register-style {
  position: absolute;
  top: 50%;
  left: 50%;
  color: rgba(255, 255, 255, 0.75);
  font-size: 30px;
}
</style>
