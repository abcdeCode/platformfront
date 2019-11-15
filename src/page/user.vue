<template>
  <section>
    <mu-container class="demo-container">
      <header-login></header-login>
      <mu-row :column="2">
        <header-item></header-item>

        <mu-row :column="98" tablet="98" desktop="98">
          <mu-paper :z-depth="1">
            <mu-button color="primary" @click="dakai">添加</mu-button>
            <mu-data-table
              height="500"
              :columns="columns"
              :sort.sync="sort"
              @sort-change="handleSortChange"
              :data="list"
            >
              <template slot-scope="scope">
                <td>{{scope.row.username}}</td>
                <td class="is-right">{{scope.row.email}}</td>
                <td class="is-right">
                  <span>
                    <button class="btn btn-default" @click="deleteone(scope.row.id)">删除</button>
                  </span>
                  <span>
                    <button class="btn btn-default" @click="resetpassowd(scope.row.id)">重置</button>
                  </span>
                  <span>
                    <button class="btn btn-default" @click="setadmin(scope.row.id)">管理</button>
                  </span>
                </td>
              </template>
            </mu-data-table>
          </mu-paper>
        </mu-row>
      </mu-row>
    </mu-container>
    <mu-dialog
      title="添加用户"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openFullscreen"
    >
      <div style="padding: 24px;">
        <mu-form ref="form" :model="validateForm">
          <Form :model="validateForm" :label-width="80" ref="formValidate">
            <mu-text-field
              v-model="value13"
              label="UserName"
              label-float
              help-text="用户名为6-20长度的字符"
              :max-length="20"
            ></mu-text-field>
            <br />
            <Form-item label="邮箱">
              邮箱
              <p>
                <input
                  v-model="validateForm.remarks"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="用户邮箱"
                />
              </p>
            </Form-item>
            <Form-item label="密码">
              密码：
              <p>
                <input
                  v-model="validateForm.password"
                  label="Password"
                  icon="locked"
                  :type="visibility ? 'text' : 'password'"
                />
              </p>
            </Form-item>
            <Form-item label="密码">
              密码：
              <p>
                <input
                  v-model="validateForm.querenpassword"
                  label="Password"
                  icon="locked"
                  :type="visibility ? 'text' : 'password'"
                  @change="bidui"
                />
              </p>
            </Form-item>
          </Form>
        </mu-form>
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialogone">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="append">添加</mu-button>
      </div>
    </mu-dialog>
    <mu-dialog
      title="退出"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert"
    >
      确定退出登录吗？
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="tuichu">退出</mu-button>
    </mu-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      sort: {
        name: "",
        order: "asc"
      },
      value13: "",
      userid: localStorage.getItem("username"),
      columns: [
        { title: "username", width: 200, name: "name" },
        {
          title: "email",
          name: "calories",
          width: 200,
          align: "center",
          sortable: true
        },
        {
          title: "操作",
          name: "fat",
          width: 400,
          align: "center",
          sortable: true
        }
      ],
      list: [],
      validateForm: {
        remarks: "",
        password: "",
        querenpassword: ""
      },
      openFullscreen: false,
      openAlert: false
    };
  },
  methods: {
    handleSortChange({ name, order }) {
      this.list = this.list.sort((a, b) =>
        order === "asc" ? a[name] - b[name] : b[name] - a[name]
      );
    },
    append() {
      fetch(this.Baseurl + "/user/create", {
        method: "POST",
        mode: "cors",
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
          "Content-Type": "application/x-www-form-urlencoded"
        },

        body:
          "username=" +
          this.value13 +
          "&password=" +
          this.validateForm.querenpassword +
          "&email=" +
          this.validateForm.remarks
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code != 0) {
            alert(responseData.msg);
          } else {
            alert("添加用户成功");
            window.location.reload();
          }
        })
        .catch(error => {
          alert("网络错误");
        });
    },
    deleteone(id) {
      fetch(this.Baseurl + "/user/delete?userid=" + id, {
        method: "GET",
        headers: {
          token: JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code != 0) {
            alert(responseData.msg);
          } else {
            window.location.reload();
          }
        })
        .catch(error => {
          alert("网络错误");
        });
    },
    resetpassowd(id) {
      fetch(this.Baseurl + "/user/resetpassword?id=" + id, {
        method: "GET",
        headers: {
          token: JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code != 0) {
            alert(responseData.msg);
          } else {
            alert("密码重置成：1111111");
          }
        })
        .catch(error => {
          alert("网络错误");
        });
    },
    setadmin(id) {
      fetch(this.Baseurl + "/user/setadmin?userid=" + id, {
        method: "GET",
        headers: {
          token: JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code != 0) {
            alert(responseData.msg);
          } else {
            alert("设置管理员成功");
          }
        })
        .catch(error => {
          alert("网络错误");
        });
    },
    dakai() {
      this.openFullscreen = true;
    },
    bidui() {
      if (this.validateForm.password != this.validateForm.querenpassword) {
        alert("两次密码不一致");
      }
    },
    logout() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    tuichu() {
      localStorage.clear();
      this.$router.push("/login");
    },
    closeAlertDialogone() {
      this.openFullscreen = false;
      this.validateForm.querenpassword = "";
      this.validateForm.password = "";
      this.validateForm.remarks = "";
    }
  },
  mounted() {
    var that = this;
    fetch(this.Baseurl + "/user/getuser", {
      method: "GET",
      mode: "cors",
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        if (responseData.code == 0) {
          this.list = responseData.data;
        } else if (responseData.code == 73 || responseData.code == 74) {
          this.$router.push("/login");
        }
      });
  }
};
</script>
