<template>
  <div class="body">
    <div class="title">
      <Logo></Logo>
      <i>输入密码</i>
    </div>
    <div class="center">
      <i class="warning" v-show="nowWarn == 1">两次密码不一致</i>
      <input class="input" placeholder="输入密码" v-model="password" />
      <input class="input" placeholder="确认密码" v-model="password1" />
      <i>已有帐户？<RouterLink to="/login">前往登录!</RouterLink></i>
    </div>
    <button class="next-button" @click="goRegister">注册</button>
  </div>
</template>
<script lang="ts" setup>
import { isEmpty } from "@/utils/stringUtils";
import request from "@/utils/request";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { register } from "@/api/user";
const emit = defineEmits(["commitRegisterInfo"]);
const nowWarn = ref(0);
const password = ref("");
const password1 = ref("");
const router = useRouter();
function goRegister() {
  if (password.value != password1.value) {
    nowWarn.value = 1;
  } else {
    nowWarn.value = 0;
    emit(
      "commitRegisterInfo",
      function (registerInfo: userInfo, password: string) {
        if (isEmpty(registerInfo.username)) {
          ElMessage.warning("账号信息有误,请重试");
          router.push("/login/registerAccount");
          return;
        }
        registerInfo.password = password;
        console.log(registerInfo);
        register(registerInfo).then((res) => {
          if (res.code == 200) {
            ElMessage.success("注册成功");
          } else {
            router.push("/login");
          }
        });
      },
      password.value
    );
  }
}
</script>
