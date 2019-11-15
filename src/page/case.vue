<template>
  <section>
    <mu-container class="demo-container">
      <header-login></header-login>
      <mu-row :column="2">
        <header-item></header-item>

        <mu-row :column="98" tablet="98" desktop="98">
          <mu-paper :z-depth="1">
            <mu-button color="primary" @click="addcase">添加</mu-button>
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
            <strong>多用例执行选择测试环境</strong>
            <mu-select v-model="testeven">
              <mu-option
                v-for="option,index in testevents_projct"
                :key="option.id"
                :label="option.name"
                :value="option.id"
              ></mu-option>
            </mu-select>
            <mu-button color="red" @click="manaycaserun">
              执行
              <mu-icon right value="send"></mu-icon>
            </mu-button>
            <mu-data-table
              selectable
              select-all
              :selects.sync="selects"
              checkbox
              :columns="columns"
              :data="list"
              style=" width: 950px; 
    overflow-x: scroll;"
            >
              <template slot-scope="scope">
                <td>{{scope.row.numbering}}</td>
                <td class="is-right">{{scope.row.interface}}</td>
                <td class="is-right">{{scope.row.headers}}</td>
                <td class="is-right">{{scope.row.parms}}</td>
                <td class="is-right">{{scope.row.assertCase}}</td>
                <td class="is-right">{{scope.row.makeuser}}</td>
                <td>
                  <span>
                    <a @click="dakai(scope.row.id)">编辑</a>
                    <a @click="runcase(scope.row.id)">执行</a>
                  </span>
                </td>
              </template>
            </mu-data-table>
            <mu-container>
              <mu-flex justify-content="center" style="margin: 32px 0;">
                <mu-pagination
                  raised
                  :total="total"
                  :current.sync="current"
                  @change="getpageproject"
                ></mu-pagination>
              </mu-flex>
            </mu-container>
          </mu-paper>
        </mu-row>
      </mu-row>
      <mu-dialog
        :title="title1"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="runcaseopne"
      >
        <p>
          测试环境
          <mu-select v-model="eventone">
            <mu-option
              v-for="option,index in testevents"
              :key="option.name"
              :label="option.name"
              :value="option.name"
            ></mu-option>
          </mu-select>
        </p>
        <mu-button slot="actions" flat color="primary" @click="close_AlertDialog">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="run_case_exce">执行case</mu-button>
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
                <mu-select v-model="projectdd" placeholder="请选择" @change="getinterfae">
                  <mu-option
                    v-for="option,index in options"
                    :key="option.id"
                    :label="option.projectname"
                    :value="option.id"
                  ></mu-option>
                </mu-select>
              </p>
            </Form-item>
            <Form :model="validateForm" :label-width="80" ref="formValidate">
              <Form-item prop="select" label="所属接口">
                <p>
                  所属接口
                  <mu-select v-model="interaceadd" placeholder="请选择">
                    <mu-option
                      v-for="project ,index in optionsinterface"
                      :key="project.name"
                      :label="project.name"
                      :value="project.name"
                    ></mu-option>
                  </mu-select>
                </p>
              </Form-item>
            </Form>
            <Form-item label="bianhao">
              <p>
                用例编号
                <input
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="用例编号"
                  v-model="validateForm.bianhao"
                />
              </p>
            </Form-item>
            <Form-item prop="method" label="请求方法">
              <p>
                请求方法
                <mu-select v-model="methodadd">
                  <mu-option
                    v-for="option,index in optionsme"
                    :key="option"
                    :label="option"
                    :value="option"
                  ></mu-option>
                </mu-select>
              </p>
            </Form-item>

            <Form-item label="headers">
              <p>
                case请求头
                <input
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="请求头"
                  v-model="qingqiutou"
                />
              </p>
            </Form-item>

            <Form-item label="success">
              <p>
                parms
                <input
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="参数"
                  v-model="successex"
                />
              </p>
            </Form-item>
            <mu-flex class="select-control-row">
              是否依赖用例
              <mu-switch v-model="switchVal.value1" label="switch" @change="get_case"></mu-switch>
            </mu-flex>
            <Form-item prop="case" label="用例">
              <p>
                用例
                <mu-select v-model="caseone">
                  <mu-option
                    v-for="option,index in caselist"
                    :key="option.numbering"
                    :label="option.numbering"
                    :value="option.numbering"
                    v-bind="get_case"
                  ></mu-option>
                </mu-select>
              </p>
            </Form-item>
            <Form-item label="yilai">
              <p>
                case依赖
                <input
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="依赖字段"
                  v-model="yilai"
                />
              </p>
            </Form-item>
            <mu-flex class="select-control-row">
              是否查询sql
              <mu-switch v-model="switchVal.value2" label="switch"></mu-switch>
            </mu-flex>
            <Form-item label="chaxun">
              <p>
                查询sql
                <input
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="查询sql"
                  v-model="sql"
                />
              </p>
            </Form-item>
            <Form-item label="chaxun">
              <p>
                字段
                <input
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="字段"
                  v-model="sqlass"
                />
              </p>
            </Form-item>
            <Form-item label="fail">
              <p>
                断言
                <input
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="断言"
                  v-model="failex"
                />
              </p>
            </Form-item>
          </Form>
        </mu-form>
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="run">执行</mu-button>
      </mu-dialog>
    </mu-container>
    <logoutis></logoutis>
  </section>
