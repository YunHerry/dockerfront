<template>
  <div class="index-content">
    <div class="menu-content">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
        <span class="logo-name">docker-admin</span>
      </div>
      <div class="button" v-for="item in menus" @click="clickItem(item)">
        {{ item }}
      </div>
    </div>
    <div class="main-content">
      <userTop :show-logo="false"></userTop>
      <div class="view-content">
        <component :is="currentView"></component>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.button {
  padding: 20px 0;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}
.button:hover {
  background-color: antiquewhite;
}
.index-content {
  width: 100%;
  height: 100%;
  display: flex;
}
.menu-content {
  height: 100%;
  min-width: 200px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.main-content .top-content {
  height: 60px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
import containersManager from "./content-page/containersManager.vue";
import OrderManager from "./content-page/orderManager.vue";
import Other from "./content-page/other.vue";
import PacketManager from "./content-page/packetManager.vue";
import { DefineComponent, Ref, reactive, ref,markRaw } from "vue";
type stringKey = Record<string, DefineComponent<any, any, any>>;
const components: stringKey = {
  容器管理: markRaw(containersManager),
  订单管理: markRaw(OrderManager),
  其他: markRaw(Other),
  套餐管理: markRaw(PacketManager),
};
const menus: string[] = [];
for (let menuName in components) {
  menus.push(menuName);
}
let currentView: Ref<any> = ref(containersManager);
function clickItem(item: string) {
  currentView.value = components[item];
}
</script>
