<template>
  <div class="dockers">
    <i class="title">镜像管理</i>
    <div class="dockers-table">
      <el-row justify="space-evenly">
        <el-col :span="12">
          <el-statistic title="当前镜像数量" :value="268500" />
        </el-col>
        <el-col :span="12">
          <el-statistic :value="138">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                正在拉取数量
                <el-icon style="margin-left: 4px" :size="12">
                  <Male />
                </el-icon>
              </div>
            </template>
            <template #suffix>/100</template>
          </el-statistic>
        </el-col>
      </el-row>
      <el-row class="exec-content">
        <el-col :span="12"> 操作中心 </el-col>
        <el-col :span="12">
          <el-steps :active="2" direction="vertical">
            <el-step title="未开始" />
            <el-step title="拉取中" />
            <el-step title="拉取完成" />
          </el-steps>
        </el-col>
      </el-row>
      <el-table class="image-list" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="tag" label="Tag" width="180" />
        <el-table-column prop="name" label="镜像名称" width="180" />
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
            
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const tableData = ref([]);
const input = ref("");
function search(value: string) {
  let dataFilters = JSON.parse(JSON.stringify(tableData)) as Array<continer>;
  dataFilters.filter((item, index) => {
    return item.name == value;
  });
}
onMounted(() => {
  
});
</script>
<style lang="scss" scoped>
.dockers {
  //   height: 80%;
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
.exec-content,.image-list {
    margin-top: 60px;
}
</style>
