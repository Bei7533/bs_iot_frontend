<script>
export default {
  data() {
    return {
      username: this.$route.query.username,
      activeIndex: '1',
      activeIndex2: '1',
    };
  },
  mounted() {
    this.fetchData(); // 在组件挂载后调用发送请求的方法
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key === '1-1') {
        // alert('1-1')
        this.$router.push({
          path: '/user/userinfo',
          query: { username: this.username }
        });
      } else if (key === '1-2') {
        this.$router.push({
          path: '/user/userinfoedit',
          query: { username: this.username }
        });
      } else if (key === '2') {
        this.$router.push({
          path: '/user/map',
          query: { username: this.username }
        });
      } else if (key === '3') {
        this.$router.push({
          path: '/user/device',
          query: { username: this.username }
        });
      } else if (key === '4') {
        this.$router.push({
          path: '/user/data',
          query: { username: this.username }
        });
      }
    }
  }

}
</script>

<template>
  <div class="body">

    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#2A7A88" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>个人信息</span>
        </template>
        <el-menu-item index="1-1">查看信息</el-menu-item>
        <el-menu-item index="1-2">编辑信息</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <template slot="title">
          <i class="el-icon-map-location"></i>
          <span slot="title">查看地图</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-data-line"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
    </el-menu>
    <h1 class="username-style">{{ username }}</h1>
<!--    <div class="demo-basic&#45;&#45;circle" style="position: absolute; top: 12px; right: 150px;">-->
<!--      <div class="block"><el-avatar size="40" icon="el-icon-user-solid"></el-avatar></div>-->
<!--      <div class="block" v-for="size in sizeList" :key="size">-->
<!--        <el-avatar size="size" icon="el-icon-user-solid"></el-avatar>-->
<!--      </div>-->
<!--    </div>-->
    <h2 class="welcome-style">{{ username }}，欢迎来到简单美丽的物联网设备管理系统</h2>
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
  background-image: url("../../assets/userHome.png");
  background-size: cover;
  z-index: 0;
}

.username-style {
  position: absolute;
  top: 2px;
  right: 65px;
  font-size: 25px;
  color: #fff;
}

.welcome-style {
  position: absolute;
  bottom: 100px;
  left: 65px;
  float: left;
  font-family: 'Exo', sans-serif;
  font-size: 32px;
  font-weight: 400
}
</style>
