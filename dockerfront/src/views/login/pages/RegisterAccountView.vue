<template>
  <div class="body">
    <i class="text from-margin">注册账户</i>
    <i id="nullReminder" style="display: none; color: #e81123"
      >用户名不能为空!</i
    >
    <i id="occupationReminder" style="display: none; color: #e81123"
      >该用户名已被占用,请重试~</i
    >
    <i id="specificationReminder" style="display: none; color: #e81123"
      >用户名不能包含中文,且长度应在五到十二之间!</i
    >
    <div class="center">
      <input class="input" placeholder="用户名称" />
      <i>已有帐户？<a onclick="cutoverLogin()">前往登录!</a></i>
      <i><a onclick="registeredChangeModus(this)">使用用户名注册</a></i>
    </div>
    <button class="next-button" onclick="cutoverRegisteredPassword()">
      下一步
    </button>
  </div>
</template>
