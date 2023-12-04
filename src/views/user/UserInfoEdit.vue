<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            userDescipt: '',
            activeIndex: '1',
            activeIndex2: '1',
            editContent: '',
            tableData: [],
            editRow: '',
            editIndex: 0,
            dialogFormVisible: false,
            passwordDialogVisible: false,
            exitVisible: false,
            comfirmPassword: '',
            newPassword: '',
            newPasswordAgain: '',
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
          console.log('fetch')
          if(this.username === '')
            this.username = this.$route.query.username;
          this.$axios
              .post('http://localhost:8088/admin/userinfo', {
                  username: this.username,
              })
              .then(successResponse => {
                  if (successResponse.data.code === 200) {
                      this.email = successResponse.data.userInfo.email;
                      this.password = successResponse.data.userInfo.password;
                      this.userDescipt = successResponse.data.userInfo.user_descript;
                      // console.log(this.userDescipt)
                      this.tableData = [
                          {
                              type: '用户名',
                              data: this.username,
                          },
                          {
                              type: '邮箱',
                              data: this.email,
                          },
                          {
                              type: '个人描述',
                              data: this.userDescipt,
                          }
                      ]
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
                this.$router.push({
                    path: '/user/userinfo',
                    query: { username: this.username }
                });
            } else if (key === '1-2') {
                // this.$router.push({
                //   path: '/user/edituserinfo',
                //   query: { username: this.username }
                // });
            } else if (key === '1-3') {
              this.$router.push({
                path: '/UserHome',
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

        handleEditButton(index, row) {
            this.editRow = "请输入你的新" + row.type;
            this.editIndex = index;
            this.dialogFormVisible = true;
            console.log(this.editIndex);
        },

        handleEdit() {
            if (this.editContent === '') {
                alert('输入不能为空')
                return
            }
            this.dialogFormVisible = false;
            this.tableData[this.editIndex].data = this.editContent;
            // console.log(this.editIndex)
            const index = this.editIndex;
            this.$axios
                .post('http://localhost:8088/admin/userinfoedit', {
                    username: this.username,
                    editContent: this.editContent,
                    editIndex: this.editIndex,
                })
                .then(successResponse => {
                    if (successResponse.data.code === 200) {
                      alert('修改成功')
                      this.editIndex = index;
                      console.log(this.editIndex)
                        if (this.editIndex === 1) this.email = this.editContent;
                        else if (this.editIndex === 2) this.userDescipt = this.editContent;
                        else if (this.editIndex === 0)
                            this.username = this.editContent;

                    } else if (successResponse.data.code === 250) {
                        alert('用户名已经存在')
                    }
                })
                .catch(failResponse => {
                })
            this.editRow = ''
            this.editIndex = 0
            this.editContent = ''
        },
        handleEditPassword() {
            if (this.comfirmPassword === '' || this.newPassword === '' || this.newPasswordAgain === '') {
                alert('输入不能为空')
                return
            }
            if (this.password !== this.comfirmPassword) {
                alert('原始密码错误')
                return
            }
            if (this.password === this.newPassword) {
                alert('新密码不能与原始密码相同')
                return
            }
            if (this.newPassword !== this.newPasswordAgain) {
                alert('两次输入的密码不一致')
                return
            }
            this.$axios
                .post('http://localhost:8088/admin/userinfoedit', {
                    username: this.username,
                    editContent: this.newPassword,
                    editIndex: 5,
                })
                .then(successResponse => {
                    if (successResponse.data.code === 200) {
                        alert('修改成功')
                        this.password = this.newPassword;
                    } else if (successResponse.data.code === 250) {
                        alert('原始密码错误')
                    }
                })
                .catch(failResponse => {
                })
          this.passwordDialogVisible = false;
        },
        handleExit() {
            this.$router.push({
                path: '/login',
            });
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
            <el-button size="mini" @click="exitVisible = true" class="exit-style">退出登录</el-button>
        </el-menu>

        <el-dialog title="确认退出登录？" :visible.sync="exitVisible" width="30%" :before-close="handleExit">
            <div slot="footer" class="dialog-footer">
                <el-button @click="exitVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleExit()">确 定</el-button>
            </div>
        </el-dialog>

        <h1 class="username-style">{{ username }}</h1>
<!--        <div class="demo-basic&#45;&#45;circle" style="position: relative; top: -50px; left: 30%;">-->
<!--            <div class="block"><el-avatar size="40" icon="el-icon-user-solid"></el-avatar></div>-->
<!--            <div class="block" v-for="size in sizeList" :key="size">-->
<!--                <el-avatar size="size" icon="el-icon-user-solid"></el-avatar>-->
<!--            </div>-->
<!--        </div>-->

        <el-table :data="tableData" stripe border class="table-style">
            <el-table-column label="编辑选项" prop="type" width="160">
            </el-table-column>
            <el-table-column label="内容" prop="data" width="280">
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEditButton(scope.$index, scope.row)">编辑</el-button>
                </template>

            </el-table-column>
        </el-table>
        <br><br>
        <el-button @click="passwordDialogVisible = true" class="editpassword-style">修改密码</el-button>

        <el-dialog title="修改密码" :visible.sync="passwordDialogVisible">
            <el-form :model="form">
                <el-form-item label="请输入原始密码" :label-width="formLabelWidth">
                    <el-input v-model="comfirmPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="请输入新密码" :label-width="formLabelWidth">
                    <el-input v-model="newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="请再次输入新密码" :label-width="formLabelWidth">
                    <el-input v-model="newPasswordAgain" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditPassword()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item :label="editRow" :label-width="formLabelWidth">
                    <el-input v-model="editContent" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit()">确 定</el-button>
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
    background-image: url("../../assets/userbackground.png");
    background-size: cover;
    z-index: 0;
}

.username-style {
    position: absolute;
    top: 2px;
    right: 130px;
    font-size: 25px;
    color: #fff;
}

.table-style {
    position: absolute;
    top: 35%;
    left: 42%;
    float: left;
    width: auto;
    font-family: 'Exo', sans-serif;
    font-size: 18px;
}

.exit-style {
    position: absolute;
    top: 17px;
    right: 12px;
}

.editpassword-style {
    position: absolute;
    top: 70%;
    left: 70%;
    float: left;
    font-family: 'Exo', sans-serif;
    font-size: 18px;
}
</style>
