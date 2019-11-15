<template>
  <section>
    <mu-container class="demo-container">
      <header-login></header-login>
      <mu-row :column="2">
        <header-item></header-item>

        <mu-row :column="98" tablet="98" desktop="98">
          <mu-paper :z-depth="1">
            <div class="am-g">
              <div class="am-u-sm-12 am-u-md-6">
                <div class="am-btn-toolbar">
                  <div class="am-btn-group am-btn-group-xs">
                    <button class="btn btn-default btn-success" @click="addtask">增加</button>
                  </div>
                </div>
              </div>
            </div>
            <strong>选择项目</strong>
            <br />
            <mu-select v-model="projectadd" @change="gettask">
              <mu-option
                v-for="option,index in options"
                :key="option.id"
                :label="option.projectname"
                :value="option.id"
              ></mu-option>
            </mu-select>
            <br />
            <div style=" display: block; height: 500px;overflow-y: scroll">
              <mu-data-table
                :columns="columns"
                :sort.sync="sort"
                @sort-change="handleSortChange"
                :data="list"
              >
                <template slot-scope="scope">
                  <td>{{scope.row.taskname}}</td>
                  <td class="is-right">{{scope.row.taskstarttime}}</td>
                  <td class="is-right">{{scope.row.testenviroment}}</td>
                  <td class="is-right">{{scope.row.project}}</td>
                  <td class="is-right">{{scope.row.user}}</td>
                  <td>
                    <!-- <span> -->
                    <!-- <button  class="btn btn-default " @click="dakai(scope.row.id)">
                                编辑
                            </button></span>
                    -->
                    <button class="btn btn-default" @click="deletetime(scope.row.id)">删除</button>
                    <button class="btn btn-default" @click="addtimecase(scope.row.id)">用例</button>
                  </td>
                  <td>
                    <button class="btn btn-default" @click="starttimetask(scope.row.id)">启动</button>
                    <!--                             
                            <button  class="btn btn-default " >
                                暂停
                            </button>
                            <button  class="btn btn-default ">
                                恢复
                    </button>-->
                  </td>
                </template>
              </mu-data-table>
            </div>
            <mu-dialog
              title="添加定时任务"
              width="600"
              max-width="80%"
              :esc-press-close="false"
              :overlay-close="false"
              :open.sync="openaddd"
            >
              <div style="padding: 24px;">
                <mu-form ref="form" :model="validateForm">
                  <Form :model="validateForm" :label-width="80" ref="formValidate">
                    <Form-item prop="select" label="所属项目">
                      <p>
                        所属项目
                        <mu-select v-model="addproejct" placeholder="请选择" @change="getetst">
                          <mu-option
                            v-for="project ,index in options"
                            :key="project.id"
                            :label="project.projectname"
                            :value="project.id"
                          ></mu-option>
                        </mu-select>
                      </p>
                    </Form-item>
                    <input v-model="name" placeholder="请输入定时任务的名称" />
                    <br />
                    <input v-model="time" placeholder="请输入定时任务的执行时间" />
                    <br />
                    <p>
                      所属测试环境
                      <mu-select v-model="testevenst" placeholder="请选择">
                        <mu-option
                          v-for="project ,index in testevents"
                          :key="project.id"
                          :label="project.name"
                          :value="project.name"
                        ></mu-option>
                      </mu-select>
                    </p>
                  </Form>
                </mu-form>
                <br />
                <mu-button slot="actions" flat color="primary" @click="colseadd">取消</mu-button>
                <mu-button slot="actions" flat color="primary" @click="addtitask">添加</mu-button>
              </div>
            </mu-dialog>

            <mu-dialog
              title="添加用例"
              width="600"
              max-width="80%"
              :esc-press-close="false"
              :overlay-close="false"
              :open.sync="openFullscreen"
            >
              <div style="padding: 24px;">
                <p>
                  <strong>现有用例</strong>
                </p>
                <label v-for=" timecask in timetaskcase ">
                  <span>{{timecask.case}}</span>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                </label>
                <br />
                <label>选择新的用例</label>
                <br />
                <select multiple v-model="checkboxModel">
                  <option
                    v-for="prject in projectcaselist"
                    v-bind:value="prject.caseid"
                  >{{ prject.case }}</option>
                </select>
                <br />
                <mu-button slot="actions" flat color="primary" @click="closecase">取消</mu-button>
                <mu-button slot="actions" flat color="primary" @click="append">添加</mu-button>
              </div>
            </mu-dialog>
          </mu-paper>
        </mu-row>
      </mu-row>
    </mu-container>
    <logoutis></logoutis>
  </section>
