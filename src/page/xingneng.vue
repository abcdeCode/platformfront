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
          <mu-row :column="4">
            <strong>选择项目</strong>
            <br />
            <mu-select v-model="projectadd" @change="getxingneng">
              <mu-option
                v-for="option,index in options"
                :key="option.id"
                :label="option.projectname"
                :value="option.id"
              ></mu-option>
            </mu-select>
            <br />
            <strong>版本</strong>
            <br />
            <mu-select v-model="version">
              <mu-option
                v-for="option,index in versionsproject"
                :key="option"
                :label="option"
                :value="option"
              ></mu-option>
            </mu-select>
            <strong>系统版本</strong>
            <mu-select v-model="phonetype" @change="getphone">
              <mu-option
                v-for="option,index in types"
                :key="option"
                :label="option"
                :value="option"
              ></mu-option>
            </mu-select>
            <strong>选择查看的设备</strong>
            <mu-select v-model="phone" @change="getxingnengshuju">
              <mu-option
                v-for="option,index in phonelist"
                :key="option"
                :label="option"
                :value="option"
              ></mu-option>
            </mu-select>
            <br />
            <div style=" display: block; height: 500px;overflow-y: scroll;width:100%">
              <div id="main" style="width: 800px;height:200px;margin-left: 12%;margin-top: 10px"></div>
              <div id="main1" style="width: 800px;height:200px;margin-left: 12%;margin-top: 10px"></div>
              <div
                id="mainflow"
                style="width: 800px;height:200px;margin-left: 12%;margin-top: 10px"
              ></div>
              <div id="main2" style="width: 800px;height:200px;margin-left: 12%;margin-top: 10px"></div>
              <div id="main3" style="width: 800px;height:200px;margin-left: 12%;margin-top: 10px"></div>
              <!-- <mu-data-table  :columns="columns" :sort.sync="sort"  :data=list  >
      <template slot-scope="scope" >
        <td class="cpu" >{{scope.row.cpu}}</td>
        <td class="men">{{scope.row.men}}</td>
        <td class="sendflow">{{scope.row.sendflow}}</td>
        <td class="resvcflow">{{scope.row.resvcflow}}</td>
        <td class="fps">{{scope.row.fps}}</td>
        <td class="batteary ">{{scope.row.batteary}}</td>
        <td class="shebei">{{scope.row.shebei}}</td>
      </template>
              </mu-data-table>-->
            </div>
            <mu-container>
              <mu-flex justify-content="center" style="margin: 32px 0;">
                <mu-pagination
                  raised
                  :total="total"
                  :current.sync="current"
                  @change="getxingnengshuju"
                ></mu-pagination>
              </mu-flex>
            </mu-container>
          </mu-row>
        </mu-col>
      </mu-row>
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
    </mu-container>
  </section>
</template>
<script>
export default {
  data() {
    return {
      options: "",
      projectadd: "",
      types: ["安卓", "ios"],
      userid: localStorage.getItem("username"),
      columns: [
        { title: "cpu", name: "name" },
        { title: "内存" },
        { title: "发送流量" },
        { title: "接受流量" },
        { title: "fps" },
        { title: "电量" },
        { title: "设备" }
      ],
      list: [],
      openAlert: false,
      versionsproject: [],
      phonetype: "",
      version: "",
      phone: "",
      phonelist: [],
      battearylist: [],
      cpulist: [],
      datetimelist: [],
      fpslist: [],
      menlist: [],
      resvcflowlist: [],
      sendflowlist: [],
      current: 1,
      total: 1,
      currentnum: 0
    };
  },
  methods: {
    getxingneng() {
      this.versionsproject = [];

      this.flow();
      var that = this;
      fetch(
        this.Baseurl + "/perofomance/getversion?project=" + this.projectadd,
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
            this.versionsproject = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    getphone() {
      var that = this;
      fetch(
        this.Baseurl +
          "/perofomance/getphone?project=" +
          this.projectadd +
          "&types=" +
          this.phonetype +
          "&version=" +
          this.version,
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
            this.phonelist = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    getxingnengshuju() {
      this.battearylist = [];
      this.cpulist = [];
      this.datetimelist = [];
      this.fpslist = [];
      this.menlist = [];
      this.resvcflowlist = [];
      this.sendflowlist = [];
      this.total = 0;
      var that = this;
      fetch(
        this.Baseurl +
          "/perofomance/getperfirmaen?project=" +
          this.projectadd +
          "&tyes=" +
          this.phonetype +
          "&version=" +
          this.version +
          "&phone=" +
          this.phone +
          "&current=" +
          this.current,
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
            this.battearylist = responseData.data.batteary;
            this.cpulist = responseData.data.cpu;
            this.datetimelist = responseData.data.datetime;
            this.fpslist = responseData.data.fps;
            this.menlist = responseData.data.men;
            this.resvcflowlist = responseData.data.resvcflow;
            this.sendflowlist = responseData.data.sendflow;
            this.total = responseData.data.total;
            this.baidu("main", "cpu", "cpu", this.cpulist, "100");
            this.baidu("main1", "men", "men", this.menlist, "200");
            this.baidu("main2", "fps", "fps", this.fpslist, "200");
            this.baidu(
              "main3",
              "batteary",
              "batteary",
              this.battearylist,
              "100"
            );
            this.flow();
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    baidu(id, text, data, name, max) {
      var that = this;
      var dom = document.getElementById(id);
      var myChart = echarts.init(dom);
      that.option = null;
      that.option = {
        title: {
          text: text,
          subtext: "为单次测试所占的百分比，数据来源于之前测试数据"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {
          data: [data]
        },
        color: ["green", "red"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: this.datetimelist
          },
          {
            type: "category",
            boundaryGap: true,
            data: this.datetimelist
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "",
            max: max,
            min: 0,
            boundaryGap: [0.5, 0.2]
          },
          {
            type: "value",
            scale: true,
            name: "",
            max: max,
            min: 0,
            boundaryGap: [0.5, 0.2]
          }
        ],
        series: [
          {
            name: text,
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: name
          }
        ]
      };
      if (that.option && typeof that.option === "object") {
        myChart.setOption(that.option, true);
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
    flow() {
      var that = this;
      var dom = document.getElementById("mainflow");
      var myChart = echarts.init(dom);
      that.option = null;
      that.option = {
        title: {
          text: "流量",
          subtext: "为单次测试所占的百分比，数据来源于之前测试数据"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {
          data: ["接受", "发送"]
        },
        color: ["green", "red"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: this.datetimelist
          },
          {
            type: "category",
            boundaryGap: true,
            data: this.datetimelist
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "",
            max: 5000,
            min: 0,
            boundaryGap: [0.5, 0.2]
          },
          {
            type: "value",
            scale: true,
            name: "",
            max: 5000,
            min: 0,
            boundaryGap: [0.5, 0.2]
          }
        ],
        series: [
          {
            name: "接受",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: this.resvcflowlist
          },
          {
            name: "发送",
            type: "line",
            data: this.sendflowlist
          }
        ]
      };
      if (that.option && typeof that.option === "object") {
        myChart.setOption(that.option, true);
      }
    }
  },
  mounted() {
    this.baidu("main", "cpu", "cpu", "cpu", "100");
    this.baidu("main1", "men", "men", "men", "200");
    this.baidu("main2", "fps", "fps", "fps", "200");
    this.baidu("main3", "batteary", "batteary", "batteary", "100");
    this.flow();
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
  }
};
</script>
<style scoped>
mu-col {
  display: block;
  height: 80%;
}
.demo-container {
  width: 100%;
}
.container {
  width: 100%;
}
</style>
