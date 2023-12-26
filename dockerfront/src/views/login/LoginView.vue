<template>
  <div class="middle">
    <div class="content">
      <RouterView  @commitUsername="setUserName" @commitPassword="setPassword" @commitLogin="login"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import store from '@/store';
import { useRouter,useRoute } from "vue-router";
let username:string = "";
let password:string = "";
const router = useRouter();
const route = useRoute();
const dir = route.params.red;
console.log(dir);
function setUserName(value:string) {
    username = value;
}
function setPassword(value:string) {
    password = value;
}
function login() {
  store.dispatch("user/login",{username: username,password: password}).then(()=>{
    console.log("触发");
    router.push("/dockerManager");
  }).catch(err=>{
    console.log(err);
  })
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
    align-items: baseline
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
