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
        <mu-col width="98" tablet="98" desktop="98">
          <div class="tpl-portlet-components" style="margin-top: -7px;width: 100%">
            <div class="portlet-title">
              <div class="caption font-green bold">
                <span class="am-icon-code"></span> 接口
              </div>
            </div>
            <div class="tpl-block">
              <div class="am-g">
                <div class="am-u-sm-12 am-u-md-6">
                  <div class="am-btn-toolbar">
                    <div class="am-btn-group am-btn-group-xs">
                      <button class="btn btn-default btn-success" @click="openFullscreenDialog">增加</button>
                    </div>
                  </div>
                </div>
              </div>
              <strong>选择项目</strong>
              <br />
              <mu-select v-model="getproject" @change="getprojectinterface">
                <mu-option
                  v-for="option,index in optionproject"
                  :key="option.id"
                  :label="option.projectname"
                  :value="option.id"
                ></mu-option>
              </mu-select>
              <mu-dialog
                title="添加接口"
                width="600"
                max-width="80%"
                :esc-press-close="false"
                :overlay-close="false"
                :open.sync="openAlert"
              >
                <mu-form ref="form" :model="validateForm">
                  <Form :model="validateForm" :label-width="80" ref="formValidate">
                    <Form-item prop="select" label="所属项目">
                      <p>
                        所属项目
                        <mu-select v-model="projectadd" placeholder="请选择">
                          <mu-option
                            v-for="project ,index in optionproject"
                            :key="project.projectname"
                            :label="project.projectname"
                            :value="project.projectname"
                          ></mu-option>
                        </mu-select>
                      </p>
                    </Form-item>
                    <Form-item label="接口名称">
                      <p>
                        接口名称:
                        <input placeholder="请输入接口名称" v-model="projectname" />
                      </p>
                    </Form-item>
                    <Form-item label="remark">
                      <p>
                        接口描述
                        <input
                          type="textarea"
                          :autosize="{minRows: 2,maxRows: 5}"
                          placeholder="接口描述"
                          v-model="meark"
                        />
                      </p>
                    </Form-item>
                    <Form-item label="remark">
                      <p>
                        接口路径
                        <input
                          type="textarea"
                          :autosize="{minRows: 2,maxRows: 5}"
                          placeholder="接口路径"
                          v-model="path"
                        />
                      </p>
                    </Form-item>
                    <Form-item prop="method" label="请求方法">
                      <p>
                        请求方法
                        <mu-select v-model="methodadd">
                          <mu-option
                            v-for="option,index in options"
                            :key="option"
                            :label="option"
                            :value="option"
                          ></mu-option>
                        </mu-select>
                      </p>
                    </Form-item>
                    <Form-item label="headers">
                      <p>
                        接口请求头
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
                        成功请求实例
                        <input
                          type="textarea"
                          :autosize="{minRows: 2,maxRows: 5}"
                          placeholder="成功请求实例"
                          v-model="successex"
                        />
                      </p>
                    </Form-item>
                    <Form-item label="fail">
                      <p>
                        失败请求示例
                        <input
                          type="textarea"
                          :autosize="{minRows: 2,maxRows: 5}"
                          placeholder="失败请求示例"
                          v-model="failex"
                        />
                      </p>
                    </Form-item>
                  </Form>
                </mu-form>
                <mu-button slot="actions" flat color="primary" @click="closeAlertDialogone">取消</mu-button>
                <mu-button slot="actions" flat color="primary" @click="append">添加</mu-button>
              </mu-dialog>
            </div>
            <table class="am-table table-main" style="height:450px">
              <caption>
                <strong></strong>
              </caption>
              <thead>
                <tr>
                  <th>接口名称</th>
                  <th>项目</th>
                  <th>接口路径</th>
                  <th>方法</th>
                  <th>请求头</th>
                  <th>成功示例</th>
                  <th>失败示例</th>
                  <th>备注</th>
                  <th>状态</th>
                  <th>创建人</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="todo in list1" :key="todo.id" :id="todo.id">
                  <td>
                    <strong>{{todo.name}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.project}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.url}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.method}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.headers}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.success}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.fail}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.remark}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.intstatus}}</strong>
                  </td>
                  <td>
                    <strong>{{todo.makeuser}}</strong>
                  </td>
                  <td>
                    <a @click="openAlertDialog(todo.id)">编辑</a>
                    <a @click="interfacedetail(todo.id)">详情</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <mu-container>
              <mu-flex justify-content="center" style="margin: 32px 0;">
                <mu-pagination raised :total="total" :current.sync="current" @change="get_project"></mu-pagination>
              </mu-flex>
            </mu-container>
          </div>
          <mu-dialog
            title="编辑接口"
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
                    <mu-select v-model="projectadd" placeholder="请选择">
                      <mu-option
                        v-for="project ,index in optionproject"
                        :key="project.projectname"
                        :label="project.projectname"
                        :value="project.projectname"
                      ></mu-option>
                    </mu-select>
                  </p>
                </Form-item>
                <Form-item label="接口名称">
                  <p>
                    接口名称:
                    <input placeholder="请输入接口名称" v-model="projectname" />
                  </p>
                </Form-item>
                <Form-item label="remark">
                  <p>
                    接口描述
                    <input
                      type="textarea"
                      :autosize="{minRows: 2,maxRows: 5}"
                      placeholder="接口描述"
                      v-model="meark"
                    />
                  </p>
                </Form-item>
                <Form-item label="remark">
                  <p>
                    接口路径
                    <input
                      type="textarea"
                      :autosize="{minRows: 2,maxRows: 5}"
                      placeholder="接口路径"
                      v-model="path"
                    />
                  </p>
                </Form-item>
                <Form-item prop="method" label="请求方法">
                  <p>
                    请求方法
                    <mu-select v-model="methodadd">
                      <mu-option
                        v-for="option,index in options"
                        :key="option"
                        :label="option"
                        :value="option"
                      ></mu-option>
                    </mu-select>
                  </p>
                </Form-item>
                <Form-item label="headers">
                  <p>
                    接口请求头
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
                    成功请求实例
                    <input
                      type="textarea"
                      :autosize="{minRows: 2,maxRows: 5}"
                      placeholder="成功请求实例"
                      v-model="successex"
                    />
                  </p>
                </Form-item>
                <Form-item label="fail">
                  <p>
                    失败请求示例
                    <input
                      type="textarea"
                      :autosize="{minRows: 2,maxRows: 5}"
                      placeholder="失败请求示例"
                      v-model="failex"
                    />
                  </p>
                </Form-item>
              </Form>
            </mu-form>
            <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
            <mu-button slot="actions" flat color="primary" @click="bianji">编辑</mu-button>
          </mu-dialog>
        </mu-col>
      </mu-row>
    </mu-container>
    <mu-dialog
      title="接口详情"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="detailopen"
    >
      <div>接口详情</div>
      <br />
      <p>项目：{{this.inrterfaceproject}}</p>
      <p>请求地址： {{this.urlinterface}}</p>
      <p>请求方法： {{this.inrerfacemethod}}</p>
      <p>请求头： {{this.interfaceheader}}</p>
      <br />
      <p>入参</p>
      <span>参数名称</span> |
      <span>类型</span> |
      <span>参数</span>
      <li v-for="(value, key) in ru">{{value.paramname}} | {{value.paramtype}} |{{value.param}}</li>
      <p>出参</p>
      <span>参数名称</span> |
      <span>类型</span> |
      <span>参数</span>
      <li v-for="(value, key) in chu">{{value.paramname}} | {{value.paramtype}} |{{value.param}}</li>
      <mu-button slot="actions" flat color="primary" @click="closederailopen">取消</mu-button>
    </mu-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      ru: [],
      chu: [],
      columns: [
        { title: "接口名称" },
        { title: "项目", sortable: true },
        { title: "接口路径", sortable: true },
        { title: "方法", sortable: true },
        { title: "请求头", sortable: true },
        { title: "成功示例", sortable: true },
        { title: "失败示例", sortable: true },
        { title: "备注", sortable: true },
        { title: "状态", sortable: true },
        { title: "创建人", sortable: true },
        { title: "", sortable: true }
      ],
      columndeta: [
        { title: "参数名称", width: 200 },
        { title: "类型", width: 200 },
        { title: "参数", width: 200 }
      ],
      inrterfaceproject: "",
      list1: [],
      inrerfacemethod: "",
      urlinterface: "",
      getproject: "",
      interfaceheader: "",
      openAlertone: false,
      openAlert: false,
      options: ["GET", "POST", "PUT", "DELETE"],
      optionproject: [],
      projectname: "",
      projectadd: "",
      methodadd: "",
      path: "",
      bianjiid: 0,
      userid: localStorage.getItem("username"),
      qingqiutou: "",
      successex: "",
      failex: "",
      projectname: "",
      meark: "",
      method: "",
      detailopen: false,
      form: {
        input: "",
        select: "",
        date: "",
        radio: ""
      },
      validateForm: {
        path: "",
        qingqiutou: "",
        successex: "",
        failex: "",
        projectname: "",
        meark: "",
        method: "",
        projectadd: "",
        openAlert1: false
      },
      current: 1,
      total: 1,
      currentnum: 0
    };
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
          this.optionproject = responseData.data;
        } else if (responseData.code == 73 || responseData.code == 74) {
          this.$router.push("/login");
        } else {
          alert(responseData.msg);
        }
      });
  },
  methods: {
    closederailopen() {
      this.detailopen = false;
    },
    interfacedetail(id) {
      this.detailopen = true;
      fetch(this.Baseurl + "/interface/getinterface?interfaceid=" + id, {
        method: "GET",
        headers: {
          token: JSON.parse(localStorage.getItem("token"))
        }
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
            this.chu = responseData.data.send;
            this.ru = responseData.data.revose;
            this.inrterfaceproject = responseData.data.project;
            this.urlinterface = responseData.data.url;
            this.inrerfacemethod = responseData.data.method;
            this.interfaceheader = responseData.data.headers;
          }
        })
        .catch(error => {
          alert("网络错误");
        });
    },
    get_project() {
      this.list1 = [];
      this.total = 1;
      fetch(
        this.Baseurl +
          "/interface/getpage?project=" +
          this.getproject +
          "&page=" +
          this.current,
        {
          method: "GET",
          headers: {
            token: JSON.parse(localStorage.getItem("token"))
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else if (responseData.code != 0) {
            alert(responseData.msg);
          } else {
            this.list1 = responseData.data.interfacelist;
            this.total = responseData.data.total;
            // this.current=this.current;
          }
        })
        .catch(error => {
          alert("网络错误");
        });
    },
    getprojectinterface() {
      this.list1 = [];
      this.total = 1;
      fetch(
        this.Baseurl +
          "/interface/getpage?project=" +
          this.getproject +
          "&page=" +
          this.current,
        {
          method: "GET",
          headers: {
            token: JSON.parse(localStorage.getItem("token"))
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else if (responseData.code != 0) {
            alert(responseData.msg);
          } else {
            this.list1 = responseData.data.interfacelist;
            this.total = responseData.data.total;
          }
        })
        .catch(error => {
          alert("网络错误");
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
    openAlertDialog(id) {
      this.bianjiid = id;
      this.openAlertone = true;
      {
        fetch(this.Baseurl + "/interface/getinterface?interfaceid=" + id, {
          method: "GET",
          headers: {
            token: JSON.parse(localStorage.getItem("token"))
          }
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
              this.projectname = responseData.data.intername;
              (this.path = responseData.data.path),
                (this.qingqiutou = responseData.data.requestheader),
                (this.successex = responseData.data.successrespexample),
                (this.failex = responseData.data.failresponseexample),
                (this.meark = responseData.data.remark),
                (this.method = responseData.data.requestmethod),
                (this.bianjiid = responseData.data.id);
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      }
    },
    delete1(id) {
      {
        fetch(
          this.Baseurl +
            "/project/deleteproject?id=" +
            id +
            "&userid=" +
            JSON.parse(localStorage.getItem("userid")),
          {
            method: "GET",
            headers: {
              token: JSON.parse(localStorage.getItem("token"))
            }
          }
        )
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            if (responseData.code == 73 || responseData.code == 74) {
              this.$router.push("/login");
            } else if (responseData.code != 0) {
              alert(responseData.msg);
            } else {
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      }
    },
    openFullscreenDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlertone = false;
    },
    closeAlertDialogone() {
      this.openAlert = false;
    },
    append() {
      {
        fetch(this.Baseurl + "/interface/create", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("token"))
          },

          body:
            "intername=" +
            this.projectname +
            "&desc=" +
            this.meark +
            "&path=" +
            this.path +
            "&requestmethod=" +
            this.methodadd +
            "&requestheader=" +
            this.qingqiutou +
            "&failresponseexample=" +
            this.failex +
            "&successrespexample=" +
            this.successex +
            "&remark=" +
            this.meark +
            "&projectid=" +
            this.projectadd +
            "&makeuser=" +
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
              alert("添加接口成功");
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      }
    },
    bianji(id) {
      {
        fetch(this.Baseurl + "/interface/change", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: JSON.parse(localStorage.getItem("token"))
          },
          body:
            "intername=" +
            this.projectname +
            "&desc=" +
            this.meark +
            "&path=" +
            this.path +
            "&requestmethod=" +
            this.methodadd +
            "&requestheader=" +
            this.qingqiutou +
            "&failresponseexample=" +
            this.failex +
            "&successrespexample=" +
            this.successex +
            "&remark=" +
            this.meark +
            "&projectid=" +
            this.projectadd +
            "&makeuser=" +
            JSON.parse(localStorage.getItem("userid")) +
            "&interfacid=" +
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
              alert("编辑接口成功");
              window.location.reload();
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      }
    }
  }
};
</script>
<style scoped>
table {
  border-spacing: 0;
  border-collapse: collapse;
  text-align: center;
  height: 450px;
}
table tbody {
  display: block;
  height: 80%;
  overflow-y: scroll;
}
table thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
table thead {
  width: calc(100%);
}
table thead th {
  background: #ccc;
}
</style>