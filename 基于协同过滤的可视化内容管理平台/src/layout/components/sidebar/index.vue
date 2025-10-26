<template>
  <el-aside width="200px">
    <el-scrollbar>
      <SubMenu :menuData="过滤之后的路由" />
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
import SubMenu from './SubMenu.vue';
</script>

<style scoped></style>
