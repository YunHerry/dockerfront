<template>
  <div class="body">
    <div class="title">
      <Logo></Logo>
      <i>注册账户</i>
    </div>
    <i id="nullReminder" style="display: none; color: #e81123"
      >用户名不能为空!</i
    >
    <i id="occupationReminder" style="display: none; color: #e81123"
      >该用户名已被占用,请重试~</i
    >
    <i id="specificationReminder" style="display: none; color: #e81123"
      >用户名不能包含中文,且长度应在五到十二之间!</i
    >
    <div class="center">
      <input class="input" v-model="username" placeholder="用户名称" />
      <i>已有帐户？<a @click="cutoverLogin()">前往登录!</a></i>
    </div>
    <button class="next-button" @click="next">
      下一步
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logo from "@/components/Logo.vue";

const username = ref("");
const emit = defineEmits(["update-register", "router-next"]);
const router = useRouter();
function next() {
  emit("update-register", (item: userinfo) => {
    item.username = username.value || '';
  });
  emit("router-next","inputRegisterPassword");
}
function cutoverLogin() {
  emit("router-next", "inputLoginAccount");
}
</script>
<style lang="scss" scoped></style>

