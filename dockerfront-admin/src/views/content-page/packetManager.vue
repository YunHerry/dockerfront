<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <UserTop :show-nav="false" :show-logo="true"></UserTop>
      </el-header>
      <el-main>
        <div class="dockers">
          <i class="title">套餐管理</i>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="名称/ID" width="180" />
            <el-table-column prop="description" label="描述" width="180" />
            <el-table-column prop="hardwareId" label="硬件id" width="180" />

          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { getPacket } from "@/api/admin";
import UserTop from "@/components/user/UserTop.vue";
import { Ref, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

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
