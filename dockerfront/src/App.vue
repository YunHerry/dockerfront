<template>
  <RouterView />
</template>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

i {
  font-style: normal;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $default-text-color;
}
html,body,#app {
  height: 100%;
}
</style>
<script lang="ts" setup>
import store from '@/store';
import { onMounted } from 'vue';

// import { useRecaptchaProvider } from 'vue-recaptcha'

// useRecaptchaProvider();
onMounted(() => {
  store.dispatch("user/loadToken").then(res=>{
    console.log(store.getters["user/users"])
  });
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