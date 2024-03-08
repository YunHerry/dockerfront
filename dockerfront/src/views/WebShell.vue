<template>
  <!-- <div class="web-shell-content"> -->
  <!-- <div class="now-command" v-for="commandItem in commandHistoryList">
      {{ commandItem }}
    </div>
    <div class="now-command">
      >
      <input
        ref="command"
        v-model="commandValue"
        class="command-input"
        type="text"
      />
    </div> -->
  <terminal
    name="my-terminal"
    @exec-cmd="onExecCmd"
    :show-header="false"
    :context="context"
    :init-log="initLogs"
  ></terminal>
  <!-- </div> -->
</template>
<style lang="scss">
.web-shell-content {
  width: 100%;
  height: 100%;
  background-color: #272b36;
  cursor: pointer;
  box-sizing: border-box;
  padding: 20px;
  .now-command {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  .command-input {
    background-color: transparent;
    border: 0;
    outline: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
<script lang="ts" setup>
import { exec } from "@/api/user";
import store from "@/store";
import { websocketInit } from "@/utils/websocket";
import { ca } from "element-plus/es/locale";
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import Terminal, { Message } from "vue-web-terminal";
const route = useRoute();
const id = route.params.id;
console.log(id);
const context = ref("/");

const initLogs: Message[] = [
  {
    content: "Terminal Initializing ...",
  },
  {
    content: `Current login time: ${new Date().toDateString()}`,
  },
];
let successCallback: Function | null = null;
let failCallback: Function | null = null;
const client = websocketInit(
  `ws://localhost:8888/ibs/api/socket/webshell/${store.getters["user/token"]}/${id}`,
  (client) => {
    initLogs.push({ content: "connection success" });
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  (data) => {
    successCallback
      ? successCallback({
          type: "normal",
          tag: "",
          content: data,
        })
      : null;
    //  failCallback?failCallback():null;
  },
  null,
  null
);
function onExecCmd(
  key: string,
  command: string,
  success: Function,
  failed: Function
) {
  client.client.send(command);
  successCallback = success;
  // @Deprecated(since = "1.0.1")
  // if (/^cd\s(.+)/.test(command)) {
  //   const value = (/^cd\s(.+)/.exec(command) as RegExpExecArray)[0].split(
  //     " "
  //   )[1];
  //   exec(`${id}`, `cd ${value}`, context.value)
  //     .then((res) => {
  //       context.value = calculateNewPath(context.value, value);
  //       success({
  //         type: "normal",
  //         tag: "",
  //         content: "",
  //       });
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //       failed("指令执行失败");
  //     });
  //   return;
  // }
  // if (key === "fail") {
  //   failed("Something wrong!!!");
  // } else {
  //   // let allClass = ["success", "error", "system", "info", "warning"];
  //   execCommand(command)
  //     .then((res) => {
  //       const data = res.data.split("\n");
  //       for (const item of data) {
  //         success({
  //           type: "normal",
  //           tag: "",
  //           content: item,
  //         });
  //       }
  //     })
  //     .catch((res) => {
  //       console.log(1);
  //       failed("指令执行失败");
  //     });
  // }
}
//@Deprecated(since = "1.0.1")
// function execCommand(command: string): Promise<requestResponse<string>> {
//   return exec(`${id}`, command, context.value);
// }
// function calculateNewPath(currentPath: string, cdCommand: string) {
//   const isAbsolute = cdCommand.startsWith("/");

//   const commands = cdCommand.split(/\//);

//   for (const command of commands) {
//     if (command === "..") {
//       currentPath = currentPath.replace(/\/[^/]+$/, "");
//     } else if (command === ".") {
//     } else {
//       currentPath = currentPath + "/" + command;
//     }
//   }

//   currentPath = currentPath
//     .replace(/\/+$/, "")
//     .replace(/\/\//g, "")
//     .replace(/\/\//g, "");

//   return isAbsolute ? currentPath : "/" + currentPath;
// }
</script>
