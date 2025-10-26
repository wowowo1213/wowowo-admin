<template>
  <el-container class="layout-container">
    <Sidebar />

    <el-container class="main-container">
      <Header />

      <el-main class="el-main">
        <router-view :key="$route.fullPath" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Sidebar from './components/sidebar/index.vue';
import Header from './components/Header.vue';
</script>

<style scoped>
.layout-container {
  height: 100%;
}

.layout-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container .el-menu {
  border-right: none;
}

.layout-container .el-main {
  padding: 0px 20px;
}

.main-container {
  display: flex;
  flex-direction: column;
}
</style>
