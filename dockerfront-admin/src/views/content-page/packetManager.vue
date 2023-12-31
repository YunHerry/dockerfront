<template>
  <div class="packets-content">
    <i class="title">套餐管理</i>
    <div class="packets-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称/ID" width="180" />
        <el-table-column prop="description" label="描述" width="180" />
        <el-table-column prop="hardwareId" label="硬件id" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getPacket } from "@/api/admin";
import UserTop from "@/components/user/UserTop.vue";
import { Ref, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElTable, ElTableColumn, ElInput, ElButton } from "element-plus";
const input = ref("");
let page = 1;
let number = 10;

interface User {
  date: string;
  name: string;
  address: string;
}

let tableData: Ref<Array<packet>> = ref([]);

function search(value: string) {
  let dataFilters = JSON.parse(JSON.stringify(tableData)) as Array<packet>;
  dataFilters.filter((item, index) => {
    return item.name == value;
  });
}

onMounted(() => {
  getPacket({ page: 1, pageSize: 5 }).then((res) => {
    tableData.value.push(...res.data);
  });
});
</script>
<style lang="scss" scoped>
.title {
  @extend %middle-text;
  display: block;
  text-align: left;
  margin-bottom: 20px;
}
.packets-content {
  height: 80%;
  padding: 44px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  flex: 1;
  width: 80%;
}
.packets-table {
  width: 100%;
  text-align: left;
}
</style>
