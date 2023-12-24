<template>
    <div class="body">
      <div class="title">
        <Logo></Logo>
        <i>登录</i>
      </div>
      <div class="center">
        <input class="input" placeholder="邮箱/用户ID" v-model="username" />
        <div>
          <i class="text-small from-margin"
            >没有帐户？<a
              href="javascript:void(0);"
              :onclick="cutoverRegistered"
              >注册一个!</a
            ></i
          >
        </div>
        <!-- <i class="text-small from-margin"
        ><a href="javascript:void(0);" onclick="loginChangeModus(this)"
          >使用邮箱登录</a
        ></i
      > -->
      </div>
      <button class="next-button" @click="next()">下一步</button>
    </div>
</template>
<script lang="ts" setup>
import Logo from "@/components/Logo.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const username = ref("");
const emit = defineEmits(["update-login", "router-next"]);
const router = useRouter();
function next() {
  emit("update-login", (item: userinfo) => {
    item.username = username.value || "";
    console.log(item);
  });
  emit("router-next", "inputLoginPassword");
}
function cutoverRegistered() {
  emit("router-next", "inputRegisterAccount");
}
</script>
<style lang="scss" scoped></style>
