<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      username: this.$route.query.username,
      activeIndex: '1',
      activeIndex2: '1',
      deviceNum: '',
      tableData: [],
      stringList: [],
      onlineDeviceNum: 0,
      allMessageNum: 0,
      messageNumTable: [],
      dateArr: [],
      messageNumArr: [],

      option: {
        // 设置标题
        title: {
          text: '',//主标题 (主标题里面来动态显示当前数据总数)
          subtext: '总数',//副标题
          x: 'center',//标题x轴居中（也可以是: left || center || right || 百分比：xx% || xx(默认单位px)  ）
          y: 'center',//标题y轴居中（也可以是: top || center || bottom || 百分比：xx% || xx(默认单位px)  ）
          itemGap: -5,//主标题和副标题之间的距离(默认为 0)
          textStyle: {//设置主标题样式
            fontSize: 40,
            color: '#666',
            backroung: 'blue'
          },
          subtextStyle: {//设置副标题样式
            fontSize: 20,
            color: "#666"
          }
        },
        // 鼠标滑过显示悬浮框
        tooltip: {
          formatter: '{a}</br>{b}: {c} </br>所占比例: {d}%',
        },
        // 设置图例
        legend: {
          orient: 'vertical',//图例的排列方式 （默认 horizontal：水平方向排列 vertical：垂直方向排列）
          right: 'right',//图标在前文字在后，图例靠右居中显示 （也可以是: left || center || right || 百分比：xx% || xx(默认单位px)  ）
          y: 'center',//图例y轴居中（也可以是: top || center || bottom || 百分比：xx% || xx(默认单位px)  ）
          itemStyle: {},//设置图例前面的图标样式
          textStyle: {//设置图例文字样式
            fontSize: 14
          }
        },
        // 设置主体
        series: [
          {
            name: '消息总数', //echarts图名字
            type: 'pie',//echarts 类型
            minAngle: 5,//echarts数据value为0时默认为value为5
            radius: ['25%', '40%'],//设置环形图 （ radius: ['设置内圆大小', '设置外圆大小']  不折设置默认为实心圆饼图）
            center: ['50%', '50%'],//设置饼图位置 （center:['x轴位置','y轴位置']不设置默认在中间）
            data: [],
          }
        ]
      },

      option2: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          align:'right',//文字在前图标在后
          left:'3%',
          top:'20%',
          data: ['近一周']
        },
        grid: {
          top:'30%',
          left: '5%',
          right: '5%',
          bottom: '25%',
          containLabel: true
        },

        toolbox: {
          feature: {
            // saveAsImage: {} //保存为图片
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap:true,
          axisTick:{
            alignWithLabel:true //保证刻度线和标签对齐
          },
          data: this.dateArr //x坐标的名称

        },
        yAxis: {
          type: 'value',
          boundaryGap: true,
          splitNumber:10, //纵坐标数
          interval:1 //强制设置坐标轴分割间隔
        },

        series: [{
          name: '近一周',
          type: 'line', //折线图line;柱形图bar;饼图pie
          stack: '总量',
          areaStyle: {
            //显示区域颜色---渐变效果
            color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgb(255,200,213)' // 0% 处的颜色
              }, {
                offset: 1, color: '#ffffff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          itemStyle: {
            color: 'rgb(255,96,64)', //改变折线点的颜色
            lineStyle: {
              color: 'rgb(255,96,64)' //改变折线颜色
            }

          },
          data: this.messageNumArr
        }]

      }
    }

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
          // path: '/user/data',
          // query: { username: this.username }
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
              this.tableData = []
              for (let i = 0; i < this.deviceNum; i++) {
                let device_str = this.stringList[i];
                let device_id = device_str.substring(device_str.indexOf('id') + 3, device_str.indexOf(','));
                this.tableData.push({
                  id: device_id,
                  device_name: device_str.substring(device_str.indexOf('device_name') + 12, device_str.indexOf('device_type') - 2),
                  device_type: device_str.substring(device_str.indexOf('device_type') + 12, device_str.indexOf('device_discript') - 2),
                  device_discript: device_str.substring(device_str.indexOf('device_discript') + 16, device_str.indexOf('create_time') - 2),
                  create_time: device_str.substring(device_str.indexOf('create_time') + 12, device_str.length - 2),
                });

                this.$axios
                    .post('http://localhost:8088/admin/devicemessage', {
                      device_id: device_id,
                    })
                    .then(successResponse => {
                      if (successResponse.data.code === 200) {
                        var message_num = parseInt(successResponse.data.message)
                        this.allMessageNum += message_num;
                        // Calculate some value based on your requirements, e.g., message_num
                        this.messageNumTable.push({ value: message_num, name: 'Device ' + device_id });

                        if (successResponse.data.data === "true")
                          this.onlineDeviceNum += 1;

                      } else if (successResponse.data.code === 500) {
                        this.messageNumTable.push({value: 0, name: 'Device ' + device_id});
                      }
                      this.echartsInit()
                    });
              }


            } else if (successResponse.data.code === 404) {
              alert('访问用户失败')
            }
          })
          .catch(failResponse => {
          });

      this.$axios
          .post('http://localhost:8088/admin/datemessage', {
            username: this.username,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              let stringList = successResponse.data.stringList;
              for(let i=0; i<7; i++){
                // console.log(stringList[i])
                this.dateArr.push(stringList[i].substring(0, stringList[i].indexOf(':')));
                console.log(stringList[i].substring(0, stringList[i].indexOf(':')))
                this.messageNumArr.push(stringList[i].substring(stringList[i].indexOf(':')+1))
                console.log(stringList[i].substring(stringList[i].indexOf(':')+1))
              }

            }
            this.echartsInit2()
          });

    },

    echartsInit(){
      // console.log(this.option.series[0].data)
      this.option.series[0].data = this.messageNumTable;
      this.option.title.text = this.allMessageNum
      var chartDom = document.getElementById('type_chart');
      var myChart = echarts.init(chartDom);
      myChart.setOption(this.option);

    },

    echartsInit2(){
      this.option2.series[0].data = this.messageNumArr;
      // this.option2.title.text = this.allMessageNum
      this.option2.xAxis.data = this.dateArr;
      var chartDom2 = document.getElementById('data_chart');
      var myChart2 = echarts.init(chartDom2);
      myChart2.setOption(this.option2);
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

    <div class="top-style">
      <el-row :gutter="22">
        <el-col :span="4">
          <div>
            <el-statistic title="用户名">
              <template slot="formatter">
                {{ username }}
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic title="设备总数">
              <template slot="formatter">
                {{ deviceNum }}
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic title="当前在线数量">
              <template slot="formatter">
                {{ onlineDeviceNum }}
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic title="当前消息总数">
              <template slot="formatter">
                {{ allMessageNum }}
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
  <div id="type_chart"></div>
  <div id="data_chart"></div>
    <h1 style="position: relative; top: 23%; left: -30%;font-size: 28px;">设备消息总数</h1>
    <h1 style="position: relative; top: 15%; left: 20%;font-size: 28px;">最近一周消息数量</h1>

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
  //background-image: url("../../assets/fakedata.png");
  //background-size: cover;
  z-index: 0;
}

.username-style {
  position: absolute;
  top: 2px;
  right: 65px;
  font-size: 25px;
  color: #fff;
}

.top-style {
  position: absolute;
  top: 18%;
  left: 5%;
  width: 80%;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
}

#type_chart {
  position: absolute;
  top: 25%;
  width: 600px;
  height: 600px;
}

#data_chart{
  position: absolute;
  top: 25%;
  left: 50%;
  width: 600px;
  height: 600px;
}
</style>
