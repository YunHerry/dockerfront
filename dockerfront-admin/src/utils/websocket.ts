import { Ref, onActivated, onDeactivated, onUnmounted } from "vue";
import { w3cwebsocket, IMessageEvent } from "websocket";
let reconnectTimes = 5;
let nowReconnectTimes = 0;
export function websocketInit(
  url: string,
  clientRef: {close:Function,send:Function},
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
      if (!client) return;
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
      // if(reconnectTimes < nowReconnectTimes) reconnect();
    };
  };
  const reconnect = () => {
    nowReconnectTimes++;
    websocketInit(
      url,
      clientRef,
      openFunction,
      onMessage,
      timerFunction,
      isTimerFunctionRun
    );
  };
  onActivated(() => {
    init();
    window.onbeforeunload = () => {
      client?.close();
    };
  });
  onDeactivated(() => {
    console.log("通道关闭");
    client?.close();
    client = null;
    clearInterval(websocketTimer as NodeJS.Timeout);
  });
  clientRef.close = () => {
    clearTimeout(websocketTimer as NodeJS.Timeout);
    client?.close();
    window.onbeforeunload = () => {
      client?.close();
    };
  };
  clientRef.send = (msg: string) => {
    if (client?.readyState === 1) {
      client?.send(msg);
    }
  };
}
