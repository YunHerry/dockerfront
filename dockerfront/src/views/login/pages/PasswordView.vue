<template>
  <div class="body">
    <div class="title">
      <Logo></Logo>
      输入密码
    </div>

    <div class="center">
      <input class="input" placeholder="密码" onclick="" v-model="password" />
      <i class="text-small from-margin"
        ><a onclick="cutoverRegistered()">忘记了密码？</a></i
      >
      <i class="text-small from-margin"
        ><a onclick="cutoverLoginConfirm(this)">使用邮箱验证码登录</a></i
      >
    </div>
    <button class="next-button" @click="next()">
      登录
    </button>
  </div>
</template>
<script lang="ts" setup>
import Logo from "@/components/Logo.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(['commitPassword','commitLogin'])
const password = ref();
const router = useRouter();
function next() {
  emit("commitPassword",password.value);
  emit("commitLogin",password.value);
  // router.push('/login/variety');
}
</script>
<style></style>
