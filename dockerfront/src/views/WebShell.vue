<template>
  <div class="web-shell-content" @keyup="keyup" @click="clickShell">
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
    <terminal name="my-terminal" @exec-cmd="onExecCmd"></terminal>
  </div>
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
import Terminal from "vue-web-terminal"
const route = useRoute();
const info = route.params.id;
const command: any = ref();
const commandValue: Ref<string> = ref("");
const commandHistoryList: Ref<Array<string>> = ref([]);
function clickShell() {
  console.log();
  command.value.focus();
}
function keyup(e: KeyboardEvent) {
  console.log(e);
  if (e.key == "Enter") {
    commandHistoryList.value.push(commandValue.value);
    commandValue.value = "";
    exec(
      "eb8b0fdf26166613c1c858afa9225aa2fe6b07cbb6d09a80cc2b47be258ce065",
      "ls",
      "/bin"
    ).then((res) => {
      console.log(JSON.parse(res.data));
      commandHistoryList.value.push("commandValue.value");
    });
  }
}
</script>
