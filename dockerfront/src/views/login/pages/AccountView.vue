<template>
  <div class="body">
    <div class="title">
      <Logo></Logo>
      <i>登录</i>
    </div>
    <div class="center">
      <i class="warning" v-show="nowWarn == 1">用户名为空!</i>
      <input
        class="input"
        placeholder="邮箱/用户ID"
        onchange=""
        v-model="username"
      />
      <div>
        <i class="text-small from-margin"
          >没有帐户？<RouterLink to="/login/registerAccount"
            >注册一个!</RouterLink
          ></i
        >
      </div>
    </div>
    <button class="next-button" @click="next()">下一步</button>
  </div>
</template>
<script lang="ts" setup>
import Logo from "@/components/Logo.vue";
import { isEmpty } from "@/utils/stringUtils";
import { ref } from "vue";
import { useRouter } from "vue-router";
const username = ref();
const nowWarn = ref(0);
const emit = defineEmits(["commitLoginInfo"]);
const router = useRouter();
function next() {
  if (isEmpty(username.value)) {
    nowWarn.value = 1;
    return;
  }
  nowWarn.value = 0;
  emit(
    "commitLoginInfo",
    function (loginInfo: userInfo, username: string) {
      loginInfo.username = username;
    },
    username.value
  );
  router.push("/login/password");
}
</script>
<style lang="scss" scoped></style>
