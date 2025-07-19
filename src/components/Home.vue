<template>
  <el-container class="home-container">
    <el-header class="header">header</el-header>
    <el-container>
      <el-aside class="aside">aside</el-aside>
      <el-main class="main">
        <Index/>
        <Index/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import Index from "@/components/Index.vue";
</script>

<style scoped>
.home-container {
  height: 100%;
}

.header {
  background-color: #2136bd;
}

.aside {
  background-color: #c35757;
}

.main {
  background-color: #4f7822;
}
</style>