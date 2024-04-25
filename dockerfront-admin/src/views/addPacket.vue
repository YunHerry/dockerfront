<template>
  <div class="packets-content">
    <h2>新增套餐</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="套餐名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="套餐描述">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
      <el-form-item label="CPU">
            <el-slider
              v-model="form.cpuCoreNumber"
              show-input>
            </el-slider>
            <el-select v-model="form.cpuType" placeholder="CPU类型">
              <el-option label="intel" value="Intel"></el-option>
              <el-option label="amd" value="Amd"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="内存">
          <el-slider
            v-model="form.memory"
            show-input>
          </el-slider>
      </el-form-item>
      <el-form-item label="硬盘空间">
            <el-slider
              v-model="form.disk"
              show-input>
            </el-slider>
      </el-form-item>
      <el-form-item label="带宽">
        <el-slider
          v-model="form.networkSpeed"
          show-input>
        </el-slider>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addPacket">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
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
      },
      form: {
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
        isFree: false,
        name: '',
        desc: ''

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
      createPacket(this.form)
        .then(response => {
          // Packet added successfully, do something
          ElMessage.warning("创建套餐成功!");
        })
        .catch(error => {
          // Error occurred while adding packet, handle the error
          ElMessage.warning("创建套餐失败!"+this.form);
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
  width: 100%;
}
.packets-table {
  width: 100%;
  text-align: left;
}
</style>