</template>
<script>
export default {
  data() {
    return {
      checkbox: {
        value1: [],
        value2: false,
        value3: false
      },
      userid: localStorage.getItem("username"),
      columns: [
        { title: "任务名称", name: "name" },
        { title: "任务执行时间" },
        { title: "测试环境" },
        { title: "所属项目" },
        { title: "添加人" },
        { title: "操作" },
        { title: "执行" }
      ],
      list: [],
      options: [],
      addproejct: "",
      name: "",
      time: "",
      testevenst: "",
      openaddd: false,
      projectadd: "",
      openFullscreen: false,
      timetaskid: "",
      openAlert: false,
      timetaskcase: [],
      projects_task: "",
      projectcaselist: "",
      checkbox: "",
      checkboxModel: "",
      testevents: []
    };
  },
  mounted() {
    var that = this;

    fetch(this.Baseurl + "/project/all", {
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
          this.options = responseData.data;
        } else if (responseData.code == 73 || responseData.code == 74) {
          this.$router.push("/login");
        } else {
          alert(responseData.msg);
        }
      });
  },
  methods: {
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
    addtask() {
      this.openaddd = true;
    },
    addtitask() {
      if (this.addproejct == "") {
        alert("项目不能为空");
      } else {
        if (this.name == "") {
          alert("任务名称不能为空");
        } else {
          if (this.time == "") {
            alert("任务时间不能为空");
          } else {
            if (this.testevenst == "") {
              alert("任务测试环境不能为空");
            } else {
              fetch(this.Baseurl + "/timed/create", {
                method: "POST",
                mode: "cors",
                headers: {
                  token: JSON.parse(localStorage.getItem("token")),
                  "Content-Type": "application/x-www-form-urlencoded"
                },

                body:
                  "testenviroment=" +
                  this.testevenst +
                  "&taskstarttime=" +
                  this.time +
                  "&taskname=" +
                  this.name +
                  "&project=" +
                  this.addproejct +
                  "&makeuser=" +
                  JSON.parse(localStorage.getItem("userid"))
              })
                .then(response => {
                  return response.json();
                })
                .then(responseData => {
                  if (responseData.code != 0) {
                    alert(responseData.msg);
                  } else if (
                    responseData.code == 73 ||
                    responseData.code == 74
                  ) {
                    this.$router.push("/login");
                  } else {
                    alert("定时任务增加成功，请选择case增加定时任务的case");
                    window.location.reload();
                  }
                })
                .catch(error => {
                  alert("网络错误");
                });
            }
          }
        }
      }
    },
    getetst() {
      var that = this;
      fetch(
        this.Baseurl + "/testever/allproject?projectid=" + this.addproejct,
        {
          method: "GET",
          mode: "cors",
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code == 0) {
            this.testevents = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    colseadd() {
      this.openaddd = false;
    },
    append() {
      if (this.checkboxModel.length <= 1) {
        alert("用例没有重新选择，默认还是原用例");
        window.location.reload();
      } else {
        fetch(this.Baseurl + "/timedcase/add", {
          method: "POST",
          mode: "cors",
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/x-www-form-urlencoded"
          },

          body: "taskid=" + this.projectadd + "&caseid=" + this.checkboxModel
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
              alert("用例更新成功");
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      }
    },
    addtimecase(id) {
      this.openFullscreen = true;
      this.timetaskid = id;
      var that = this;
      fetch(this.Baseurl + "/timedcase/taskcase?taskid=" + this.projectadd, {
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
            this.timetaskcase = responseData.data.caselist;
            this.projects_task = responseData.data.projetc;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
      fetch(this.Baseurl + "/case/all_project?projectid=" + this.projectadd, {
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
            this.projectcaselist = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    closecase() {
      this.openFullscreen = false;
      this.timetaskid = "";
    },
    gettask() {
      var that = this;
      fetch(this.Baseurl + "/timed/projectall?projectid=" + this.projectadd, {
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
          } else {
            alert(responseData.msg);
          }
        });
    },
    deletetime() {
      var that = this;
      fetch(
        this.Baseurl +
          "/timed/delete?taskid=" +
          this.projectadd +
          "&userid=" +
          JSON.parse(localStorage.getItem("userid")),
        {
          method: "GET",
          mode: "cors",
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code == 0) {
            alert("删除任务成功");
            window.location.reload();
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    starttimetask() {
      var that = this;
      fetch(
        this.Baseurl +
          "/timed/starttimed?taskid=" +
          this.projectadd +
          "&userid=" +
          JSON.parse(localStorage.getItem("userid")),
        {
          method: "GET",
          mode: "cors",
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code == 0) {
            alert("启动任务成功");
            window.location.reload();
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    }
  }
};
</script>
