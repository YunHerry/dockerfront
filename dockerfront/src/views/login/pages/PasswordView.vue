<template>
  <div class="body">
    <div class="title">
      <Logo></Logo>
      输入密码
    </div>
    <div class="center">
      <input class="input" placeholder="密码" v-model="password" />
    </div>
    <button class="next-button" @click="next()">登录</button>
  </div>
</template>
<script lang="ts" setup>
import Logo from "@/components/Logo.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { isEmpty } from "@/utils/stringUtils";
import { ElMessage } from "element-plus";
import store from "@/store";

const emit = defineEmits(["commitLoginInfo", "commitLogin"]);
const password = ref();
const router = useRouter();
function next() {
  emit(
    "commitLoginInfo",
    function (loginInfo: userInfo, password: string) {
      if (isEmpty(loginInfo.username)) {
        ElMessage.warning("账号信息有误,请重试");
        router.push("/login");
        return;
      }
      loginInfo.password = password;
      store
        .dispatch("user/login", {
          username: loginInfo.username,
          password: loginInfo.password,
        })
        .then((res) => {
          ElMessage.success("登陆成功");
          router.push("/");
        })
        .catch((err) => {
          // ElMessage.warning("账号或密码错误");
        });
    },
    password.value
  );
}
</script>
<style></style>
