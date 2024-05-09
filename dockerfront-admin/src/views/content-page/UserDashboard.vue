<template>
  <div class="user-dashboard-content">
    <el-container>
      <!-- <el-header>
        <UserTop :show-nav="false" :show-logo="true"></UserTop>
      </el-header> -->
      <el-main class="dashboard-content">
        <div class="user-info card">
          <h3 class="title">用户信息</h3>
          <el-row>
            <el-col :span="6">
              <el-statistic title="支付金额" :value="268500" />
            </el-col>
            <el-col :span="6">
              <el-statistic :value="10">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    已完成订单数量
                    <el-icon style="margin-left: 4px" :size="10">
                      <Male />
                    </el-icon>
                  </div>
                </template>
                <template #suffix>/10</template>
              </el-statistic>
            </el-col>
            <el-col :span="6">
              <el-statistic title="当前服务器总数" :value="9" />
            </el-col>
            <el-col :span="6">
              <el-statistic title="当前订单数" :value="11">
                <template #suffix>
                  <el-icon style="vertical-align: -0.125em">
                    <ChatLineRound />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
          </el-row>
        </div>
        <div class="user-orders card">
          <h3 class="title">容器列表</h3>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="名称/ID" width="180" />
            <el-table-column prop="state" label="状态" width="180">
              <template #default="scope">
                {{ getValue(scope.row.state)?.value }}
              </template>
            </el-table-column>
            <el-table-column prop="packetId" label="套餐" width="180" />
            <!-- <el-table-column width="180">
              <template #header>
                <el-input
                  v-model="input"
                  size="small"
                  placeholder="关键字检索"
                  @change="search"
                  clearable
                />
              </template>
            </el-table-column> -->
            <el-table-column label="操作">
              <template #default="scope">
                <!-- <RouterLink :to="'/webshell/1111111111111'">
                  <el-button size="small" @click="">编辑参数</el-button>
                </RouterLink> -->
                <!-- {{ scope.row }} -->
                <RouterLink :to="'/containerDashboard/' + scope.row.id">
                  <el-button v-if="scope.row.state === '创建成功!' || scope.row.state==1 " size="small" @click="">仪表盘</el-button>
                </RouterLink>
                <!-- <el-button size="small" v-if="scope.row.state === '未支付'" @click="pay(scope.row.id)">支付</el-button> -->

                <RouterLink
                  :to="'/webshell/' + scope.row.id"
                  v-show="scope.row.state == 1"
                >
                  <el-button size="small" @click="">WebShell</el-button>
                </RouterLink>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { getContainers } from "@/api/admin";
import UserTop from "@/components/user/UserTop.vue";
import { Ref, onMounted, ref } from "vue";
import { getValue, getValues } from "@/utils/continerStatusFormatUtils";
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
  getContainers(page, number).then((res) => {
    tableData.value.push(...res.data);
  });
  // continerStatusFormatUtils.getValues(tableData.value);
});
</script>
<style lang="scss" scoped>
.dashboard-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  .user-info {
    margin-top: 10px;
    width: 80%;
    height: 200px;
    .title {
      margin-bottom: 40px;
    }
    .el-col {
      text-align: center;
    }
  }
  .user-orders {
    margin-top: 10px;
    width: 80%;
  }
}
.user-dashboard-content {
  height: 100%;
  width: 80%;
  .el-container {
    height: 100%;
  }
}

</style>
