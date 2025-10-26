<template>
  <el-menu>
    <template v-for="item in menuData" :key="item.path">
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
        <template #title>
          <span>{{ item.meta?.name }}</span>
        </template>
        <SubMenu :menuData="item.children" />
      </el-sub-menu>

      <el-menu-item v-else :index="item.path" @click="handleMenuItemClick(item)">
        <span>{{ item.meta?.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
defineProps(['menuData']);
import { useRouter, RouteRecordRaw } from 'vue-router';

const router = useRouter();

const handleMenuItemClick = (item: RouteRecordRaw) => {
  if (item.path) {
    router.push(item.path);
  }
};
</script>

<style scoped></style>
