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
            <mu-select v-model="projectadd" @change="gettask" style="width:27%">
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
                style="100%;"
              >
                <template slot-scope="scope">
                  <td>{{scope.row.projectnam}}</td>
                  <td class="proce">{{scope.row.version}}</td>
                  <td class="test_num">
                    <a :href="scope.row.path">{{scope.row.path}}</a>
                  </td>
                  <td class="is-right">{{scope.row.type}}</td>
                  <td class="test_date">{{scope.row.usernam}}</td>
                </template>
              </mu-data-table>
            </div>
          </mu-row>
        </mu-col>
      </mu-row>
    </mu-container>
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
      options: "",
      projectadd: "",
      openAlert: false,
      columns: [
        { title: "项目" },
        { title: "版本" },
        { title: "路径" },
        { title: "类型" },
        { title: "测试人" }
      ],
      list: "",
      userid: localStorage.getItem("username")
    };
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
    gettask() {
      var that = this;

      fetch(this.Baseurl + "/testcover/get?project=" + this.projectadd, {
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
