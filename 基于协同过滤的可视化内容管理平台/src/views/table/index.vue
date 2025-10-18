<template>
  <el-main>
    <el-scrollbar>
      <el-table :data="tableData" class="table-container">
        <el-table-column prop="date" label="Date" class="table-column" />
        <el-table-column prop="name" label="Name" class="table-column" />
        <el-table-column prop="address" label="Address" class="table-column" />
      </el-table>
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup name="Table">
import { ref } from 'vue';
const item = {
  date: '2025-10-17',
  name: 'wowowo',
  address: '随机随机随机',
}
const tableData = ref(Array.from({ length: 6 }).fill(item))
</script>

<style scoped>

</style>