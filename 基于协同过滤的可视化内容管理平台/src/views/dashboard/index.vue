<template>
  <div>
    <h1>Welcome, {{ userStore.name }}</h1>
    this is dashboard
  </div>
</template>

<script lang="ts" setup name="">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<style scoped>

</style>