import {hashHistory} from 'react-router'
import { session} from 'common/storage.js'
<template>
  <mu-container width="222px">
    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
      <h3 id="title">测试平台登录</h3>
      <mu-form-item label="用户名" help-text prop="username" :rules="usernameRules">
        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="密码" prop="password" :rules="passwordRules">
        <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item>
        <mu-button color="primary" @click="submit">登录</mu-button>
      </mu-form-item>
    </mu-form>
  </mu-container>
</template>
<script>
export default {
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 3, message: "用户名长度大于3" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 2 && val.length <= 20,
          message: "密码长度大于2小于20"
        }
      ],
      validateForm: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    document.body.style.backgroundImage =
      "url(" + require("../assets/back.png") + ")";
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        fetch("http://localhost/plan/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "username=" +
            this.validateForm.username +
            "&password=" +
            this.validateForm.password
        })
          .then(response => {
            return response.json();
          })
          .then(responseData => {
            if (responseData.code != 0) {
              alert(responseData.msg);
            } else {
              localStorage.setItem("username", this.validateForm.username),
                localStorage.setItem(
                  "token",
                  JSON.stringify(responseData.data.token)
                ),
                localStorage.setItem(
                  "userid",
                  JSON.stringify(responseData.data.userid)
                ),
                localStorage.setItem(
                  "is_super",
                  JSON.stringify(responseData.data.is_super)
                );
              this.$router.push("/home");
            }
          })
          .catch(error => {
            alert("网络错误");
          });
      });
    },

    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: "",
        isAgree: false
      };
    }
  }
};
</script>
<style scoped>
.mu-demo-form {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  margin-top: 111px;
  height: 50%;
}
#mu-form-item-content {
  margin-left: 10%;
  margin-right: 10%;
}
#title {
  text-align: center;
  margin-bottom: 0%;
  margin-top: 10px;
}
form {
  background-color: aliceblue;
}
</style>