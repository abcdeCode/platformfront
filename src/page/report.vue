
<template>
  <section>
    <mu-container class="demo-container">
      <header-login></header-login>
      <mu-row :column="2">
        <header-item></header-item>
        <mu-col width="98" tablet="98" desktop="98">
          <mu-row :column="4">
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
              <div id="main" style="width: 800px;height:200px;margin-left: 12%;margin-top: 10px"></div>
              <mu-data-table
                :columns="columns"
                :sort.sync="sort"
                @sort-change="handleSortChange"
                :data="testreseu"
              >
                <template slot-scope="scope">
                  <td>{{scope.row.testquantity}}</td>
                  <td class="proce">{{scope.row.passquantity}}</td>
                  <td class="test_num">{{scope.row.failquantity}}</td>
                  <td class="is-right">{{scope.row.exceptionquantity}}</td>
                  <td class="test_date">{{scope.row.spendtime}}</td>
                  <td class="is-right">
                    <a @click="getreport(scope.row.testingreport)">{{scope.row.testingreport}}</a>
                  </td>
                  <td class="is-right">
                    <a @click="getreport(scope.row.testlog)">{{scope.row.testlog}}</a>
                  </td>
                </template>
              </mu-data-table>
            </div>
          </mu-row>
        </mu-col>
      </mu-row>
    </mu-container>
    <logoutis></logoutis>
  </section>
</template>
<script>
document.body.parentNode.style.overflowY = "auto";
$("body")
  .parent()
  .css("overflow-y", "auto");
export default {
  data() {
    return {
      options: "",
      userid: localStorage.getItem("username"),
      projectadd: "",
      columns: [
        { title: "测试数量", name: "name" },
        { title: "通过" },
        { title: "失败" },
        { title: "异常" },
        { title: "测试耗时" },
        { title: "测试报告" },
        { title: "测试日志" }
      ],
      testreseu: [],
      openAlert: false,
      url: "",
      userld: "",
      panel: ""
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
    getreport(filename) {
      window.location.href ="http://localhost/plan/down?file=" + filename;
    },
    gettask() {
      var that = this;
      fetch(
        this.Baseurl + "/testresult/allproject?project=" + this.projectadd,
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
            this.testreseu = responseData.data;
          } else if (responseData.code == 73 || responseData.code == 74) {
            this.$router.push("/login");
          } else {
            alert(responseData.msg);
          }
        });
      this.baidu();
    },
    baidu() {
      var that = this;
      var dom = document.getElementById("main");
      var myChart = echarts.init(dom);
      that.option = null;
      that.option = {
        title: {
          text: "测试数据",
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
          data: ["通过", "失败"]
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
            data: (function() {
              var now = document.getElementsByClassName("test_date");
              var res = [];
              for (var i = 0; i < now.length; i++) {
                res.push(now[i].innerHTML.substring(0, 18));
              }
              return res;
            })()
          },
          {
            type: "category",
            boundaryGap: true,
            data: (function() {
              var now = document.getElementsByClassName("test_date");
              var res = [];
              for (var i = 0; i < now.length; i++) {
                res.push(now[i].innerHTML.substring(0, 18));
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "",
            max: 20,
            min: 0,
            boundaryGap: [0.5, 0.2]
          },
          {
            type: "value",
            scale: true,
            name: "",
            max: 20,
            min: 0,
            boundaryGap: [0.5, 0.2]
          }
        ],
        series: [
          {
            name: "通过",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function() {
              var res = [];
              var data = document.getElementsByClassName("proce");
              for (var i = 0; i < data.length; i++) {
                res.push(data[i].innerHTML);
              }
              return res;
            })()
          },
          {
            name: "失败",
            type: "line",
            data: (function() {
              var res1 = [];
              var data = document.getElementsByClassName("label-success");
              var test_num = document.getElementsByClassName("test_num");
              for (var i = 0; i < data.length; i++) {
                res1.push(test_num[i].innerHTML);
              }
              return res1;
            })()
          }
        ]
      };
      if (that.option && typeof that.option === "object") {
        myChart.setOption(that.option, true);
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