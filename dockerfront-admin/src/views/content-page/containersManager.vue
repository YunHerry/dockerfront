<template>
  <div class="dockers">
    <i class="title">容器管理</i>
    <div class="dockers-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称/ID" width="180" />
        <el-table-column prop="state" label="状态" width="180" />
        <el-table-column prop="packetId" label="套餐" width="180" />
        <el-table-column width="180">
          <template #header>
            <el-input
              v-model="input"
              size="small"
              placeholder="关键字检索"
              @change="search"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <RouterLink :to="'/webshell/' + scope.row.id">
              <el-button size="small" @click="">WebShell</el-button>
            </RouterLink>
            <RouterLink :to="'/dashboard/' + scope.row.id">
              <el-button size="small" @click="">仪表盘</el-button>
            </RouterLink>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getContiners, selectContainers } from "@/api/admin";
import Logo from "@/components/Logo.vue";
import { Ref, onMounted, ref } from "vue";
import { ElTable, ElTableColumn, ElInput, ElButton } from "element-plus";
const input = ref("");
let page = 1;
let number = 10;
interface User {
  date: string;
  name: string;
  address: string;
}
function search(value: string) {
  let dataFilters = JSON.parse(JSON.stringify(tableData)) as Array<continer>;
  dataFilters.filter((item, index) => {
    return item.name == value;
  });
}
let tableData: Ref<Array<continer>> = ref([]);
onMounted(() => {
  getContiners().then((res) => {
    tableData.value.push(...res.data);
  });
  // continerStatusFormatUtils.getValues(tableData.value);
});
</script>

<style lang="scss" scoped>
.dockers {
  height: 80%;
  padding: 44px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  flex: 1;
  width: 80%;
  .title {
    // @extend %middle-text;
    display: block;
    text-align: left;
    margin-bottom: 20px;
  }
  .dockers-table {
    width: 100%;
    text-align: left;
  }
  .el-scrollbar {
    text-align: left;
  }
}
</style>
