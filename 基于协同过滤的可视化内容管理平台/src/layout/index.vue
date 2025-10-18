<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']" >
          <el-sub-menu index="1" class="el-sub-menu-deleteSvg" @click="handleChangeMenu('/dashboard')">
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

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px ;background-color: red;">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>增加</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span class="usernameContainer">{{ userStore.name }}</span>
          <button @click="handleLogout" class="logoutButton">退出登录</button>
        </div>
      </el-header>

      <el-main>
        <router-view :key="$route.fullPath" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup name="Layout">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();

const handleChangeMenu = (path: string) => {
  router.push(path);
};

const handleLogout = () => {
  userStore.logout();
}
</script>

<style scoped>
.layout-container {
  height: 100%;
}

.el-sub-menu-deleteSvg :deep(.el-sub-menu__icon-arrow) {
  display: none;
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
  padding: 0;
}

.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.table-container {
  display: flex;
  justify-content: space-between;
}

.usernameContainer {
  margin-left: 10px;
  font-size: 16px;
}

.logoutButton {
  background-color: #f56c6c;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 10px 0 10px 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}
</style>