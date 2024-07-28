import { Ref } from "vue";
import { w3cwebsocket, IMessageEvent } from "websocket";

export function websocketInit(
    url:string,
    openFunction: (client: w3cwebsocket) => Promise<void>,
    onMessage: (data: any) => void,
    timerFunction: ((client: w3cwebsocket) => void) |null,
    //if true run else false
    istimerFunctionRun: (() => boolean) | null,
  ) {
    const client = new w3cwebsocket(
      url
    );
    //true is sending
    //@TODO
    let waitFlag = false;
    let websocketTimer: NodeJS.Timer | null = null;
    client.onerror = () => {
      console.log("websocket连接失败");
    };
    client.onopen = () => {
      console.log("打开成功");
      const isRuning = (statusStr: string) => statusStr == "running";
      openFunction(client).then(() => {
        //@TODO the init need to wait for last respond
        // timerFunction(client);
        //temp function
        if(!timerFunction) return;
        setTimeout(() => {
          if (!istimerFunctionRun || !istimerFunctionRun()) return;
          timerFunction(client);
        }, 2000);
        websocketTimer = setInterval(() => {
          if (!istimerFunctionRun || !istimerFunctionRun()) return;
          timerFunction(client);
        }, 6000);
      });
    };
  
    client.onmessage = (event: IMessageEvent) => {
      const dataArr = JSON.parse(event.data.toString());
      onMessage(dataArr);
    };
    client.onclose = function (e) {
      console.log("链接断开");
      console.log(e);
    };
  
    return {
      close: () => {
        clearTimeout(websocketTimer as NodeJS.Timer);
        client.close();
      },
      client: client,
      send: (msg:string)=>{
        client.send(msg);
      }
    };
  }