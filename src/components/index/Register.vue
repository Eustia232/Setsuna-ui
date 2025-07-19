<template>
  <el-form ref="index-form" :model="loginFormData"
           :rules="rules" class="login-form" label-width="80px"
  >
    <el-text class="login-title">欢迎注册账号</el-text>
    <el-form-item label="用户名" prop="username">
      <el-input class="el-input" v-model.number="loginFormData.username" clearable/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginFormData.password" clearable show-password/>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="loginFormData.confirmPassword" clearable show-password/>
    </el-form-item>
    <div class="login-button-container">
      <el-button type="primary" class="login-button" @click=submitForm>注册</el-button>
    </div>
  </el-form>
</template>

<script setup>
import {reactive, ref, useTemplateRef} from "vue";
import {login, register} from "@/api/auth.js";
import router from "@/router/index.js";

const loginFormRef = useTemplateRef("index-form");
const loginFormData = ref({
  username: Math.random().toString(36).slice(2, 12), //TODO 要删去
  password: "eustia",
  confirmPassword: "eustia",
});

const equalToPassword=(rule, value, callback) => {
  if (value !== loginFormData.value.password) {
    callback(new Error("两次密码不一致"));
  }
  else{
    callback();
  }
}
//校验表单内容
const rules = ref({
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur", //失去焦点后触发
    }],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    }],
  confirmPassword: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },{
      validator: equalToPassword,
      trigger: "blur",
    }],
});

const submitForm = ()=>{
  loginFormRef.value.validate(valid => {
    if (valid) {
      const payload = {
        username: loginFormData.value.username,
        password: loginFormData.value.password,
      }
      register(payload).then(response => {
        alert(response.message)
        console.log(response.message)
      }).catch(error => {
        alert(error.message)
      })
    }
  })
}

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