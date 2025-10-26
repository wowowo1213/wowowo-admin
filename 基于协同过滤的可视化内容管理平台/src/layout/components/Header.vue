<template>
  <el-header style="text-align: right; font-size: 12px">
    <div class="toolbar">
      <el-dropdown>
        <el-icon style="margin-right: 8px; margin-top: 1px; background-color: red">
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
</template>

<script lang="ts" setup name="Header">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
};
</script>

<style scoped>
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
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
