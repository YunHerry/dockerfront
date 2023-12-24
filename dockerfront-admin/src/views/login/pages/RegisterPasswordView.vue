<template>
  <div class="body">
    <div class="title">
      <Logo></Logo>
      <i>注册账户</i>
    </div>
    <i v-if="errCode == 1" class="err-text"
      >密码应至少含有一个大写字母和一个小写字母,若干个数字,不应含有中文，总和为8-16位。</i
    >
    <i v-else-if="errCode == 2" class="err-text">两次密码不一致</i>
    <div class="input-content">
      <input class="input" v-model="input" placeholder="输入密码" />
    <input class="input" v-model="againInput" placeholder="确认密码" />
    </div>
    <i>已有帐户？<a @click="cutoverLogin">前往登录!</a></i>
    <button class="next-button" @click="next">下一步</button>
  </div>
</template>
<script lang="ts" setup>
import{ register } from "@/api/admin";
import Logo from "@/components/Logo.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, watch } from "vue";
const emit = defineEmits(["update-register", "router-next"]);
let errCode = -1;
let input = ref("");
let againInput = ref("");
watch([input, againInput], () => {
  inputChange();
});
function inputChange() {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(input.value)) {
    errCode = 1;
    return;
  }
  if (input.value != againInput.value) {
    errCode = 2;
    return;
  }
  errCode = -1;
}
function next() {
  if (errCode != -1) return;
  emit("update-register", (item: userinfo) => {
    item.password = input.value || "";
    console.log(item);
    registerReq(item);
  });
  emit("router-next", "inputRegisterPassword");
}
function registerReq(regObject: userinfo) {
  register(regObject).then((res) => {
    if (res.code == 200) {
      ElMessage.info("注册成功");
      cutoverLogin();
    }
  });
}
function cutoverLogin() {
  emit("router-next", "inputLoginAccount");
}
</script>
<style lang="scss" scoped>
.err-text {
  color: #e81123;
}
.input-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 45%;
  padding: 30px 0;
  padding-bottom: 0px;
}
</style>
