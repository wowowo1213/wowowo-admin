<template>
<el-aside width="200px">
  <el-scrollbar>
    <el-menu :default-openeds="['1', '3']" >
      <el-sub-menu index="1" class="el-sub-menu-deleteSvg">
        <template #title>
          <el-icon><message /></el-icon>Dashboard
        </template>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><icon-menu /></el-icon>Example
        </template>
        <el-menu-item index="2-1" @click="handleChangeMenu('/example/table')">Table</el-menu-item>
        <el-menu-item index="2-2" @click="handleChangeMenu('/example/normolUser')">普通用户</el-menu-item>
        <el-menu-item index="2-3" @click="handleChangeMenu('/example/adminUser')">超级用户</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3" class="el-sub-menu-deleteSvg">
        <template #title>
          <el-icon><message /></el-icon>Form
        </template>
      </el-sub-menu>
      <el-sub-menu index="4" class="el-sub-menu-deleteSvg">
        <template #title>
          <el-icon><message /></el-icon>什么也没有
        </template>
      </el-sub-menu>
      <el-sub-menu index="5" class="el-sub-menu-deleteSvg">
        <template #title>
          <el-icon><message /></el-icon>这也什么都没有
        </template>
      </el-sub-menu>
      <el-sub-menu index="6" class="el-sub-menu-deleteSvg">
        <template #title>
          <el-icon><message /></el-icon>这边更是啥也都没有
        </template>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</el-aside>
</template>

<script lang="ts" setup name="Sidebar">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleChangeMenu = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.el-sub-menu-deleteSvg :deep(.el-sub-menu__icon-arrow) {
  display: none;
}
</style>