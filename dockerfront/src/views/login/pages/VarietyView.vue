<template>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
let response = ref();
  enum RecaptchaV2State {
  Init = 'init',
  Verified = 'verified',
  Expired = 'expired',
  Error = 'error',
}
const map = {
    [RecaptchaV2State.Init]: 'Click to Challenge',
    [RecaptchaV2State.Verified]: 'Verified',
    [RecaptchaV2State.Expired]: 'Expired',
    [RecaptchaV2State.Error]: 'Error',
  }
</script>