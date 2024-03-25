<template>
  <div class="common-layout">
    <el-container>
      <UserTop :show-nav="false" :show-logo="true"></UserTop>
      <el-main>
        <div class="order-content">
          <div class="main-title">订单</div>
          <div class="menu">
            <a
              :class="nowOptionIndex == 0 ? 'active' : ''"
              @click="tapOption(0)"
              >快速配置</a
            >
            <a
              :class="nowOptionIndex == 1 ? 'active' : ''"
              @click="tapOption(1)"
              >自定义配置</a
            >
          </div>
          <RouterView v-slot="{ Component }">
            <transition>
              <component ref="orderTab" :is="Component" />
            </transition>
          </RouterView>
        </div>
      </el-main>
      <el-footer>
        <!-- <div class="tab-item">
          时长:
          <el-select
            v-model="worthy"
            placeholder="Select"
            size="large"
          ></el-select>
          数量:
          <el-input-number v-model="amount" :min="1" :max="10" />
        </div> -->
        <div class="tab-item">
          费用
          <button @click="submit" class="btn">立刻购买</button>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { Ref, onMounted, ref ,reactive} from "vue";
import { getPacket, getImages,createOrder } from "@/api/user";
import { orderPage } from "./pages/DefaultOrder.vue";
import { useRoute } from "vue-router";
const route = useRoute();
let bandwidth = ref(0);
let worthy = ref();
let amount = ref(1);
const orderTab:Ref<orderPage | null> = ref(null);
const nowOptionIndex = ref(0);
function tapOption(index: number) {
  nowOptionIndex.value = index;
}
function submit(e:MouseEvent) {
  const {packetId,orderConfig} = orderTab?.value?.submit();
  console.log(packetId,orderConfig)
  createOrder(packetId, orderConfig).then((res) => {
    console.log("创建订单成功!");
    route.push("/userDashboard");
  });
}
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
  width: 144px;
  height: 88px;
  padding: 0;
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
