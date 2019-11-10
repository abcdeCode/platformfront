import Vue from "vue"
import VueRouter from "vue-router"
import * as colors from 'muse-ui/lib/theme/colors'
import theme from 'muse-ui/lib/theme'
import home from "./page/home.vue"
import login from "./page/login.vue"
import user from "./page/user.vue"
import ca_se from "./page/case.vue"
import convage from "./page/convage.vue"
import functionlu from "./page/function.vue"
import interfaces from "./page/interface.vue"
import project from "./page/project.vue"
import report from "./page/report.vue"
import timed from "./page/timed.vue"
import xingneng from "./page/xingneng.vue"
import testevent from "./page/testevent.vue"
import bianli from "./page/bianli.vue"
import { Script } from "vm"


theme.add('custom-theme', {
  primary: colors.indigo,
  secondary: colors.pinkA200
});
Vue.use(VueRouter)
Vue.component('header-item', {
  props: [],
  template: `<templeate ><mu-container>
  
  <mu-paper class="demo-paper" :z-depth="1" style="background-color: #00142a;"> <router-link to="/home">
  <div class='link_text'>首页</div></router-link></mu-paper>
  <mu-expansion-panel :expand="panel === 'panel1'" @change="toggle('panel1')" style="background-color: #00142a;">
  <div slot="header" style='color: white'>项目管理</div>
 
            <router-link to="/project">
            <div class='linktext'>项目管理 </div></router-link>
            <router-link to="/testevent">
      <div class='linktext'>测试环境  </div></router-link>
  </mu-expansion-panel>
  <mu-expansion-panel :expand="panel === 'panel2'" @change="toggle('panel2')" style="background-color: #00142a;">
  <div slot="header" style='color: white'>接口</div>
  <router-link to="/interfaces">
  <div class='linktext'> 接口管理  </div></router-link>
  <router-link to="/xingneng">
  <div class='linktext'>白名单</div></router-link>
  <router-link to="/ca_se">
  <div class='linktext'>接口用例</div></router-link>
  </mu-expansion-panel>
  <mu-expansion-panel :expand="panel === 'panel3'" @change="toggle('panel3')" style="background-color: #00142a;">
  <div slot="header" style='color: white'>集合任务</div>
  <router-link to="/functionlu">
  <div class='linktext'>用例集合  </div></router-link>
  <router-link to="/timed">
  <div class='linktext'>定时任务</div></router-link>
  </mu-expansion-panel>

  <mu-expansion-panel :expand="panel === 'panel4'" @change="toggle('panel4')" style="background-color: #00142a;">
  <div slot="header" style='color: white'>报告</div>
  <router-link to="/report" >
  <div class='linktext'>测试报告  </div></router-link>
  <router-link to="/bianli">
  <div class='linktext'>遍历测试</div></router-link>
  </router-link>
  <router-link to="/xingneng">
  <div class='linktext'>设备性能</div></router-link>
  <router-link to="/convage">
  <div class='linktext'>覆盖率</div></router-link>
  <router-link to="/xingneng">
  <div class='linktext'>安全扫描</div></router-link>
  </mu-expansion-panel>
  <mu-paper class="demo-paper" :z-depth="1" style="background-color: #00142a;"> <router-link to="/user">
  <div class='link_text'>用户管理</div></router-link></mu-paper>
  </mu-container>
  </templeate>`
})
var is_super = "localStorage.getItem('is_super')"
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: "/testevent",
      name: 'testevent',
      component: testevent
    },
    {
      path: "/home",
      name: 'home',
      component: home
    },
    {
      path: "/login",
      name: 'login',
      component: login
    },
    {
      path: "/user",
      name: 'user',
      component: user
    },
    {
      path: "/ca_se",
      name: 'ca_se',
      component: ca_se
    },
    {
      path: "/convage",
      name: 'convage',
      component: convage
    },
    {
      path: "/functionlu",
      name: 'functionlu',
      component: functionlu
    },
    {
      path: "/interfaces",
      name: 'interfaces',
      component: interfaces
    },
    {
      path: "/project",
      name: 'project',
      component: project
    },
    {
      path: "/report",
      name: 'report',
      component: report
    },
    {
      path: "/timed",
      name: 'timed',
      component: timed
    },
    {
      path: "/xingneng",
      name: 'xingneng',
      component: xingneng
    },
    {
      path: "/bianli",
      name: 'bianli',
      component: bianli
    }
  ],
  mode: 'history',
})
export default router
