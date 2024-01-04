<template>
  <div class="body">
    <div class="title">
      <Logo></Logo>
      <i>注册账户</i>
    </div>

    <div class="center">
      <i class="warning" v-show="nowWarn == 1">用户名不能为空!</i>
      <!-- <i class="warning" v-show="nowWarn == 3">该用户名已被占用,请重试~</i>
      <i class="warning" v-show="nowWarn == 2"
        >用户名不包含中文和空格,且长度在6到16!</i
      > -->
      <input v-model="username" class="input" placeholder="用户名称" />
      <i>已有帐户？<RouterLink to="/login">前往登录!</RouterLink></i>
    </div>
    <button class="next-button" @click="goRegisteredPassword">下一步</button>
  </div>
</template>
<script lang="ts" setup>
import { isEmpty } from "@/utils/stringUtils";
import { ref } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["commitRegisterInfo"]);
const nowWarn = ref(0);
const username = ref("");
const router = useRouter();
function goRegisteredPassword() {
  if (isEmpty(username.value)) {
    nowWarn.value = 1;
  }
  emit(
    "commitRegisterInfo",
    function (registerInfo: userInfo, username: string) {
      registerInfo.username = username;
    },
    username.value
  );
  router.push("/login/registerPassword");
}
</script>
