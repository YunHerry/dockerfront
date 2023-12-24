<template>
  <div class="body">
    <i class="text from-margin">输入密码</i>
    <i id="passwordPoint" style="display: none; color: #e81123"
      >密码应至少含有一个大写字母和一个小写字母,若干个数字,不应含有中文，总和为8-16位。</i
    >
    <i id="passwordHint" style="display: none; color: #e81123"
      >两次密码不一致</i
    >
    <input
      id="registeredPassword"
      class="input-login-account from-margin"
      placeholder="输入密码"
    />
    <input
      id="registeredConfirmPassword"
      class="input-login-account from-margin"
      placeholder="确认密码"
    />
    <i
      >已有帐户？<a href="javascript:void(0);" onclick="cutoverLogin()"
        >前往登录!</a
      ></i
    >
    <button class="next-button" onclick="cutoverregisteredMail()">
      下一步
    </button>
  </div>
</template>
