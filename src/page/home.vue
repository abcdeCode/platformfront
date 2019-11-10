import { session} from 'common/storage.js'
import base from '../libs/api.js'
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
            <div class="tpl-content-wrapper" style="margin-top: -7px;width: 100%">
              <div class="row">
                <div class="am-u-lg-3 am-u-md-6 am-u-sm-12">
                  <div class="dashboard-stat blue">
                    <div class="visual">
                      <i class="am-icon-comments-o"></i>
                    </div>
                    <div class="details">
                      <div class="number">{{project_cout}}</div>
                      <div class="desc">项目</div>
                    </div>
                    <a class="more">
                      查看项目
                      <i class="m-icon-swapright m-icon-white"></i>
                    </a>
                  </div>
                </div>
                <div class="am-u-lg-3 am-u-md-6 am-u-sm-12">
                  <div class="dashboard-stat green">
                    <div class="visual">
                      <i class="am-icon-apple"></i>
                    </div>
                    <div class="details">
                      <div class="number">{{jiekou}}</div>
                      <div class="desc">接口</div>
                    </div>
                    <a class="more">查看更多</a>
                  </div>
                </div>
                <div class="am-u-lg-3 am-u-md-6 am-u-sm-12">
                  <div class="dashboard-stat purple">
                    <div class="visual">
                      <i class="am-icon-android"></i>
                    </div>
                    <div class="details">
                      <div class="number">{{yongli}}</div>
                      <div class="desc">测试用例</div>
                    </div>
                    <a class="more">查看更多</a>
                  </div>
                </div>
              </div>
            </div>
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
          </mu-row>
        </mu-col>
      </mu-row>
    </mu-container>
  </section>
</template>
<script>
export default {
  data() {
    return {
      project_cout: 0,
      model_cout: 0,
      jiekou: 0,
      yongli: 0,
      userid: localStorage.getItem("username"),
      openAlert: false
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
    }
  },
  mounted() {
    fetch(this.Baseurl + "/common/getcoun", {
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
          this.project_cout = responseData.data.project;
          this.jiekou = responseData.data.interface;
          this.yongli = responseData.data.case;
        }
      })
      .catch(error => {
        alert("网络错误");
      });
  }
};
</script>
  
<style scoped>
.bar-name {
  color: white;
}
.row-left {
  border-right: 1px dashed rgba(0, 0, 0, 0.1);
  width: 99px;
}
.menu-active {
  border-left: 2px solid lightblue;
}
.board-left,
.board-right {
  padding: 5px;
}
.paper-draft {
  padding: 10px;
}
.list-menu {
  background: #eeeeee;
}
.tpl-content-wrapper {
  padding-left: 27px;
  margin-top: 20px;
}
</style>