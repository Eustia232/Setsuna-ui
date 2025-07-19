<template>
  <el-form ref="index-form" :model="loginFormData"
           :rules="rules" class="login-form" label-width="70px"
  >
    <el-text class="login-title">欢迎访问雪菜小站</el-text>
    <el-form-item label="用户名" prop="username">
      <el-input class="el-input" v-model.number="loginFormData.username" clearable/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginFormData.password" clearable show-password/>
    </el-form-item>
    <div class="login-button-container">
      <el-button type="primary" class="login-button">登录</el-button>
      <el-button type="primary" class="login-button" @click="$emit('switch')">注册</el-button>
    </div>
  </el-form>
</template>

<script setup>
import {ref, useTemplateRef} from "vue";
import {login} from "@/api/auth.js";
import router from "@/router/index.js";

const loginFormRef = useTemplateRef("index-form");
const loginFormData = ref({
  username: "eustia",
  password: "eustia",
});
const rules = ref({
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    }],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    }],
});
// const checkLoginForm = () => {
//   loginFormRef.value.validate(valid => {
//     if (valid) {
//       login2(loginFormData.value.username, loginFormData.value.password).then(response => {
//         console.log(response);
//       })
//     }
//   });
const checkLoginForm = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      if (login(loginFormData.value.username, loginFormData.value.password)) {
        router.push("/home");
      }
      else {
        alert(222);
      }
    }
  });
};

</script>

<style scoped>

.login-form {
  width: 300px;
  padding: 30px 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #e2d2abDF; /*最后两位表示透明度*/
  transform: scale(1.2);
}

.login-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.login-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button{
  margin: 0 30px;
}

.el-input{
  margin-right: 25px;
}



</style>