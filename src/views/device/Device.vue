<script>
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
      addFormVisible: false,
      editID: 0,
      editRow: {},
      editFormVisible: false,
      newDeviceName: '',
      newDeviceType: '',
      newDeviceDiscript: '',
      deleteFormVisible: false,
      deletRow: {},
      messageFormVisible: false,
      messageTable: [],
      allMessageNum: 0
    };
  },
  mounted() {
    this.fetchData(); // 在组件挂载后调用发送请求的方法
  },
  methods: {
    fetchData() {
      this.$axios
        .post('http://localhost:8088/admin/deviceinfo', {
          username: this.username,
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.deviceNum = successResponse.data.message;
            console.log(this.deviceNum)
            this.stringList = successResponse.data.stringList;
            this.tableData = []

            for (let i = 0; i < this.deviceNum; i++) {
              let device_str = this.stringList[i];
              let device_id = device_str.substring(device_str.indexOf('id') + 3, device_str.indexOf(','));
              let online = 'off';
              this.$axios
                .post('http://localhost:8088/admin/devicemessage', {
                  device_id: device_id,
                })
                .then(successResponse => {
                  if (successResponse.data.code === 200) {
                    this.allMessageNum += parseInt(successResponse.data.message) ;
                    if(successResponse.data.data === "true") {
                      this.onlineDeviceNum += 1;
                      online = 'on';
                    }
                    console.log(this.allMessageNum)
                    console.log(successResponse.data.data)
                  }
                });

              this.tableData.push({
                id: device_id,
                device_name: device_str.substring(device_str.indexOf('device_name') + 12, device_str.indexOf('device_type') - 2),
                device_type: device_str.substring(device_str.indexOf('device_type') + 12, device_str.indexOf('device_discript') - 2),
                device_discript: device_str.substring(device_str.indexOf('device_discript') + 16, device_str.indexOf('create_time') - 2),
                create_time: device_str.substring(device_str.indexOf('create_time') + 12, device_str.length - 2),
                online: online
              });
            }
          } else if (successResponse.data.code === 404) {
            alert('访问用户失败')
          }
        })
        .catch(failResponse => {
        });
    },

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
          // query: { username: this.username }
        });
      } else if (key === '2') {
        this.$router.push({
          path: '/user/map',
          query: { username: this.username }
        });
      } else if (key === '3') {
        // this.$router.push({
        //   path: '/user/device',
        //   query: { username: this.username }
        // });
      } else if (key === '4') {
        this.$router.push({
          path: '/user/data',
          query: { username: this.username }
        });
      }
    },

    handleClick(row) {
      this.editID = row.id;
      this.editRow = row;
      this.editFormVisible = true;
    },

    handleEdit() {
      this.$axios
        .post('http://localhost:8088/admin/deviceinfoedit', {
          device_id: this.editID,
          device_name: this.editRow.device_name,
          device_type: this.editRow.device_type,
          device_discript: this.editRow.device_discript,
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            alert('修改成功')
            this.editFormVisible = false
          } else if (successResponse.data.code === 404) {
            alert('修改失败')
          }
        })
        .catch(failResponse => {
          alert('修改成功')
        })
      this.editRow = {}
      this.editID = 0
    },

    handleMessage(row) {

      this.$axios
        .post('http://localhost:8088/admin/devicemessage', {
          device_id: row.id,
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            let messageNum = successResponse.data.message;
            console.log(messageNum);
            for (let i = 0; i < messageNum; i++) {
              this.messageFormVisible = true;
              let message_str = successResponse.data.stringList[i];
              this.messageTable.push({
                log_time: message_str.substring(message_str.indexOf('log_time') + 9, message_str.length - 3),
                alert: message_str.substring(message_str.indexOf('alert') + 6, message_str.indexOf('lat') - 1),
                lat: message_str.substring(message_str.indexOf('lat') + 4, message_str.indexOf('lng') - 1),
                lng: message_str.substring(message_str.indexOf('lng') + 4, message_str.indexOf('log_time') - 1),
              });
            }

          } else if (successResponse.data.code === 404) {
            alert('获取设备历史消息失败')
          } else if(successResponse.data.code === 500) {
            alert('当前设备暂无历史信息')
          }
        })
        .catch(failResponse => {
        })
    },

    handleAdd() {
      this.$axios
        .post('http://localhost:8088/admin/deviceinfoadd', {
          username: this.username,
          device_name: this.newDeviceName,
          device_type: this.newDeviceType,
          device_discript: this.newDeviceDiscript,
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            let new_id = successResponse.data.data
            alert('添加成功，设备ID为' + new_id + '')
            this.addFormVisible = false
          } else if (successResponse.data.code === 404) {
            alert('添加失败')
          }
        })
        .catch(failResponse => {
          alert('添加成功')
        })
      this.newDeviceName = ''
      this.newDeviceType = ''
      this.newDeviceDiscript = ''
      window.location.reload();
    },

    handleDelete(row) {
      this.deleteFormVisible = true;
      this.deletRow = row;
    },

    handleDeleteTrue() {
      this.$axios
        .post('http://localhost:8088/admin/deviceinfodelete', {
          device_id: this.deletRow.id,
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            alert('删除成功')
            this.deleteFormVisible = false
          } else if (successResponse.data.code === 404) {
            alert('删除失败')
          }
        })
        .catch(failResponse => {
          alert('删除成功')
        })
      this.deletRow = {}
      window.location.reload();
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
    <div class="demo-basic--circle" style="position: absolute; top: 12px; right: 150px;">
      <div class="block"><el-avatar size="40" icon="el-icon-user-solid"></el-avatar></div>
    </div>

    <el-table class="table-style" :data="tableData" height="400" border>
      <el-table-column fixed prop="id" label="设备ID" width="100">
      </el-table-column>
      <el-table-column prop="device_name" label="设备名称" width="130">
      </el-table-column>
      <el-table-column prop="device_type" label="设备类型" width="160">
      </el-table-column>
      <el-table-column prop="online" label="在线状态" width="100">
      </el-table-column>
      <el-table-column prop="device_discript" label="设备描述" width="300">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="190">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleMessage(scope.row)" type="text">查看设备历史信息</el-button>
          <br>
          <el-button @click="handleClick(scope.row)" type="text">编辑设备</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)">删除设备</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="设备历史消息" :visible.sync="messageFormVisible">
      <el-table width="auto" :data="messageTable" height="400" border>
        <el-table-column prop="log_time" label="时间" width="250">
        </el-table-column>
        <el-table-column prop="alert" label="警告信息" width="130">
        </el-table-column>
        <el-table-column prop="lat" label="纬度" width="170">
        </el-table-column>
        <el-table-column prop="lng" label="经度" width="170">
        </el-table-column>
      </el-table>
      <br>
      <el-button @click="messageFormVisible = false">关闭查看</el-button>
    </el-dialog>


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


    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="form">
        <el-form-item label="修改设备名称">
          <el-input v-model="editRow.device_name" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="修改设备类型">
          <el-select v-model="editRow.device_type">
            <el-option label="mobile_phone" value="mobile_phone"></el-option>
            <el-option label="telephone" value="telephone"></el-option>
            <el-option label="computer" value="computer"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改设备描述">
          <el-input v-model="editRow.device_discript" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>


    <el-button @click="addFormVisible = true" class="add-style">新增设备</el-button>
    <el-dialog title="新增设备" :visible.sync="addFormVisible">
      <el-form :model="form">
        <el-form-item label="设置新设备名称">
          <el-input v-model="newDeviceName" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="设置新设备类型">
          <el-select v-model="newDeviceType">
            <el-option label="mobile_phone" value="mobile_phone"></el-option>
            <el-option label="telephone" value="telephone"></el-option>
            <el-option label="computer" value="computer"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置新设备描述">
          <el-input v-model="newDeviceDiscript" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="确认删除设备？" :visible.sync="deleteFormVisible" width="30%">
      <div slot="footer" class="dialog-footer">
        <el-button @click="exitVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteTrue()">确 定</el-button>
      </div>
    </el-dialog>

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
  z-index: 0;
}

.username-style {
  position: absolute;
  top: 2px;
  right: 65px;
  font-size: 25px;
  color: #fff;
}

.table-style {
  position: absolute;
  top: 30%;
  left: 7%;
  width: auto;
  font-family: 'Exo', sans-serif;
  font-size: 16px;
}

.top-style {
  position: absolute;
  top: 18%;
  left: 5%;
  width: 80%;
  font-family: 'Exo', sans-serif;
  font-size: 28px;
}

.add-style {
  position: absolute;
  top: 20%;
  right: 15%;
}

.message-style {
  position: absolute;
  height: 600px;
  width: 1200px;
}
</style>
