<template>
  <el-form ref="index-form" :model="loginFormData"
           :rules="rules" class="login-form" label-width="70px"
  >
    <el-text class="login-title">欢迎访问雪菜小站</el-text>
    <el-form-item label="用户名" prop="username">
      <el-input v-model.number="loginFormData.username" class="el-input" clearable/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginFormData.password" clearable show-password/>
    </el-form-item>
    <div class="login-button-container">
      <el-button class="login-button" type="primary" @click="submitForm">登录</el-button>
      <el-button class="login-button" type="primary" @click="$emit('switch',Register)">注册</el-button>
    </div>
  </el-form>
</template>

<script setup>
import {ref, useTemplateRef} from "vue";
import {login} from "@/api/auth.js";
import router from "@/router/index.js";
import Register from "@/components/index/Register.vue";
import handleResponse from "@/utils/handleResponse.js";

const loginFormRef = useTemplateRef( "index-form" );
const loginFormData = ref( {
  username: "eva",
  password: "123",
} );
const rules = ref( {
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
} );
const submitForm = () => {
  loginFormRef.value.validate( valid => {
    if (valid) {
      const payload = {
        username: loginFormData.value.username,
        password: loginFormData.value.password,
      }
      handleResponse( login( payload ) ).then( _ => {
        setTimeout( () => {
          router.push( "/home" );
        }, 300 );
      } );
    }
  } );
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

.login-button {
  margin: 0 30px;
}

.el-input {
  margin-right: 25px;
}


</style>