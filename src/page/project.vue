import {hashHistory} from 'react-router'
import { listeners } from 'cluster';
import { session} from 'common/storage.js'
<template>
   <section>
   	<mu-container class="demo-container">
  <mu-appbar title="接口测试平台" :zDepth="3">
      <mu-icon value="all_inclusive" color="#0091ea" slot="left">
      </mu-icon>
  <mu-badge content="12" slot="right" color="secondary">
      <mu-button icon>
        <mu-icon value="notifications"></mu-icon>
      </mu-button>
    </mu-badge>
      <mu-menu slot="right">
    <mu-button flat>{{userid}}</mu-button>
    <mu-list slot="content">
      <mu-list-item button @click="logout">
        <mu-list-item-content >
          <mu-list-item-title  >退出</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item button @click="logout">
        <mu-list-item-content >
          <mu-list-item-title  >修改密码</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
  </mu-menu>
    </mu-appbar>
       <mu-row :column="2">
      <header-item></header-item>
      <mu-row :column="98" tablet="98" desktop="98">
         <mu-row :column="4">
       	 <div class="tpl-portlet-components"  style="margin-top: -7px;width:87%">
    	<div class="portlet-title">
        <div class="caption font-green bold">
            <span class="am-icon-code"></span> 项目
        </div>
   			 </div>
   			 <div class="tpl-block">
        <div class="am-g">
            <div class="am-u-sm-12 am-u-md-6">
                <div class="am-btn-toolbar">
                    <div class="am-btn-group am-btn-group-xs">
                        <button   @click="openFullscreenDialog" class="btn btn-default btn-success">
                            增加
                        </button>
                    </div>
                </div>
            </div>
 		</div>
            <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
                <mu-appbar color="primary" title="添加项目">
                <mu-button slot="left" icon @click="closeFullscreenDialog">
                    <mu-icon value="close"></mu-icon>
                </mu-button>
                <mu-button slot="right" flat  @click="closeFullscreenDialog">
                    关闭
                </mu-button>
                </mu-appbar>
    <div style="padding: 24px;">
        <mu-form  ref="form" :model="validateForm" >
     <Form :model="validateForm" :label-width="80"  ref="formValidate"  >
                <Form-item label="项目名" prop="projectName" :rules="projectnameRules">
                    <input v-model="validateForm.projectName" placeholder="请输入项目名称">
                </Form-item>
                <Form-item label="描述">
                    <input v-model="validateForm.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="项目描述">
                </Form-item>
               <input type="button" value="添加"  @click="submit">
           </Form>
           </mu-form>
    </div>
  </mu-dialog>
 		 <table class="am-table  table-main" style=" width: 950px; display: block;height:400px;overflow-y: scroll;  overflow-x: scroll;" >
            <caption><strong>
            </strong></caption>
            <thead>
            <tr>
                <th>项目名</th>
                <th>描述</th>
                <th v-if="is_super=='1'">操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="todo in list1" :key="todo.name"  :id="todo.id" > 
                    <td>
                            <strong>{{todo.projectname}}</strong>
                    </td>
                    <td>
                            <strong>{{todo.descs}}</strong>
                    </td>
                    <td>
                        <span>
                            <button  class="btn btn-default " @click="openAlertDialog(todo.id)" v-if="is_super=='1'">
                                编辑
                            </button>
                        </span>
                            <span>
                                <button  @click="delete1(todo.id)" class="btn btn-default" v-if="is_super=='1'">删除</button>
                                    
                            </span>
                    </td>
                </tr >
            </tbody>
            
        </table>
   		 </div>
   		 </div> 
            <mu-flex justify-content="center">
        </mu-flex>
            <mu-dialog title="编辑项目" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
            <mu-form  ref="form" :model="validateForm" >
            <Form :model="validateForm" :label-width="80"  ref="formValidate"  >
                <Form-item label="项目名" >
                    <input  placeholder="请输入项目名称" v-model="projectname">
                </Form-item>
                <Form-item label="描述">
                    <input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="项目描述" v-model="meark">
                </Form-item>
           </Form>
           </mu-form>
            <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
            <mu-button slot="actions" flat color="primary" @click="bianji">编辑</mu-button>
        </mu-dialog>
       </mu-row>
      </mu-row>
   </mu-row>
</mu-container>
<mu-dialog title="退出" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert1">
            确定退出登录吗？
    <mu-button slot="actions" flat color="primary" @click="closeAlertDialog1">取消</mu-button>
    <mu-button slot="actions" flat color="primary" @click="tuichu1">退出</mu-button>
  </mu-dialog>
