<template>
  <div class="base-content">
    <div class="title">基础配置</div>
    <div class="config-from">
      <div class="instance base_item">
        <div class="part-title">实例</div>
        <div class="items">
          <div
            v-for="(packetItem, index) in packetList"
            :class="index == nowInstanceIndex ? 'active' : ''"
            @click="tapInstance(index)"
          >
            <!-- 基础配置 (2H2GB) -->
            {{ packetItem.name }}
            <div class="produce_description">
              {{ packetItem.description }}
            </div>
            <!-- <div class="info">系统盘: 50GB</div> -->
          </div>
          <!-- <div>
                      <el-skeleton :rows="3">
                        <template #template>
                          <div>
                            <el-skeleton-item variant="p" style="width: 50%" />
                            <el-skeleton-item
                              variant="text"
                              style="margin-top: 4px; width: 80%"
                            />
                            <el-skeleton-item variant="p" style="width: 40%" />
                          </div>
                        </template>
                      </el-skeleton>
                    </div> -->
          <div></div>
        </div>
      </div>
      <div class="mirror base_item">
        <div class="part-title">镜像</div>
        <div class="mirror-content">
          <!-- <div class="menu">
                      <a href="">快速配置</a>
                      <a href="">自定义配置</a>
                    </div> -->
          <div class="mirror-panel">
            <div
              class="mirror-item"
              v-for="image in imageList"
              @click="tapImage(image.name)"
              :class="image.name == nowImageName ? 'active' : ''"
            >
              <div class="mirror-img">
                <img
                  src="https://cloudcache.tencent-cloud.cn/qcloud/ui/cvm-new-buy/src/styles/images/mirror/TencentOS-weak.svg"
                  alt=""
                />
              </div>
              <div class="mirror-item_title">{{ image.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <el-input v-model="nowPorts" placeholder="端口映射" clearable />

      <el-input v-model="nowContainerName" placeholder="容器名" clearable />

      <el-form
        ref="formRef"
        :model="envs"
        label-width="120px"
        class="demo-dynamic"
      >
        <el-form-item
          v-for="(item, index) in envs"
          :key="index"
          :label="'环境变量' + index"
          :prop="'myenvs.' + index + '.value'"
          :rules="{
            required: true,
            message: '环境变量不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="envs[index]" />
          <el-button class="mt-2" @click.prevent="removeDomain(index)"
            >删除当前变量</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">新增环境变量</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="bandwidth base_item">
        <div class="part-title">带宽</div>
        <div class="bandwidth-content">
          <el-slider v-model="bandwidth" :max="100" :min="1" show-input />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Ref, onMounted, ref,defineEmits } from "vue";
import { getPacket, getImages } from "@/api/user";
import type { FormInstance } from 'element-plus'
const nowInstanceIndex = ref(0);
const nowImageName: Ref<string> = ref("");
const packetList: Ref<Array<packet>> = ref([]);
const imageList: Ref<Array<image>> = ref([]);
const envs: Ref<Array<string>> = ref([]);
const nowPorts = ref("");
const nowContainerName = ref("");
const formRef = ref<FormInstance>();
const emit = defineEmits(["submit"]);
onMounted(() => {
  getPacket({ page: 1, pageSize: 4 }).then((res) => {
    packetList.value.push(...res.data);
  });
  getImages({
    page: 1,
    pageSize: 6,
  }).then((res) => {
    imageList.value.push(...res.data);
    nowImageName.value = res.data[0].name;
  });
});
function tapInstance(index: number) {
  nowInstanceIndex.value = index;
}
function tapImage(name: string) {
  nowImageName.value = name;
}
const removeDomain = (index: number) => {
  envs.value.splice(index, 1);
};
const addDomain = () => {
  envs.value.push("sdfs");
};
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
function submit() {
  const orderConfig: orderPacket = {
    envs: myenvs.value,
    imageName: nowImageName.value,
    ports: nowPorts.value.split(" "),
    WorkingDir: "121",
    containerName: nowContainerName.value,
  };
  emit("submit",orderConfig)
}

// function tapOption(index: number) {
//   nowOptionIndex.value = index;
// }
</script>
<style lang="scss" scoped>
.el-footer {
  .tab-item {
    display: inline-block;
  }
}
//@TODO bug
.el-slider {
  .el-slider__button-wrapper {
    top: -19px !important;
  }
}

.bandwidth-content {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}
.mirror-panel {
  display: flex;
}
.mirror-item_title {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  margin-top: 4px;
}
.mirror-item:first-child {
  margin-left: 0;
}
.mirror-item {
  flex-direction: column;
  //width: 144px;
  height: 88px;
  padding: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f2f5;
  border: 1px solid #f1f2f5;
  margin: 4px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
}
.mirror-item.active {
  border-color: #0052d9;
}
.mirror-img {
  height: 32px;
}
.mirror-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.base_item {
  display: flex;
  margin-top: 20px;
}
.items {
  display: flex;
  & > div {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 338px;
    height: auto;
    min-height: 88px;
    justify-content: flex-start;
    background-color: transparent;
    border-color: #e3e6eb;
    box-sizing: border-box;
    border: 1px solid #f1f2f5;
    cursor: pointer;
    margin: 4px;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: $default-text-color;
    .produce_description {
      font-weight: 400;
      margin-top: 4px;
      font-size: 12px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.6);
    }
    .info {
      display: flex;
      flex-direction: column;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  div.active {
    border-color: #0052d9;
  }
}
.config-from {
  display: table;
}
.base-content {
  padding-top: 18px;
  .title {
    border-left: 4px solid $blue;
    font-size: 18px;
    padding-left: 10px;
    margin-bottom: 20px;
  }
}
.part-title {
  font-size: 14px;
  color: $gray;
  min-height: 150px;
  min-width: 150px;
  display: inline-block;
}
.el-avatar {
  cursor: pointer;
}
.el-avatar:hover + .user-info,
.user-info:hover {
  display: block;
}
.user-info {
  display: none;
  position: fixed;
  top: 62px;
  right: 0px;
  background-color: #151822;
  max-height: calc(100vh - 62px);
  height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 140px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.el-avater {
  float: right;
}

.common-layout,
.el-container {
  height: 100%;
}
.el-main {
  margin-top: 20px;
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
.order-content:first-child {
  @extend %main-title;
  margin: 0px 24px;
}
.order-content {
  .menu {
    width: 100%;
    position: relative;
    border-bottom: 1px solid #e7eaef;
    box-sizing: border-box;

    a {
      font-weight: 600;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.9);
      color: $default-text-color;
      text-decoration: none;
      display: inline-block;
      padding: 0 40px;
      position: relative;
      line-height: 48px;
      cursor: pointer;
    }
    a:after {
      border-bottom-color: #e7eaef !important;
      width: 100%;
      transition: border-color 0.15s ease-in-out, width 0.15s ease-in-out,
        height 0.15s ease-in-out;
      position: absolute;
      content: "";
      bottom: 0px;
      left: 0;
      box-sizing: border-box;
      height: 2px;
      border-bottom: 2px solid;
    }
    a.active:after {
      border-bottom-color: #0052d9 !important;
    }
  }
}
</style>
