<template>
  <section>
    <mu-container class="demo-container">
      <mu-appbar title="接口测试平台" :zDepth="3">
        <mu-icon value="all_inclusive" color="#0091ea" slot="left"></mu-icon>
        <mu-badge content="12" slot="right" color="secondary">
          <mu-button icon>
            <mu-icon value="notifications"></mu-icon>
          </mu-button>
        </mu-badge>
        <mu-menu slot="right">
          <mu-button flat>{{userid}}</mu-button>
          <mu-list slot="content">
            <mu-list-item button @click="logout">
              <mu-list-item-content>
                <mu-list-item-title>退出</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item button @click="logout">
              <mu-list-item-content>
                <mu-list-item-title>修改密码</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </mu-appbar>
      <mu-row :column="2">
        <header-item></header-item>

        <mu-row :column="98" tablet="98" desktop="98">
          <mu-paper :z-depth="1">
            <mu-button color="primary" @click="addtestevent">添加</mu-button>
            <br />
            <strong>选择项目</strong>
            <br />
            <mu-select v-model="projectadd" @change="gettestenet">
              <mu-option
                v-for="option,index in options"
                :key="option.id"
                :label="option.projectname"
                :value="option.id"
              ></mu-option>
            </mu-select>
            <br />
            <mu-data-table
              :columns="columns"
              :data="list"
              style=" width: 950px;
    display: block;
    height:400px;
    overflow-y: scroll;
    overflow-x: scroll;"
            >
              <template slot-scope="scope">
                <td>{{scope.row.name}}</td>
                <td class="is-right">{{scope.row.url}}</td>
                <td class="is-right">{{scope.row.sqlhost}}</td>
                <td class="is-right">{{scope.row.sqlport}}</td>
                <td class="is-right">{{scope.row.sqluer}}</td>
                <td class="is-right">{{scope.row.sqlpassword}}</td>
                <td>
                  <span>
                    <button class="btn btn-default" @click="dakai(scope.row.id)">编辑</button>
                    <button class="btn btn-default" @click="delet1e(scope.row.id)">删除</button>
                  </span>
                </td>
              </template>
            </mu-data-table>
          </mu-paper>
        </mu-row>
      </mu-row>
    </mu-container>
    <mu-dialog
      title="退出"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert1"
    >
      确定退出登录吗？
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog1">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="tuichu1">退出</mu-button>
    </mu-dialog>
    <mu-dialog
      :title="title1"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlertone"
    >
      <mu-form ref="form" :model="validateForm">
        <Form :model="validateForm" :label-width="80" ref="formValidate">
          <Form-item prop="select" label="所属项目">
            <p>
              所属项目
              <mu-select v-model="projectdd2" placeholder="请选择">
                <mu-option
                  v-for="option,index in options"
                  :key="option.id"
                  :label="option.projectname"
                  :value="option.id"
                ></mu-option>
              </mu-select>
            </p>
          </Form-item>
          <Form-item label="bianhao">
            <p>
              测试环境名称
              <input
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="测试环境名称"
                v-model="validateForm.bianhao"
              />
            </p>
          </Form-item>
          <Form-item label="success">
            <p>
              环境地址
              <input
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="环境地址"
                v-model="successex"
              />
            </p>
          </Form-item>
          <Form-item label="yilai">
            <p>
              数据库主机
              <input
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="数据库主机"
                v-model="yilai"
              />
            </p>
          </Form-item>

          <Form-item label="chaxun">
            <p>
              数据库端口
              <input
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="数据库端口"
                v-model="sql"
              />
            </p>
          </Form-item>
          <Form-item label="chaxun">
            <p>
              数据库username
              <input
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="数据库username"
                v-model="sqlass"
              />
            </p>
          </Form-item>
          <Form-item label="fail">
            <p>
              数据库密码
              <input
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="数据库密码"
                v-model="failex"
              />
            </p>
          </Form-item>
        </Form>
      </mu-form>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="run">操作</mu-button>
    </mu-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      title1: "",
      projectdd2: "",
      openAlert1: false,
      options: [],
      projectadd: "",
      openAlertone: false,
      list: [],
      successex: "",
      yilai: "",
      sql: "",
      sqlass: "",
      failex: "",
      bianjiid: "",
      userid: localStorage.getItem("username"),
      validateForm: {
        bianhao: ""
      },
      columns: [
        { title: "环境名称" },
        { title: "环境地址" },
        { title: "数据库主机" },
        { title: "数据库端口" },
        { title: "数据库用户名" },
        { title: "数据库密码" },
        { title: "操作" }
      ],
      bianji: 0
    };
  },
  methods: {
    logout() {
      this.openAlert1 = true;
    },
    closeAlertDialog1() {
      this.openAlert1 = false;
    },
    tuichu1() {
      localStorage.clear();
      this.$router.push("/login");
    },
    delet1e(id) {
      var that = this;
      fetch(
        this.Baseurl +
          "/testever/delete?testid=" +
          id +
          "&userid=" +
          JSON.parse(localStorage.getItem("userid")),
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("token"))
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code == 0) {
            alert("删除成功");
            window.location.reload();
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    addtestevent() {
      this.title1 = "添加测试环境";
      this.openAlertone = true;
    },
    closeAlertDialog() {
      this.validateForm.bianhao = "";
      this.successex = "";
      this.yilai = "";
      this.sql = "";
      this.sqlass = "";
      this.failex = "";
      this.openAlertone = false;
    },
    gettestenet() {
      var that = this;
      fetch(
        this.Baseurl + "/testever/allproject?projectid=" + this.projectadd,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("token"))
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code == 0) {
            this.list = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    dakai(id) {
      this.bianjiid = id;
      this.openAlertone = true;
      this.title1 = "编辑测试环境";
      var that = this;
      fetch(this.Baseurl + "/testever/getone?id=" + id, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code == 0) {
            this.validateForm.bianhao = responseData.data.name;
            this.successex = responseData.data.url;
            this.yilai = responseData.data.sqlhost;
            this.sql = responseData.data.sqlport;
            this.sqlass = responseData.data.sqluer;
            this.failex = responseData.data.sqlpassword;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          }
        });
    },
    run() {
      if (this.title1 == "添加测试环境") {
        fetch(this.Baseurl + "/testever/create", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("token"))
          },

          body:
            "eventnames=" +
            this.validateForm.bianhao +
            "&url=" +
            this.successex +
            "&projectid=" +
            this.projectdd2 +
            "&sqlhost=" +
            this.yilai +
            "&sqlport=" +
            this.sql +
            "&sqluer=" +
            this.sqlass +
            "&sqlpassword=" +
            this.failex +
            "&userid=" +
            JSON.parse(localStorage.getItem("userid"))
        })
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            if (responseData.code == 73 || responseData.code == 74) {
              this.$router.push("/login");
            } else if (responseData.code != 0) {
              alert(responseData.msg);
            } else {
              alert("添加测试环境成功");
              this.validateForm.bianhao = "";
              this.successex = "";
              this.yilai = "";
              this.sql = "";
              this.sqlass = "";
              this.failex = "";
              this.openAlertone = false;
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      } else if ("编辑测试环境") {
        fetch(this.Baseurl + "/testever/create", {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("token"))
          },

          body:
            "eventnames=" +
            this.validateForm.bianhao +
            "&url=" +
            this.successex +
            "&projectid=" +
            this.projectdd2 +
            "&sqlhost=" +
            this.yilai +
            "&sqlport=" +
            this.sql +
            "&sqluer=" +
            this.sqlass +
            "&sqlpassword=" +
            this.failex +
            "&userid=" +
            JSON.parse(localStorage.getItem("userid")) +
            "&testid=" +
            this.bianjiid
        })
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            if (responseData.code == 73 || responseData.code == 74) {
              this.$router.push("/login");
            } else if (responseData.code != 0) {
              alert(responseData.msg);
            } else {
              alert("编辑测试环境成功");
              this.validateForm.bianhao = "";
              this.successex = "";
              this.yilai = "";
              this.sql = "";
              this.sqlass = "";
              this.failex = "";
              this.openAlertone = false;
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      }
    }
  },
  mounted() {
    var that = this;
    fetch(this.Baseurl + "/project/all", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: JSON.parse(localStorage.getItem("token"))
      }
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        if (responseData.code == 0) {
          this.options = responseData.data;
        } else if (responseData.code == 73 || responseData.code == 74) {
          this.$router.push("/login");
        } else {
          alert(responseData.msg);
        }
      });
  }
};
</script>
<style>
</style>


