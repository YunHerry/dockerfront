<template>
  <div class="index-content">
    <div class="menu-content">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
        <span class="logo-name">docker-admin</span>
      </div>
      <div class="current-item" :style="{'top':(nowViewIndex * 60)+61 + 'px'}"></div>
      <div class="button" v-for="(item, index) in menus" @click="clickItem(item, index)" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="main-content">
      <userTop :show-logo="false"></userTop>
      <div class="view-content">
        <component :is="currentView" :key="componentKey"></component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Existing CSS styles */
.button {
  height: 60px;
  box-sizing: border-box;
  padding: 20px 40px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}
.index-content {
  width: 100%;
  height: 100%;
  display: flex;
  .current-item {
    position: absolute;
    height: 60px;
    width: 6px;
    background-color: #6EA4FD;
    transition: 0.2s all ease-in-out;
  }
}
.menu-content {
  height: 100%;
  min-width: 200px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.view-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
}
.menu-content .logo {
  width: 100%;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  img {
    height: 37px;
    width: 37px;
  }
  .logo-name {
    margin-left: 5px;
  }
}
</style>

<script lang="ts" setup>
import userTop from "@/components/user/UserTop.vue";
import UserDashboard from "./content-page/UserDashboard.vue";
import OrderManager from "./content-page/orderManager.vue";
import ImageManager from "./content-page/ImageManager.vue";
import Other from "./content-page/other.vue";
import PacketManager from "./content-page/packetManager.vue";
import { DefineComponent, Ref, reactive, ref, markRaw } from "vue";

type views = Record<string, DefineComponent<any, any, any>>;
const components: views = {
  "容器管理": markRaw(UserDashboard),
  "订单管理": markRaw(OrderManager),
  "镜像管理": markRaw(ImageManager),
  "其他": markRaw(Other),
  "套餐管理": markRaw(PacketManager),
};

const menus: string[] = [];
for (let menuName in components) {
  menus.push(menuName);
}

let currentView: Ref<any> = ref(UserDashboard);
let nowViewIndex = ref(0);
let componentKey = ref(Date.now());  // Initialize with a unique value

function clickItem(item: string, index: number) {
  currentView.value = components[item];
  nowViewIndex.value = index;
  componentKey.value = Date.now();  // Change key to force re-creation
}
</script>
