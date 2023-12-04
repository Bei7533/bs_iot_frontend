<script>
//引入组件

export default {
  data() {
    return {
      username: this.$route.query.username,
      activeIndex: '1',
      activeIndex2: '1',
      deviceNum: '',
      deviceList: [],
      stringList: [],
      messageTable: [],
      //检索关键字
      keyword: "",
      //输入框input值
      input3: "",
      BMap: '',
      map: '',
      mapZoom: 12,
      point_list: {},
      center_point: {
        lng: 120.17,
        lat: 30.32
      },
      marker_visible: true,
      tooMuch_visible: false
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
      } else if (key === '1-3') {
        this.$router.push({
          path: '/UserHome',
          query: { username: this.username }
        });
      } else if (key === '2') {
        // this.$router.push({
        //   path: '/user/map',
        //   query: {username: this.username}
        // });
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
    fetchData() {

      this.$axios
        .post('http://localhost:8088/admin/deviceinfo', {
          username: this.username,
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.deviceNum = successResponse.data.message;
            // console.log(this.deviceNum)
            this.stringList = successResponse.data.stringList;
            // this.tableData = []
            this.messageTable = []

            for (let i = 0; i < this.deviceNum; i++) {

              let device_str = this.stringList[i];
              let device_id = device_str.substring(device_str.indexOf('id') + 3, device_str.indexOf(','));
              this.deviceList.push({ id: device_id });

              this.$axios
                .post('http://localhost:8088/admin/devicemessage', {
                  device_id: device_id,
                })
                .then(successResponse => {
                  if (successResponse.data.code === 200) {
                    let path = [];
                    let messageNum = successResponse.data.message;
                    // console.log(messageNum)
                    let start = 0;
                    if (messageNum > 10){
                      start = messageNum - 10;
                      this.tooMuch_visible = true;
                    }
                    // console.log(messageNum)

                    for (let i = start; i < messageNum; i++) {
                      let message_str = successResponse.data.stringList[i];
                      let temp_point = {
                        lat: parseFloat(message_str.substring(message_str.indexOf('lat') + 4, message_str.indexOf('lng') - 1)),
                        lng: parseFloat(message_str.substring(message_str.indexOf('lng') + 4, message_str.indexOf('log_time') - 1))
                      }
                      this.messageTable.push({
                        device_id: message_str.substring(message_str.indexOf('device_id') + 10, message_str.indexOf('alert') - 1),
                        log_time: message_str.substring(message_str.indexOf('log_time') + 9, message_str.length - 3),
                        alert: message_str.substring(message_str.indexOf('alert') + 6, message_str.indexOf('lat') - 1),
                        point: temp_point
                      });
                      let point = new BMap.Point(temp_point.lng, temp_point.lat)
                      var marker = new BMap.Marker(point)
                      this.map.addOverlay(marker);
                      let opts = {
                        width: 228,     // 信息窗口宽度
                        height: 100,     // 信息窗口高度
                        // font_size: 100,
                        title: "设备 "+message_str.substring(message_str.indexOf('device_id') + 10, message_str.indexOf('alert') - 1)+" 信息详情", // 信息窗口标题
                      }
                      let infoWindow = new BMap.InfoWindow("上线时间："+message_str.substring(message_str.indexOf('log_time') + 9, message_str.length - 3)+"  经度："+ temp_point.lng+" 纬度："+ temp_point.lat + "    警告信息：" + message_str.substring(message_str.indexOf('alert') + 6, message_str.indexOf('lat') - 1), opts);  // 创建信息窗口对象
                      marker.addEventListener("click", function(){
                        this.map.openInfoWindow(infoWindow, point); //开启信息窗口
                      });
                      path.push(point)
                    }
                    var line = new BMap.Polyline(path, {
                        strokeColor: 'blue',
                        strokeWeight: 2,
                        strokeOpacity: 0.5
                      });
                    this.map.addOverlay(line);

                  } else if (successResponse.data.code === 404) {
                    alert('访问设备失败')
                  }
                })
                .catch(failResponse => {
                });
            }
          } else if (successResponse.data.code === 404) {
            alert('访问设备失败')
          }
        })
        .catch(failResponse => {
        });
    },

    //输入框
    inputfz() {
      this.keyword = this.input3;
      let showAll = false;
      if(this.keyword === ''){
        showAll = true;
      }
      let found = false;
      let path = [];
      let former_id = '';
      let former_point;
      for (let i = 0; i < this.messageTable.length; i++) {
        let m = this.messageTable[i];
        let point = new BMap.Point(m.point.lng, m.point.lat)

        if(showAll && former_id===m.device_id){
          let this_line = [former_point, point];
          let all_line = new BMap.Polyline(this_line, {
            strokeColor: 'blue',
            strokeWeight: 2,
            strokeOpacity: 0.5
          });
          this.map.addOverlay(all_line);
        }
        if(m.device_id === this.keyword || showAll){
          if(found === false){
            found = true;
            this.map.clearOverlays();
          }
          var marker = new BMap.Marker(point)
          this.map.addOverlay(marker);
          let opts = {
            width: 228,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title: "设备 "+m.device_id+" 信息详情", // 信息窗口标题
          }
          let infoWindow = new BMap.InfoWindow("上线时间："+m.log_time+"经度："+ m.point.lng+" 纬度："+ m.point.lat+"  警告信息：" + m.alert, opts);  // 创建信息窗口对象
          marker.addEventListener("click", function(){
            this.map.openInfoWindow(infoWindow, point); //开启信息窗口
          });
          path.push(point);
          former_id = m.device_id;
          former_point = point;
        }
      }
      if(found === true && !showAll){
        var line = new BMap.Polyline(path, {
          strokeColor: 'blue',
          strokeWeight: 2,
          strokeOpacity: 0.5
        });
        this.map.addOverlay(line);
      }
      if(found === false){
        alert("设备不存在")
      }
    },
    //地图加载后的回调
    mapReady({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      let _this = this
    },
  },
};
</script>

<template>
  <div class="body">

    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#2A7A88" text-color="#fff" active-text-color="#ffd04b" style="z-index: 11">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>个人信息</span>
        </template>
        <el-menu-item index="1-1">查看信息</el-menu-item>
        <el-menu-item index="1-2">编辑信息</el-menu-item>
        <el-menu-item index="1-3">回到首页</el-menu-item>
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
    <div>
      <el-card style="height: 89vh">
        <el-input placeholder="请输入要查询的设备ID" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="inputfz">搜索</el-button>
        </el-input>
        <baidu-map class="bm-view" scroll-wheel-zoom :zoom="mapZoom" :center="center_point" inertial-dragging
          @ready="mapReady">
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
<!--          <bm-local-search :keyword="keyword" @searchcomplete="search" :auto-viewport="true"-->
<!--            class="search"></bm-local-search>-->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
<!--          <bm-marker v-for="m in messageTable" :position="m.point" @click="handleDetail(m)"></bm-marker>-->
        </baidu-map>
      </el-card>
    </div>
    <el-alert v-if="tooMuch_visible" title="消息数量太多，每个设备只显示最近10条" type="warning" show-icon class="title-style"></el-alert>
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
  z-index: 0;
}

.username-style {
  position: absolute;
  top: 2px;
  right: 65px;
  font-size: 25px;
  color: #fff;
  z-index: 15;
}

/* 给个宽高 */
.bm-view {
  position: absolute;
  left: 0;
  top: 60px;
  height: 90%;
  width: 100%;
}

.input-with-select {
  position: absolute;
  left: 7%;
  width: 400px;
  margin-bottom: 5px;
  z-index: 10;
}

.title-style {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 50px;
}
</style>
