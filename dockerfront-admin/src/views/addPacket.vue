<template>
  <div class="add-packet">
    <h2>Add Packet</h2>
    <form @submit.prevent="addPacket">
      <div class="form-group">
        <label for="cpuType">CPU Type:</label>
        <input type="text" id="cpuType" v-model="packet.cpuType" required>
      </div>
      <div class="form-group">
        <label for="cpuCoreNumber">CPU Core Number:</label>
        <input type="number" id="cpuCoreNumber" v-model="packet.cpuCoreNumber" required>
      </div>
      <div class="form-group">
        <label for="networkSpeed">Network Speed:</label>
        <input type="number" id="networkSpeed" v-model="packet.networkSpeed" required>
      </div>
      <div class="form-group">
        <label for="disk">Disk:</label>
        <input type="number" id="disk" v-model="packet.disk" required>
      </div>
      <div class="form-group">
        <label for="memory">Memory:</label>
        <input type="number" id="memory" v-model="packet.memory" required>
      </div>
      <div class="form-group">
        <label for="cpuTypemoney">CPU Type Money:</label>
        <input type="number" id="cpuTypemoney" v-model="packet.cpuTypemoney" required>
      </div>
      <div class="form-group">
        <label for="cpuCoreNumberMoney">CPU Core Number Money:</label>
        <input type="number" id="cpuCoreNumberMoney" v-model="packet.cpuCoreNumberMoney" required>
      </div>
      <div class="form-group">
        <label for="networkSpeedMoney">Network Speed Money:</label>
        <input type="number" id="networkSpeedMoney" v-model="packet.networkSpeedMoney" required>
      </div>
      <div class="form-group">
        <label for="diskMoney">Disk Money:</label>
        <input type="number" id="diskMoney" v-model="packet.diskMoney" required>
      </div>
      <div class="form-group">
        <label for="memoryMoney">Memory Money:</label>
        <input type="number" id="memoryMoney" v-model="packet.memoryMoney" required>
      </div>
      <div class="form-group">
        <label for="isFree">Is Free:</label>
        <input type="checkbox" id="isFree" v-model="packet.isFree">
      </div>
      <button type="submit">Add Packet</button>
    </form>
  </div>
</template>

<script>
import { createPacket } from "@/api/admin.ts";

export default {
  data() {
    return {
      packet: {
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
  methods: {
    addPacket() {
      createPacket(this.packet)
        .then(response => {
          // Packet added successfully, do something
        })
        .catch(error => {
          // Error occurred while adding packet, handle the error
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