</section>
</template>
<script>
    export default {
  data () {
    return {
          openAlert: false,
        name: '项目名称',
        list1: [],
        visible:false,
        title: '新建项目',
        projectname:'',
        meark:"",
        is_super:localStorage.getItem('is_super'),
        userid: localStorage.getItem("username"),
        bianjiid:0,
        projectnameRules: [
        { validate: (val) => !!val, message: '项目名称必填'}
      ],
      validateForm: {
          projectName: '',
          remarks: ''
        },
         openFullscreen: false,
         openAlert1:false,
    }
  },  
	mounted() {
             var that=this
          fetch(this.Baseurl+'/project/all',{
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                      "token":JSON.parse(localStorage.getItem("token")),
                }
            }).then((response) => {
                return response.json()}) 
                .then((responseData) => { 
                    if (responseData.code ==0) {
                        this.list1=responseData.data
                    } else if(responseData.code==73 ||responseData.code==74){
                        this.$router.push('/login')
                    }else{
                        alert(responseData.msg)
                    }
                })
  },
  methods:{
      logout(){
            this.openAlert1=true;
        },
        closeAlertDialog1(){
            this.openAlert1=false;
        },
        tuichu1(){
            localStorage.clear();
             this.$router.push('/login')
        },
      openAlertDialog (id) {
        this.openAlert = true;
         fetch(this.Baseurl+'/project/getone?id='+id,{
                method: "GET",
                headers:{
                      "token":JSON.parse(localStorage.getItem("token")),
                }
            }).then((response) => {
                return response.json()}) 
                .then((responseData) => { 
                   if(responseData.code==73 ||responseData.code==74){
                        this.$router.push('/login')
                    }else  if (responseData.code !=0) {
                      this.openAlert = false;
                    } else {
                        this.projectname=responseData.data.projectname;
                        this.meark=responseData.data.descs;
                        this.bianjiid=responseData.data.id;
                    }
                })
               
    },
    closeAlertDialog () {
      this.openAlert = false;
    },
    bianji(){
          {
             fetch(this.Baseurl+'/project/create',{
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                      "token":JSON.parse(localStorage.getItem("token")),
                },

                   body:"name="+this.projectname+"&desc="+this.meark+"&userid="+JSON.parse(localStorage.getItem("userid"))+"&id="+this.bianjiid
            }).then((response) => {
                return response.json()}) 
                .then((responseData) => { 
                  if(responseData.code==73 ||responseData.code==74){
                        this.$router.push('/login')
                    }else  if (responseData.code !=0) {
                      alert(responseData.msg)
                    } else {
                        window.location.reload();
                    }
                })
                .catch((error)=> {
                  alert("网络错误")
                })
}
    },
      submit () {
          this.$refs.form.validate().then((result) => {
      fetch(this.Baseurl+'/project/create',{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                      "token":JSON.parse(localStorage.getItem("token")),
                },

                   body:"name="+this.validateForm.projectName+"&desc="+this.validateForm.remarks+"&userid="+JSON.parse(localStorage.getItem("userid"))
            }).then((response) => {
                return response.json()}) 
                .then((responseData) => { 
                   if(responseData.code==73 ||responseData.code==74){
                        this.$router.push('/login')
                    }else  if (responseData.code !=0) {
                      alert(responseData.msg)
                    } else {
                        window.location.reload();
                    }
                })
                .catch((error)=> {
                  alert("网络错误")
                })

        })
      },
     openFullscreenDialog () {
      this.openFullscreen = true;
    },
    closeFullscreenDialog () {
      this.openFullscreen = false;
    },
    delete1(id){
         {
      fetch(this.Baseurl+'/project/deleteproject?id='+id+"&userid="+JSON.parse(localStorage.getItem("userid")),{
                method: "GET",
                  headers:{
                        "token":JSON.parse(localStorage.getItem("token")),
                  }
            }).then((response) => {
                return response.json()}) 
                .then((responseData) => { 
                 if(responseData.code==73 ||responseData.code==74){
                        this.$router.push('/login')
                    }else  if (responseData.code !=0) {
                      alert(responseData.msg)
                    } else {
                        window.location.reload();
                    }
                })
                .catch((error)=> {
                  alert("网络错误")
                })

        }
    }
  }
}
</script>
<style scoped>
  .bar-name {
    color: white;
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
  .tpl-content-wrapper{
    padding-left: 27px;
    margin-top: 20px;
  }
  .tpl-portlet-components{
  	width: 100%
  }
  .justify-content-start{
  	width: 90%;
  }
  .row-left {
    border-right: 1px dashed rgba(0, 0, 0, 0.1);
    width:99px;
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
  .tpl-content-wrapper{
    padding-left: 27px;
    margin-top: 20px;

  }
  .justify-content-start{
    width: 87%;
  }
</style>