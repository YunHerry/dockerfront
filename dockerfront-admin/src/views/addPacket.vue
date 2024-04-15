<template>
  <div class="add-packet">
    <h2>新增套餐</h2>
    <form @submit.prevent="addPacket">
      <div class="form-group">
        <label for="cpuType">cpu类型:</label>
        <input type="text" id="cpuType" v-model="packet.cpuType" required>
      </div>
      <div class="form-group">
        <label for="cpuCoreNumber">cpu核心数:</label>
        <input type="number" id="cpuCoreNumber" v-model="packet.cpuCoreNumber" required>
      </div>
      <div class="form-group">
        <label for="networkSpeed">网速:</label>
        <input type="number" id="networkSpeed" v-model="packet.networkSpeed" required>
      </div>
      <div class="form-group">
        <label for="disk">硬盘空间:</label>
        <input type="number" id="disk" v-model="packet.disk" required>
      </div>
      <div class="form-group">
        <label for="memory">内存限制:</label>
        <input type="number" id="memory" v-model="packet.memory" required>
      </div>
      <div class="form-group">
        <label for="cpuTypemoney">cpu类型价格:</label>
        <input type="number" id="cpuTypemoney" v-model="packet.cpuTypemoney" required>
      </div>
      <div class="form-group">
        <label for="cpuCoreNumberMoney">cpu核心价格:</label>
        <input type="number" id="cpuCoreNumberMoney" v-model="packet.cpuCoreNumberMoney" required>
      </div>
      <div class="form-group">
        <label for="networkSpeedMoney">1m网速价格:</label>
        <input type="number" id="networkSpeedMoney" v-model="packet.networkSpeedMoney" required>
      </div>
      <div class="form-group">
        <label for="diskMoney">1G存储空间价格:</label>
        <input type="number" id="diskMoney" v-model="packet.diskMoney" required>
      </div>
      <div class="form-group">
        <label for="memoryMoney">1G内存价格:</label>
        <input type="number" id="memoryMoney" v-model="packet.memoryMoney" required>
      </div>
      <div class="form-group">
        <label for="isFree">是否弹性收费:</label>
        <input type="checkbox" id="isFree" v-model="packet.isFree">
      </div>
      <button type="submit">{{ $route.params.packetConfig ? 'Save Packet' : 'Add Packet' }}</button>
    </form>
  </div>
</template>

<script>
import { createPacket } from "@/api/admin.ts";
import { useRouter } from "vue-router";
const router = useRouter();

export default {
  data() {
    return {
      packet: {
        _id: null, // 新增时无需设置 _id
        cpuType: '',
        cpuCoreNumber: 0,
        networkSpeed: 0,
        disk: 0,
        memory: 0,
        cpuTypemoney: 0,
        cpuCoreNumberMoney: 0,
        networkSpeedMoney: 0,
        diskMoney: 0,
        memoryMoney: 0,
        isFree: false
      }
    };
  },
  created() {

  },
  mounted() {
      // 在组件挂载后执行的操作
      console.log("传参信息mounted", this.$route.params.packetConfig);
      if (this.$route.params.packetConfig) {
        this.packet = { ...this.$route.params.packetConfig };
      }
    },
  methods: {
     submitPacket() {
        if (this.packet._id) {
          console.log("update packet");
          this.updatePacket();
        } else {
          console.log("add packet");
          this.addPacket();
        }
    },
    addPacket() {
      createPacket(this.packet)
        .then(response => {
          // Packet added successfully, do something
        })
        .catch(error => {
          // Error occurred while adding packet, handle the error
        });
    },
    updatePacket() {
      updatePacket(this.packet)
        .then(response => {
          // 套餐更新成功后的处理
        })
        .catch(error => {
          // 处理更新套餐时的错误
        });
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 150px;
}

input[type="checkbox"] {
  display: inline-block;
  width: auto;
}

button {
  margin-top: 20px;
}
</style>
