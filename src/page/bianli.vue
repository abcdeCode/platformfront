<template>
  <section>
    <mu-container class="demo-container">
      <header-login></header-login>
      <mu-row :column="2">
        <header-item></header-item>
        <mu-col width="98" tablet="98" desktop="98">
          <mu-row :column="4">
            <strong>项目</strong>
            <br />
            <mu-select v-model="projectadd">
              <mu-option
                v-for="option,index in options"
                :key="option.id"
                :label="option.projectname"
                :value="option.id"
              ></mu-option>
            </mu-select>
            <br />
            <strong>系统版本</strong>
            <mu-select v-model="phonetype" @change="getversion">
              <mu-option
                v-for="option,index in types"
                :key="option"
                :label="option"
                :value="option"
              ></mu-option>
            </mu-select>
            <strong>版本</strong>
            <br />
            <mu-select v-model="version" @change="getbiandetail">
              <mu-option
                v-for="option,index in versionsproject"
                :key="option"
                :label="option"
                :value="option"
              ></mu-option>
            </mu-select>
            <mu-container>
              <div style=" display: block; height: 500px;overflow-y: scroll;width:100%">
                <div id="main" style="width: 800px;height:200px;margin-left: 12%;margin-top: 10px"></div>
                <mu-data-table :columns="columns" height="500" :sort.sync="sort" :data="result">
                  <template slot-scope="scope">
                    <td class>{{scope.row.bianhao}}</td>
                    <td class>{{scope.row.packname}}</td>
                    <td class>{{scope.row.version}}</td>
                    <td class>{{scope.row.crashcont}}</td>
                    <td class>
                      <a>详情</a>
                    </td>
                  </template>
                </mu-data-table>
                <mu-flex justify-content="center" style="margin: 32px 0;">
                  <mu-pagination raised :total="total" :current.sync="current"></mu-pagination>
                </mu-flex>
              </div>
            </mu-container>
          </mu-row>
        </mu-col>
      </mu-row>
      <logoutis></logoutis>
    </mu-container>
  </section>
</template>
<script>
export default {
  data() {
    return {
      panel: "",
      types: ["安卓", "ios"],
      userid: localStorage.getItem("username"),
      openAlert: false,
      current: 1,
      total: 1,
      currentnum: 0,
      projectadd: "",
      options: [],
      phonetype: "",
      versionsproject: "",
      version: "",
      result: [],
      cratchlist: [],
      bianhaolist: [],
      columns: [
        { title: "编号", name: "name" },
        { title: "包名" },
        { title: "版本" },
        { title: "carch率" },
        { title: "操作" }
      ]
    };
  },
  methods: {
    toggle(panel) {
      this.panel = panel === this.panel ? "" : panel;
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
    getversion() {
      var that = this;
      fetch(
        this.Baseurl +
          "/converage/getpversion?project=" +
          this.projectadd +
          "&typesion=" +
          this.phonetype,
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
    getbiandetail() {
      this.result = [];
      this.cratchlist = [];
      this.bianhaolist = [];
      var that = this;
      fetch(
        this.Baseurl +
          "/converage/getproject?project=" +
          this.projectadd +
          "&typesion=" +
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
            this.result = responseData.data.list;
            this.cratchlist = responseData.data.crachcout;
            this.bianhaolist = responseData.data.crachcout.bianhao;
            this.baidu(
              "main",
              "crash",
              "crash",
              this.cratchlist,
              "10",
              this.bianhaolist
            );
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
    },
    baidu(id, text, data, name, max, list) {
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
            data: list
          },
          {
            type: "category",
            boundaryGap: true,
            data: list
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
    }
  },
  mounted() {
    this.baidu(
      "main",
      "crash",
      "crash",
      this.cratchlist,
      "10",
      this.bianhaolist
    );
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