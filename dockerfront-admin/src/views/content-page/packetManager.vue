<template>
  <div class="packets-content">
    <i class="title">套餐管理</i>
    <div class="dockers-table">
      <el-button @click="resetData(),isShowAddPacket = true">新增套餐</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称/ID" width="180" />
        <el-table-column prop="description" label="描述" width="180" />
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
            <el-button size="small" @click="editPacket(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="isShowAddPacket"
      title="套餐"
      width="500"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="nowPacketData" label-width="80px">
        <el-form-item label="套餐名称">
          <el-input v-model="nowPacketData.data.name"></el-input>
        </el-form-item>
        <el-form-item label="套餐描述">
          <el-input v-model="nowPacketData.data.description"></el-input>
        </el-form-item>
        <el-form-item label="CPU参数">
          <el-select-v2
            v-model="nowPacketData.data.hardware.cpuCoreNumber"
            :options="cpuCoreOption"
            placeholder="CPU核心数量"
          />
          <el-select
            v-model="nowPacketData.data.hardware.cpuType"
            placeholder="CPU类型"
            style="margin-top: 16px"
          >
            <el-option label="intel" value="Intel"></el-option>
            <el-option label="amd" value="Amd"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬盘空间">
          <el-slider
            v-model="nowPacketData.data.hardware.disk"
            :min="1"
            :format-tooltip="(val:number)=>`${val}GB`"
            class="data-line"
          >
          </el-slider>
          {{ nowPacketData.data.hardware.disk }}GB
        </el-form-item>
        <el-form-item label="内存">
          <el-slider
            v-model="nowPacketData.data.hardware.memory"
            :min="1"
            :format-tooltip="(val:number)=>`${val}G`"
            class="data-line"
          />
          {{ nowPacketData.data.hardware.memory }}G
        </el-form-item>

        <el-form-item label="带宽">
          <el-slider
            v-model="nowPacketData.data.hardware.networkSpeed"
            :min="1"
            :format-tooltip="(val:number)=>`${val}M`"
            class="data-line"
          >
          </el-slider>
          {{ nowPacketData.data.hardware.networkSpeed }}M
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShowAddPacket = false">Cancel</el-button>
          <el-button type="primary" @click="submitPacket"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getPacket, createPacket, updatePacket } from "@/api/admin";
import UserTop from "@/components/user/UserTop.vue";
import { Ref, mergeProps, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  ElTable,
  ElTableColumn,
  ElInput,
  ElButton,
  ElMessage,
} from "element-plus";
const input = ref("");
const router = useRouter();
const nowPacketData = reactive<{ data: packet; packetConfig: packetConfig }>({
  data: {
    description: "",
    hardware: {
      cpuCoreNumber: 1,
      cpuType: "1",
      createdAt: "",
      disk: 0,
      id: 2,
      memory: 0,
      money: 0,
      networkSpeed: 0,
      updatedAt: "",
    },
    hardwareId: -1,
    id: -1,
    name: "",
  },
  packetConfig: {
    cpuType: "",
    cpuCoreNumber: 0,
    networkSpeed: 0,
    disk: 0,
    memory: 0,
    cpuTypemoney: 0,
    cpuCoreNumberMoney: 0,
    networkSpeedMoney: 0,
    diskMoney: 0,
    memoryMoney: 0,
    isFree: false,
    name: "",
    desc: "",
  },
});
function resetData() {
  nowPacketData.data = {
    description: "",
    hardware: {
      cpuCoreNumber: 1,
      cpuType: "1",
      createdAt: "",
      disk: 0,
      id: 2,
      memory: 0,
      money: 0,
      networkSpeed: 0,
      updatedAt: "",
    },
    hardwareId: -1,
    id: -1,
    name: "",
  };
}
const cpuCoreOption = [1, 2, 4, 8, 16, 32].map((item) => {
  return {
    value: item,
    label: item + "核",
  };
});
const isShowAddPacket = ref(false);

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
function submitPacket() {
  console.log(!nowPacketData.data.id);
  if (nowPacketData.data.id) {
    console.log("update packet");
    updatePacket(nowPacketData.data)
        .then(response => {
          // 套餐更新成功后的处理
          ElMessage.warning("更新套餐成功!");
          isShowAddPacket.value =false;
          resetData();
          refreshData();
        })
        .catch(error => {
          // 处理更新套餐时的错误
          ElMessage.warning("更新套餐失败!"+nowPacketData);
        });
  } else {
    console.log("add packet");
    const data = Object.assign(
      nowPacketData.packetConfig,
      nowPacketData.data.hardware
    );
    data.name = nowPacketData.data.name;
    data.desc = nowPacketData.data.description;
    createPacket(data)
      .then((response) => {
        // Packet added successfully, do something
        ElMessage.warning("创建套餐成功!");
        isShowAddPacket.value = false;
        resetData();
        refreshData();
      })
      .catch((error) => {
        // Error occurred while adding packet, handle the error
        ElMessage.warning("创建套餐失败!" + nowPacketData);
      });
  }
}
function editPacket(packet: packet) {
  nowPacketData.data = Object.assign(nowPacketData.data, packet);
  nowPacketData.data.id = packet.id;
  isShowAddPacket.value = true;
  console.log(nowPacketData.data);
}
function showAddPacket() {}
function toAddPacket() {
  router.push("AddPacket"); // Navigate to the AddPacket page
}
function refreshData() {
  tableData.value = [];
  getPacket({ page: 1, pageSize: 20 }).then((res) => {
    tableData.value.push(...res.data);
  });
}
onMounted(() => {
  refreshData();
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
.data-line {
  width: 80%;
  margin: 0 10px;
  margin-right: 22px;
}
</style>
