<template>
  <template v-if="userLoginStatus">
    <div class="user-info">
      <div class="left-top">
        <template v-if="props.showLogo">
          <Logo></Logo>
        </template>
        <template v-if="props.showLogo && props.showNav">
          <div class="border"></div>
        </template>
        <template v-if="props.showNav">
          <i class="tab-btn link">常见问题</i>
          <i class="tab-btn link">帮助中心</i>
          <i class="tab-btn link">关于我们</i>
        </template>
      </div>
      <ul class="user-about">
        <li>
          <el-avatar
            :size="40"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </li>
        <li>
          <div class="show-window">
            <div class="user-profile">
              <div class="username" v-show="userProfile">{{ userProfile?userProfile.userName:"用户" }}</div>
              <div class="rest-money">
                <div class="title">钱包金额</div>
                <div class="money">{{ userProfile?userProfile.balance:0 }}<span class="unit">￥</span></div>
              </div>
              <div class="work-btns">
                <RouterLink to="/dockerManager" class="work-btn">容器列表</RouterLink>
                <RouterLink to="/userDashboard" class="work-btn">控制台</RouterLink>
                <RouterLink to="/" class="work-btn">用户资料</RouterLink>
              </div>
              <div class="exit-btn">
                注销
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  <template v-else>
    <div class="right-top">
      <RouterLink to="/login/registerAccount" class="tab-btn btn-register"
        >注册</RouterLink
      >
      <RouterLink to="/login" class="tab-btn btn-login">登录</RouterLink>
    </div>
  </template>
</template>
<style scoped lang="scss">
.user-about {
  list-style: none;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
}
.user-about:hover .show-window {
  display: block;
}
.user-info {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  align-items: center;
  .logo {
    margin-left: 20px;
  }
}
.user-info,
.left-top {
  height: 62px;
}
.el-avatar {
  cursor: pointer;
}
.show-window {
  display: none;
  position: absolute;
  top: 62px;
  right: 0px;
  z-index: 10;
  background-color: $white;
  max-height: calc(100vh - 62px);
  height: 220px;
  width: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 140px;
  box-shadow: 0 8px 16px #0000001f;
  padding: 15px;
  box-sizing: border-box;
  .user-profile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .username {
      margin-top: 10px;
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
    }
    .rest-money {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 10px 0;
      .title {
        color: $gray;
        font-size: 14px;
      }
      .money {
        font-weight: 700;
        font-size: 30px;
        .unit {
          font-size: 24px;
        }
      }
    }
    .work-btns {
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      cursor: pointer;
      .work-btn {
        padding: 5px 10px;
        color: $black;
        font-style: normal;
        text-decoration: none;
      }
      .work-btn:nth-child(2) {
        border: solid;
        border-color: #e9e9e9;
        border-width: 0 1px;
        padding: 5px 30px;
        
      }
    }
    .exit-btn {
       width: 100%;
       text-align: center;
       cursor: pointer;
       margin-bottom: 10px;
    }
  }
}
.el-avater {
  float: right;
}

.el-header {
  height: 62px;
  padding: 0 !important;
  @extend %flex-vertical-center;
  flex: 1;
  border-bottom: 1px solid rgba(61, 61, 61, 0.1);
  .tab-btn {
    @extend %small-text;
    text-decoration: none;
    color: $black;
  }
  .link {
    margin: 0 10px;
  }
  .right-top {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    div {
      display: inline-block;
    }
    .btn-register {
      @extend %small-text;
      margin: 0 10px;
    }
    .btn-login {
      @extend .btn;
      width: 112px;
      height: 50%;
    }
  }
  .left-top {
    @extend %flex-vertical-center;
    height: 100%;
    .border {
      width: 1px;
      height: 60%;
      margin: 0 20px;
      display: inline-block;
      background-color: $gray;
    }
  }
}
</style>
<script lang="ts" setup>
import Logo from "@/components/Logo.vue";
import store from "@/store";
import { isUserInfoExpire } from "@/utils/auth";
import { Ref, onMounted, onUpdated, ref } from "vue";
let userLoginStatus = ref(false);
const userProfile:Ref<user|null> = ref(null);
interface props {
  showLogo: boolean;
  showNav: boolean;
}
let props = withDefaults(defineProps<props>(), {
  showLogo: true,
  showNav: false,
});
onMounted(() => {
  userLoginStatus.value = !isUserInfoExpire();
});
onUpdated(()=>{
  console.log(store.getters["user/userInfo"])
  userProfile.value = store.getters["user/userInfo"];
})
</script>
