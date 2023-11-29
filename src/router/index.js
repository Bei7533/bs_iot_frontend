import Vue from 'vue'
import Router from 'vue-router'
import login from "../views/login/Login.vue";
import register from "@/views/login/Regitster.vue";
import home from "../views/home/Home.vue"
import user_home from "../views/user/UserHome.vue"
import user_info from "../views/user/UserInfo.vue"
import user_info_edit from "../views/user/UserInfoEdit.vue"
import map from "../views/map/Map.vue"
import device from "../views/device/Device.vue"
import data from "../views/device/Data.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/Register',
      name: 'register',
      component: register
    },
    {
      path: '/UserHome',
      name: 'user_home',
      component: user_home
    },
    {
      path: '/user/userinfo',
      name: 'user_info',
      component: user_info
    },
    {
      path: '/user/userinfoedit',
      name: 'user_info_edit',
      component: user_info_edit
    },
    {
      path: '/user/map',
      name: 'map',
      component: map
    },
    {
      path: '/user/device',
      name: 'device',
      component: device
    },
    {
      path: '/user/data',
      name: 'data',
      component: data
    }
  ]
})
