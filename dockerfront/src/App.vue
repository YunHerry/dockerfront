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
import { useRecaptchaProvider } from 'vue-recaptcha'

useRecaptchaProvider();
</script>