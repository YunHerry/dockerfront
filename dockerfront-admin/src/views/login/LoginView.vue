<template>
  <div class="middle">
    <div class="content">
      <transition name="toggle">
        <KeepAlive>
          <component
            :is="nowPage?.content"
            @update-login="changeUserValue"
            @update-register="changeRegValue"
            @router-next="next"
            class="component"
          ></component>
        </KeepAlive>
      </transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent, ref, markRaw, provide } from "vue";
import { useRouter } from "vue-router";
const find = (function () {
  let ComponntList = [
    markRaw({
      name: "inputLoginAccount",
      content: defineAsyncComponent(() => {
        return import("@/views/login/pages/AccountView.vue");
      }),
    }),
    markRaw({
      name: "inputLoginPassword",
      content: defineAsyncComponent(() => {
        return import("@/views/login/pages/PasswordView.vue");
      }),
    }),
    markRaw({
      name: "inputRegisterAccount",
      content: defineAsyncComponent(() => {
        return import("@/views/login/pages/RegisterAccountView.vue");
      }),
    }),
    markRaw({
      name: "inputRegisterPassword",
      content: defineAsyncComponent(() => {
        return import("@/views/login/pages/RegisterPasswordView.vue");
      }),
    }),
    markRaw({
      name: "variety",
      content: defineAsyncComponent(() => {
        return import("@/views/login/pages/VarietyView.vue");
      }),
    }),
  ];
  return (ComponentName: string) => {
    return ComponntList.find((item) => {
      return item.name == ComponentName;
    });
  };
})();
let userObject: userinfo = {
  username: "",
  password: "",
};
let regObject: userinfo = {
  username: "",
  password: "",
};
provide("userLoginObject", userObject);
let nowPage = ref(find("inputLoginAccount"));
const router = useRouter();
function changeUserValue(fn: Function) {
  fn.call(null, userObject);
}
function changeRegValue(fn: Function) {
  fn.call(null, regObject);
}
function next(nextViewName: string) {
  nowPage.value = find(nextViewName);
  console.log(nowPage);
}
</script>
<style lang="scss">
.middle {
  position: relative;
  width: 100%;
  height: 100%;
}
.component {
  transition: all 0.2s;
}
.next-button {
  background-color: #005da6;
  width: 100px;
  height: 40px;
  float: right;
  outline: transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: white;
  align-self: self-end;
}
.content {
  position: absolute;
  margin: 0 auto;
  max-width: 440px;
  width: calc(100% - 40px);
  min-width: 320px;
  min-height: 338px;
  padding: 44px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: baseline;
    min-width: 440px;
  }
  .input {
    width: 326px;
    font-size: 15px;
    height: 36px;
    outline: none;
    padding: 1px 10px;
    border-width: 1px;
    border: 0;
    border-bottom: 1px solid gray;
    padding-left: 0;
    display: block;
    align-self: center;
  }
  .center {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    align-self: center;
  }
  a {
    text-decoration: transparent;
    color: #00a7da;
    font-weight: 400;
    cursor: pointer;
  }
  .title {
    height: 60px;
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    flex-grow: unset;
    align-items: center;
    flex-direction: row;
    i {
      margin-left: 10px;
    }
  }
}
.toggle-enter-to {
   // 出现的时候向左滑一下的效果
}
//进入
.toggle-enter-from {
  opacity: 0;
  transform: translateX(-110%);
}
.toggle-leave-to {
  opacity: 0;
  transform: translateX(110%);

}
</style>
