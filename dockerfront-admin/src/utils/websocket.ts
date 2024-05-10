import { Ref, onActivated, onDeactivated, onUnmounted } from "vue";
import { w3cwebsocket, IMessageEvent } from "websocket";
let websocketInstances = [];
export function websocketInit(
  url: string,
  openFunction: (client: w3cwebsocket) => Promise<void>,
  onMessage: (data: any) => void,
  timerFunction: ((client: w3cwebsocket) => void) | null,
  //if true run else false
  isTimerFunctionRun: (() => boolean) | null
) {
  let client: null | w3cwebsocket = null;
  let waitFlag = false;
  let websocketTimer: NodeJS.Timeout | null = null;
  const init = () => {
    client = new w3cwebsocket(url);
    //true is sending
    //@TODO
    client.onerror = () => {
      console.log("websocket连接失败");
    };
    client.onopen = () => {
      console.log("打开成功");
      const isRuning = (statusStr: string) => statusStr == "running";
      websocketInstances.push(client);
      if(!client) return;
      openFunction(client).then(() => {
        //@TODO the init need to wait for last respond
        // timerFunction(client);
        //temp function
        if (!timerFunction) return;
        setTimeout(() => {
          if (!isTimerFunctionRun || !isTimerFunctionRun()) return;
          timerFunction(client as w3cwebsocket);
        }, 2000);
        websocketTimer = setInterval(() => {
          if (!isTimerFunctionRun || !isTimerFunctionRun()) return;
          timerFunction(client as w3cwebsocket);
        }, 6000);
      });
    };
    client.onmessage = (event: IMessageEvent) => {
      const dataArr = JSON.parse(event.data.toString());
      onMessage(dataArr);
    };
    client.onclose = function (e) {
      console.log(e);
    };
  };
  onActivated(() => {
    console.log(1);
    init();
  });
  onDeactivated(() => {
    console.log("通道关闭");
    client?.close();
    client = null;
    clearInterval(websocketTimer as NodeJS.Timeout);
  });
  return {
    close: () => {
      clearTimeout(websocketTimer as NodeJS.Timeout);
      client?.close();
    },
    send: (msg: string) => {
      console.log("请求发送");
      if (client?.readyState===1) {
        client?.send(msg);
        console.log("发送成功")
      }
    },
  };
}
