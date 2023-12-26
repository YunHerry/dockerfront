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
import { Ref, ref } from "vue";
import { useRoute } from "vue-router";
import Terminal from "vue-web-terminal";
const route = useRoute();
const info = route.params.id;

const context = ref("/bin");
function onExecCmd(
  key: string,
  command: string,
  success: Function,
  failed: Function
) {
  if (/^cd\s(.+)/.test(command)) {
    const value = (/^cd\s(.+)/.exec(command) as RegExpExecArray)[0].split(
      " "
    )[1];
    exec(
      "05a4755f25af6d62f609f60ca2429b0c970829da6433365a76bda3fbe0792e4e",
      `cd ${value}`,
      context.value
    ).then((res) => {
      const data = JSON.parse(res.data);
      console.log(data);
      // for (const item of ) {
      //   // failed(item);
      //   success({
      //     type: "normal",
      //     tag: "",
      //     content: item,
      //   });
      // }
    });

    return;
  }
  if (key === "fail") {
    failed("Something wrong!!!");
  } else {
    // let allClass = ["success", "error", "system", "info", "warning"];

    // let clazz = allClass[Math.floor(Math.random() * allClass.length)];
    
    execCommand(command).then(res=>{
      console.log(res.data)
      const data = JSON.parse(res.data);
      // for (const item of res.data) {
      //   // failed(item);
      //   success({
      //     type: "normal",
      //     tag: "",
      //     content: item,
      //   });
      // }
    })
  }
}
function execCommand(command:string):Promise<requestResponse<string>> {
  return exec(
    "05a4755f25af6d62f609f60ca2429b0c970829da6433365a76bda3fbe0792e4e",
    command,
    context.value
  );
}
</script>
