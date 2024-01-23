<template>
  <router-view />
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import store from "./store";

onMounted(() => {
  store.dispatch("user/loadToken");
});
const debounce = (fn: Function, delay: number) => {
  let timer: number | null = null;
  return function (this:ResizeObserver) {
    let context = this;
    let args = arguments;
    clearTimeout(timer as number);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    callback = debounce(callback, 16);
    super(callback);
  }
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
i {
  font-style: normal;
}
</style>
