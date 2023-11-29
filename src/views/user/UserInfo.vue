<script>
import user from '@/store/modules/user';

export default {
  data() {
    return {
      username: this.$route.query.username,
      email: '',
      lastLoginTime: '',
      activeIndex: '1',
      activeIndex2: '1',
      deviceNum: '',
      userDesciption: '',
      exitVisible: false
    };
  },
  mounted() {
    this.fetchData(); // 在组件挂载后调用发送请求的方法
  },
  methods: {
    fetchData() {
      this.$axios
        .post('http://localhost:8088/admin/userinfo', {
          username: this.username,
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.email = successResponse.data.userInfo.email;
            this.userDesciption = successResponse.data.userInfo.user_descript;
            this.lastLoginTime = successResponse.data.message;
            // alert(successResponse.user.email)
          } else if (successResponse.data.code === 404) {
            alert('访问用户失败')
          }
        })
        .catch(failResponse => {
        });
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === '1-1') {
        // / alert('1-1')
        // this.$router.push({
        //   path: '/user/userinfo',
        //   query: { username: this.username }
        // });/
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
    },
    handleExit() {
      this.$router.push({
        path: '/login',
      });
    },

    handleEdit1() {
      console.log('edit');
      this.$router.push({
        path: '/user/userinfoedit',
        query: { username: this.username }
      });
    }
  }


}

</script>

<template>
  <div class="body">
    <div>

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
        <el-button size="mini" @click="exitVisible = true" class="exit-style">退出登录</el-button>

      </el-menu>
      <el-dialog title="确认退出登录？" :visible.sync="exitVisible" width="30%">
        <div slot="footer" class="dialog-footer">
          <el-button @click="exitVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleExit()">确 定</el-button>
        </div>
      </el-dialog>

      <h1 class="username1-style">{{ username }}</h1>
<!--      <div class="demo-basic&#45;&#45;circle" style="position: absolute; top: 12px; right: 200px;">-->
<!--        <div class="block"><el-avatar size="40" icon="el-icon-user-solid"></el-avatar></div>-->
<!--        <div class="block" v-for="size in sizeList" :key="size">-->
<!--          <el-avatar :size="size" icon="el-icon-user-solid"></el-avatar>-->
<!--        </div>-->

<!--      </div>-->
    </div>
    <div class="userinfo-style">
      <el-descriptions style="font-size: 28px; ">
        <el-descriptions-item label="用户信息"></el-descriptions-item>
      </el-descriptions>
      <el-descriptions style="font-size: 20px; ">
        <el-descriptions-item label="用户名">{{ username }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ email }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions style="font-size: 20px; ">
        <el-descriptions-item label="个人描述">{{ userDesciption }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions style="font-size: 20px; ">
        <el-descriptions-item label="上次登录时间">{{ lastLoginTime }}</el-descriptions-item>
      </el-descriptions>
      <br><br>

      <el-button @click="handleEdit1()">编辑信息</el-button>

    </div>
    <br><br>
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
  background-image: url("../../assets/userbackground.png");
  background-size: cover;
  z-index: 0;
}

.username1-style {
  position: absolute;
  top: 2px;
  right: 130px;
  font-size: 25px;
  color: #fff;
}

.userinfo-style {
  position: absolute;
  top: 35%;
  left: 45%;
  width: 1000px;
}

.exit-style {
  position: absolute;
  top: 17px;
  right: 12px;
}
</style>
