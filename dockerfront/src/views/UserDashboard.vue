<template>
  <div class="user-dashboard-content">
    <el-container>
      <el-header>
        <UserTop :show-nav="false" :show-logo="true"></UserTop>
      </el-header>
      <el-main class="dashboard-content">
        <div class="user-info card">
          <h3 class="title">用户信息</h3>
        </div>
        <div class="user-orders card">
          <h3 class="title">订单中心</h3>
          <el-table :data="userOrders" style="width: 100%">
            <el-table-column prop="name" label="名称/ID" width="180" />
            <el-table-column prop="state" label="状态" width="180">
              <template #default="scope">
                <!-- {{ getValue(scope.row.state)?.value }} -->
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
                <RouterLink :to="'/dashboard/' + scope.row.id">
                  <el-button size="small" @click="">仪表盘</el-button>
                </RouterLink>
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
import UserTop from "@/components/user/UserTop.vue";
import { getOrders } from "@/api/user";
import { Ref, ref } from "vue";
const userOrders: Ref<Array<order>> = ref([]);
getOrders({ page: 1, pageSize: 10 }).then((res) => {
  userOrders.value = [];
  userOrders.value.push(...res.data);
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
    height: 400px;
  }
  .user-orders {
    margin-top: 10px;
    width: 80%;
    height: 400px;
  }
}
.user-dashboard-content {
    height: 100%;
    .el-container {
        height: 100%;
    }
}
.card {
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.16);
  }
</style>
