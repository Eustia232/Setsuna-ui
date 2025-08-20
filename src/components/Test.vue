<template>
  <el-col :span="12">
    <el-menu>
      <el-menu-item index="2">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item disabled index="3">
        <el-icon>
          <document/>
        </el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting/>
        </el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script lang="ts" setup>
import {Document, Menu as IconMenu, Setting,} from '@element-plus/icons-vue'
</script>
