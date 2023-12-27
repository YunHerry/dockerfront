<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <UserTop :show-nav="false" :show-logo="true"></UserTop>
      </el-header>
      <el-main>
        <div class="dockers">
          <i class="title">容器管理</i>
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
                <!-- <RouterLink :to="'/webshell/1111111111111'">
                  <el-button size="small" @click="">编辑参数</el-button>
                </RouterLink> -->
                <RouterLink :to="'/webshell/'+scope.row.id">
                  <el-button size="small" @click="">WebShell</el-button>
                </RouterLink>
                <RouterLink :to="'/dashboard/'+scope.row.id">
                  <el-button size="small" @click="">仪表盘</el-button>
                </RouterLink>
              </template>
            </el-table-column>
          </el-table>
        </div></el-main
      >
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { getContainers } from "@/api/user";
import UserTop from "@/components/user/UserTop.vue";
import { Ref, onMounted, ref } from "vue";
import continerStatusFormatUtils from "@/utils/continerStatusFormatUtils";
import { useRoute } from "vue-router";
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
  getContainers(page,number).then(res=>{
    tableData.value.push(...res.data);
  });
  continerStatusFormatUtils.getValues(tableData.value);
});
</script>

<style lang="scss" scoped>
.common-layout,
.el-container {
  height: 100%;
}
.el-main {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-header {
  width: 100%;
  height: 62px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 0 20px !important;
  justify-content: space-between;
}
.title {
  @extend %middle-text;
  display: block;
  text-align: left;
  margin-bottom: 20px;
}
.dockers {
  width: 80%;
  height: 80%;
  padding: 44px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.el-scrollbar {
  text-align: left;
}
</style>
