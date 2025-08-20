<template>
  <el-container class="home-container">
    <el-header class="header">
      <button @click="logout"></button>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu background-color="#e6eddf" default-active="/hobby" router>
          <el-menu-item index="/hobby">主页</el-menu-item>
          <el-menu-item index="/test">测试页</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>

import {onMounted, ref} from "vue";
import {getInfo} from "@/api/auth.js";
import {clearToken} from "@/utils/token.js";
import router from "@/router/index.js";

const hobby = ref( "" );

function getHobby() {
  getInfo().then( res => {
    hobby.value = res.hobby;
  } ).catch( _ => {
  } );
}

function logout() {
  clearToken();
  router.push( "/index" );
}

onMounted( () => {
  getHobby();
} );
</script>

<style scoped>
.home-container {
  height: 100%;
}

.header {
  background-color: beige;
  box-shadow: var(--el-box-shadow-light);
}

.aside {
  background-color: #e6eddf;
}

.aside {
  background-color: #f6f4f6;
}


</style>