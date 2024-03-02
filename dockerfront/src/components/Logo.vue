<template>
  <div :style="containerStyle" class="logo">
    <img src="@assets/logo.png" :style="imageStyle" alt="Logo" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
interface props {
  height: string;
}
let props = withDefaults(defineProps<props>(), {
  height: "28px",
});
let imageStyle = computed(() => {
  return {
    maxHeight: "100%",
    maxWidth: "100%",
  };
});
let containerStyle = computed(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: props.height,
  };
});
</script>
