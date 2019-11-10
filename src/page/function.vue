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
            <mu-button color="primary" @click="addfunction">添加</mu-button>
            <br />
            <strong>选择项目</strong>
            <br />
            <mu-select v-model="projectadd" @change="getcase">
              <mu-option
                v-for="option,index in options"
                :key="option.id"
                :label="option.projectname"
                :value="option.id"
              ></mu-option>
            </mu-select>
            <br />
            <mu-dialog
              :title="this.title"
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
                      <mu-select v-model="projectselse" placeholder="请选择" @change="gettestcase">
                        <mu-option
                          v-for="project ,index in options"
                          :key="project.id"
                          :label="project.projectname"
                          :value="project.id"
                        ></mu-option>
                      </mu-select>
                    </p>
                  </Form-item>
                  <Form-item label="测试集名称">
                    <p>
                      测试集名称:
                      <input placeholder="测试集名称" v-model="casejihe" />
                    </p>
                  </Form-item>
                  <Form-item prop="select" label="测试用例">
                    <p>
                      测试用例
                      <mu-select multiple v-model="caseid" placeholder="请选择">
                        <mu-option
                          v-for="project ,index in caselist"
                          :key="project.id"
                          :label="project.numbering"
                          :value="project.id"
                        ></mu-option>
                      </mu-select>
                    </p>
                  </Form-item>
                  <Form-item prop="select" label="测试环境">
                    <p>
                      测试环境
                      <mu-select v-model="testentyc" placeholder="请选择">
                        <mu-option
                          v-for="project ,index in testeventlist"
                          :key="project.id"
                          :label="project.url"
                          :value="project.id"
                        ></mu-option>
                      </mu-select>
                    </p>
                  </Form-item>
                </Form>
              </mu-form>
              <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
              <mu-button slot="actions" flat color="primary" @click="bianji">编辑</mu-button>
            </mu-dialog>
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
                <td>{{scope.row.funtionname}}</td>
                <td>{{scope.row.totalnum}}</td>
                <td class="is-right">{{scope.row.runtime}}</td>
                <td v-if="scope.row.result == 'fail'">
                  <mu-button small flat color="red">失败</mu-button>
                </td>
                <td v-else-if="scope.row.result == 'pass'">
                  <mu-button small flat color="success">成功</mu-button>
                </td>
                <td v-else-if="scope.row.result == 'excetion'">
                  <mu-button small flat color="success">异常</mu-button>
                </td>
                <td v-else>
                  <mu-button small flat color="primary"></mu-button>
                </td>
                <td>
                  <span>
                    <a @click="edit(scope.row.fid)">编辑</a>
                    <a @click="dakai(scope.row.fid)">详情</a>
                    <a @click="runcase(scope.row.fid)">执行</a>
                    <a @click="deleteone(scope.row.fid)">删除</a>
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
      title="测试集合详情"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="detailopen"
    >
      <div>测试详情</div>
      <br />
      <mu-button color="primary">
        <mu-icon value="grade" left></mu-icon>
        今日执行 {{this.todaynum}}
      </mu-button>
      <mu-button color="primary">
        <mu-icon value left></mu-icon>
        total {{this.totalnum}}
      </mu-button>
      <mu-button color="success">
        <mu-icon value left></mu-icon>
        pass {{this.passnum}}
      </mu-button>
      <mu-button color="red">
        <mu-icon value left></mu-icon>
        fail {{this.failnum}}
      </mu-button>
      <br />
      <p></p>
      <div id="baidumain" style="height:2px;margin-left: 12%;margin-top: 10px"></div>
      <p>各次执行测试集合展示</p>
      <mu-data-table
        :columns="columndeta"
        :data="listdatal"
        style=" 
    display: block;
    height:400px;
    overflow-y: scroll;
    overflow-x: scroll;"
      >
        <template slot-scope="scope">
          <td class="passnum">{{scope.row.passnum}}</td>
          <td class="failnum">{{scope.row.failnum}}</td>
          <td class="is-right">{{scope.row.exection}}</td>
          <td class="time">{{scope.row.times}}</td>
        </template>
      </mu-data-table>
      <mu-button slot="actions" flat color="primary" @click="closederailopen">取消</mu-button>
    </mu-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      openAlert1: false,
      options: [],
      projectadd: "",
      openAlertone: false,
      list: [],
      projectselse: "",
      title: "",
      casejihe: "",
      testeventlist: [],
      caselist: [],
      testentyc: "",
      detailopen: false,
      caseid: "",
      editid: "",
      resultfun: "",
      resultid: "",
      todaynum: 0,
      passnum: 0,
      failnum: 0,
      totalnum: 0,
      listdatal: [],
      validateForm: "",
      userid: localStorage.getItem("username"),
      columns: [
        { title: "测试名称", name: "name", sortable: true },
        { title: "用例数" },
        { title: "最近一次运行时间", sortable: true, width: 200 },
        { title: "运行结果" },
        { title: "操作", sortable: true, width: 200 }
      ],
      columndeta: [
        { title: "通过", name: "name", sortable: true },
        { title: "失败", name: "name", sortable: true },
        { title: "异常", name: "name", sortable: true },
        { title: "时间", name: "name", sortable: true }
      ]
    };
  },
  methods: {
    result(id) {
      this.resultid = id;
    },
    runcase(id) {
      var that = this;
      fetch(
        this.Baseurl +
          "/fuction/excution?id=" +
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
            alert(responseData.data);
            window.location.reload();
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    dakai(id) {
      this.detailopen = true;
      var that = this;
      fetch(this.Baseurl + "/fuction/getdetail?id=" + id, {
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
            this.todaynum = responseData.data.today;
            this.totalnum = responseData.data.total;
            this.passnum = responseData.data.pass;
            this.failnum = responseData.data.fail;
            this.listdatal = responseData.data.deatil;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    closederailopen() {
      this.detailopen = false;
    },

    edit(id) {
      this.openAlertone = true;
      this.title = "编辑";
      this.editid = id;
      var that = this;
      fetch(this.Baseurl + "/fuction/getone?getone=" + id, {
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
            this.projectselse = responseData.data.projectname;
            this.casejihe = responseData.data.funtionname;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
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

    addfunction() {
      this.openAlertone = true;
      this.title = "添加";
    },
    closeAlertDialog() {
      this.openAlertone = false;
      this.title = "";
      this.casejihe = "";
      this.caseid = "";
      this.testentyc = "";
      this.projectselse = "";
    },
    deleteone(id) {
      var that = this;
      fetch(this.Baseurl + "/fuction/deleteone?id=" + id, {
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
            alert("删除成功");
            window.location.reload();
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    gettestcase() {
      var that = this;
      fetch(
        this.Baseurl + "/testever/allproject?projectid=" + this.projectselse,
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
            this.testeventlist = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
      fetch(this.Baseurl + "/case/all_project?projectid=" + this.projectselse, {
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
            this.caselist = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    getcase() {
      var that = this;
      fetch(this.Baseurl + "/fuction/all?project=" + this.projectadd, {
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
            this.list = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    bianji() {
      if (this.title == "添加") {
        fetch(this.Baseurl + "/fuction/create", {
          method: "POST",
          mode: "cors",
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/x-www-form-urlencoded"
          },

          body:
            "projectid=" +
            this.projectselse +
            "&makeruser=" +
            JSON.parse(localStorage.getItem("userid")) +
            "&funtionname=" +
            this.casejihe +
            "&items=" +
            this.caseid +
            "&testeventment=" +
            this.testentyc
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
              alert("测试集合增加完毕");
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      } else if (this.title == "编辑") {
        fetch(this.Baseurl + "/fuction/create", {
          method: "PUT",
          mode: "cors",
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/x-www-form-urlencoded"
          },

          body:
            "projectid=" +
            this.projectselse +
            "&id=" +
            this.editid +
            "&makeruser=" +
            JSON.parse(localStorage.getItem("userid")) +
            "&funtionname=" +
            this.casejihe +
            "&items=" +
            this.caseid +
            "&testeventment=" +
            this.testentyc
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
              alert("测试集合编辑完毕");
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

