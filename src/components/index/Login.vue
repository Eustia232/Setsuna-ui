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
    <div class="oauth-login-divider">
      <span>其他方式登录</span>
    </div>
    <div class="oauth-login-icons">
      <!--suppress JSValidateTypes -->
      <el-avatar :size="32" :src="githubLogo" @click="githubClick"/>
      <el-avatar :size="32" :src="githubLogo" @click="githubClick2"/>
    </div>
  </el-form>
</template>

<script setup>
import {ref, useTemplateRef} from "vue";
import {login, loginWithGithub} from "@/api/auth.js";
import router from "@/router/index.js";
import Register from "@/components/index/Register.vue";
import {setToken} from "@/utils/token.js";
import githubLogo from "@/assets/images/github.png";
import {ElMessage} from "element-plus";

const loginFormRef = useTemplateRef( "index-form" );
const loginFormData = ref( {
  username: "eva",
  password: "123",
} );
console.log( "github_logo:", githubLogo );
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
      };
      login( payload ).then( res => {
        console.log( res );
        setToken( res.token );
        router.push( {name: "Home"} );
      } ).catch( _ => {
      } );
    }
  } );
};
const githubClick = () => {
  console.log( "githubClick" );
  loginWithGithub().then( res => {
    console.log( res );
    const {token} = res;
    setToken( token );
    router.push( {name: "Home"} );
  } ).catch( _ => {
  } );
};
const githubClick2 = () => {
  const popup = window.open( "http://localhost:8080/oauth2/authorization/github", "githubLogin", "width=600,height=600" );
  // 监听弹窗回传的消息
  window.addEventListener( "message", function handler( event ) {
    // 安全校验
    if (event.origin !== "http://localhost:8080") {
      return;
    }
    console.log( event );
    const {
      token,
      firstLogin,
    } = event.data;
    setToken( token );
    if (firstLogin) {
      ElMessage.primary( "您是第一次登录，已为您自动创建账号" );
    }
    router.push( {name: "Home"} );
    window.removeEventListener( "message", handler );
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

.oauth-login-divider {
  display: flex;
  align-items: center;
  margin: 8px 0 8px 0;
  color: #606266;
  font-size: 15px;
}

/*用伪类实现分割线效果*/
.oauth-login-divider::before,
.oauth-login-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e5e6eb;
  margin: 0 12px;
}

.oauth-login-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
}


</style>