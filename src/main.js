import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'


Vue.use(ElementUI);

Vue.config.productionTip = false;
var axios = require('axios');
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios;

// document.documentElement.style.fontSize = window.screen.width / 500 + 'px'

Vue.use(BaiduMap, {
  ak: 'IKCwjGT8mXlzt9WvPXBnEx6A3yrRia49'  //这个地方是官方提供的ak密钥
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