</template>
<script>
export default {
  data() {
    return {
      switchVal: {
        value1: false,
        value2: true,
        value3: false
      },
      userid: localStorage.getItem("username"),
      title1: "",
      selects: [],
      projectadd: "",
      projectdd: "",
      openAlertone: false,
      runcaseopne: false,
      interaceadd: "",
      caseone: "",
      optionsinterface: "",
      methodadd: "",
      eventone: "",
      options: "",
      id_bianji: "",
      yilai: "",
      bianhao: "",
      successex: "",
      failex: "",
      casep: "",
      qingqiutou: "",
      sqlass: "",
      sql: "",
      run_case: "",
      testeven: "",
      testevents_projct: "",
      testevents: [],
      columns: [
        { title: "编号", name: "name" },
        { title: "接口" },
        { title: "请求头" },
        { title: "请求参数" },
        { title: "断言" },
        { title: "添加人" },
        { title: "操作" }
      ],
      optionsme: ["GET", "POST", "PUT", "DELETE"],
      list: [],
      options: [],
      form: {
        select: ""
      },
      caselist: [],
      sql: "",
      openAlert1: false,
      validateForm: {
        path: "",
        qingqiutou: "",
        successex: "",
        failex: "",
        projectname: "",
        meark: "",
        method: "",
        projectadd: "",
        sqlass: "",
        yilai: "",
        sql: "",
        bianhao: ""
      },
      current: 1,
      total: 1
    };
  },
  methods: {
    handleSortChange({ name, order }) {
      this.selects = this.selects.sort((a, b) =>
        order === "asc" ? a[name] - b[name] : b[name] - a[name]
      );
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
    runcase(id) {
      this.runcaseopne = true;
      this.title1 = "选择用例环境";
      this.run_case = id;
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
            this.testevents = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert("没有测试环境");
          }
        });
    },
    logout() {
      this.$router.push("/login");
    },
    getpageproject() {
      this.list = [];
      this.total = 0;
      var that = this;
      fetch(
        this.Baseurl +
          "/case/getpage?project=" +
          this.projectadd +
          "&page=" +
          this.current,
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
            this.list = responseData.data.caselist;
            this.total = responseData.data.total;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    run() {
      if (this.title1 == "添加case") {
        fetch(this.Baseurl + "/case/create", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("token"))
          },

          body:
            "method=" +
            this.methodadd +
            "&numbering=" +
            this.validateForm.bianhao +
            "&assertCase=" +
            this.failex +
            "&headers=" +
            this.qingqiutou +
            "&parms=" +
            this.successex +
            "&pid=" +
            this.caseone +
            "&getattr=" +
            this.yilai +
            "&datasql=" +
            this.sql +
            "&project=" +
            this.projectdd +
            "&makeuser=" +
            JSON.parse(localStorage.getItem("userid")) +
            "&datafield=" +
            this.sqlass +
            "&interfaceid=" +
            this.interaceadd
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
              alert("添加接口成功");
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      } else if (this.title1 == "编辑case") {
        fetch(this.Baseurl + "/case/change", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("token"))
          },

          body:
            "method=" +
            this.methodadd +
            "&numbering=" +
            this.validateForm.bianhao +
            "&assertCase=" +
            this.failex +
            "&headers=" +
            this.qingqiutou +
            "&parms=" +
            this.successex +
            "&pid=" +
            this.caseone +
            "&getattr=" +
            this.yilai +
            "&datasql=" +
            this.sql +
            "&project=" +
            this.projectdd +
            "&makeuser=" +
            JSON.parse(localStorage.getItem("userid")) +
            "&datafield=" +
            this.sqlass +
            "&interfaceid=" +
            this.interaceadd +
            "&id=" +
            this.id_bianji
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
              alert("编辑接口成功");
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      }
    },
    addcase() {
      this.openAlertone = true;
      this.title1 = "添加case";
    },
    closeAlertDialog() {
      this.openAlertone = false;
      this.title1 = "";
    },
    dakai(id) {
      this.openAlertone = true;
      this.title1 = "编辑case";
      this.id_bianji = id;
      var that = this;
      fetch(this.Baseurl + "/case/getone?id=" + id, {
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
            this.qingqiutou = responseData.data.headers;
            this.successex = responseData.data.parms;
            this.validateForm.bianhao = responseData.data.numbering;
            this.sql = responseData.data.datasql;
            this.failex = responseData.data.assertCase;
            this.yilai = responseData.data.getattr;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    getcase() {
      this.list = [];
      this.total = 0;
      this.current = 0;
      var that = this;
      fetch(
        this.Baseurl +
          "/case/getpage?project=" +
          this.projectadd +
          "&page=" +
          this.current,
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
            this.list = responseData.data.caselist;
            this.total = responseData.data.total;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
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
            this.testevents_projct = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    manaycaserun() {
      var that = this;
      if (this.selects.length <= 1) {
        alert("选择测试用例");
      } else {
        if (this.testeven == "") {
          alert("请选择测试环境");
        } else {
          var arrayObj = new Array();
          var i = 0;
          for (var i = 0; i < this.selects.length; i++) {
            arrayObj.push(this.list[i].id);
          }
          fetch(this.Baseurl + "/case/multiecaseexcution", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              token: JSON.parse(localStorage.getItem("token"))
            },

            body:
              "project=" +
              this.projectadd +
              "&testeventid=" +
              this.testeven +
              "&item=" +
              arrayObj +
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
                alert("测试成功");
              }
            })
            .catch(error => {
              alert("网络错误");
            });
        }
      }
    },
    getinterfae() {
      var that = this;
      fetch(
        this.Baseurl + "/interface/allbyporject?projectid=" + this.projectdd,
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
            this.optionsinterface = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    get_case() {
      if (this.switchVal.value1 == true) {
        var that = this;
        fetch(
          this.Baseurl +
            "/case/projectinterfaceall?projectid=" +
            this.projectadd +
            "&interfaceid=" +
            this.interaceadd,
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
              this.caselist = responseData.data;
            } else if (responseData.code == 73 || responseData.code == 74) {
              this.$router.push("/login");
            } else {
              alert(responseData.msg);
            }
          });
      }
    },
    close_AlertDialog() {
      this.runcaseopne = false;
    },
    run_case_exce() {
      var that = this;
      fetch(
        this.Baseurl +
          "/case/executioncase?caseid=" +
          this.run_case +
          "&testeventid=" +
          this.eventone +
          "&userid=" +
          JSON.parse(localStorage.getItem("userid")) +
          "&projectname=" +
          this.projectadd,
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
            alert("测试成功");
            this.runcaseopne = false;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
            this.runcaseopne = false;
          }
        });
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
.mu-table-header {
  width: "";
}
</style>
