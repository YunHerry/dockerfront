<template>
  <div class="middle">
    <div class="content">
      <RouterView
        @commitLoginInfo="commitLoginInfo"
        @commitRegisterInfo="commitRegisterInfo"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const loginData = ref({
  username: "",
  password: "",
});
const registerData = ref({
  username: "",
  password: "",
});
const dir = route.params.red;
//访问数据
function commitLoginInfo(callback: Function, data: string) {
  callback.call(loginData.value,loginData.value,data);
}
function commitRegisterInfo(callback: Function, data: string) {
  callback.call(registerData.value,registerData.value,data);
}
</script>
<style lang="scss">
.middle {
  position: relative;
  width: 100%;
  height: 100%;
}
.next-button {
  background-color: #005da6;
  width: 100px;
  height: 40px;
  float: right;
  outline: transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: white;
  align-self: self-end;
}
.content {
  position: absolute;
  margin: 0 auto;
  max-width: 440px;
  width: calc(100% - 40px);
  min-width: 320px;
  min-height: 338px;
  padding: 44px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  .body:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: baseline;
  }
  .input {
    width: 326px;
    font-size: 15px;
    height: 36px;
    outline: none;
    padding: 1px 10px;
    border-width: 1px;
    border: 0;
    border-bottom: 1px solid gray;
    padding-left: 0;
    display: block;
    align-self: center;
  }
  .center {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    align-self: center;
    .warning {
      font-style: normal;
      color: #e81123;
    }
  }
  a {
    text-decoration: transparent;
    color: #00a7da;
    font-weight: 400;
    cursor: pointer;
  }
  .title {
    height: 60px;
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    flex-grow: unset;
    align-items: center;
    flex-direction: row;
    i {
      margin-left: 10px;
    }
  }
}
</style>
