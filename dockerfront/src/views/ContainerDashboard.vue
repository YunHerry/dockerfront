<template>
  <div class="common-layout">
    <el-container>
      <el-header
        ><UserTop :show-nav="false" :show-logo="true"></UserTop
      ></el-header>
      <el-main>
        <div class="infos-content">
          <div class="info-item">
            <div class="docker-title">容器信息</div>
            <span>系统: Centos</span>
            <span>内存: 4G</span>
            <span>CPU: i7-6500U 2400 GHZ</span>
            <span>硬盘: 90 / 100 GB</span>
            <span>带宽: 4 Mbp</span>
          </div>
          <!-- 仪表图 -->
          <div class="info-item">
            <div id="cpu" style="width: 600px; height: 500px"></div>
          </div>
          <div class="info-item">
            <div class="docker-title">操作</div>
            <div class="docker-work">
              <div @click="controlContiner(continerStatus.RUN)">
                <i class="iconfont icon-poweroff"></i>
                开机
              </div>
              <div @click="controlContiner(continerStatus.STOP)">
                <i class="iconfont icon-Pause"></i>
                停机
              </div>
              <div @click="controlContiner(continerStatus.RESTART)">
                <i class="iconfont icon-redo"></i>
                重启
              </div>
              <!-- <div @click="initTest">
                <i class="iconfont icon-redo"></i>
                重启
              </div> -->
            </div>
          </div>
          <div class="info-item"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import UserTop from "@/components/user/UserTop.vue";
import { getCurrentInstance, onMounted, onUnmounted } from "vue";
import { ECharts, EChartsOption, init, SeriesOption } from "echarts";
import { changeContainerStatus } from "@/api/user";
import { continerStatus } from "@/constant";
import { useRoute } from "vue-router";
import store from "@/store";
import { IMessageEvent, w3cwebsocket } from "websocket";
import { ElMessage } from "element-plus";
let diagram: ECharts;
const route = useRoute();
const id = route.params.id as string;
console.log(store.getters["user/token"]);
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNzA4NjgwNTYwLCJhY2NvdW50IjoiMTAwMCJ9.0y_UCswaMvXo-Yqyq1geJ-nuoz7F8caU6wbxVNIH0mI/988d0a632f8c98fa8d46678e08850874e719a40d37b6f3b28ab8e189295c1fc4
/**
 * {
  headers: {
    Authorization: store.getters["user/token"],
  }
}
 */
//console.log(`ws://localhost:8888/ibs/api/containers/dashboard/${store.getters["user/token"]}/${id}`);
// console.log(client);
let cpuOption: EChartsOption = {
  title: {
    text: "CPU占用",
  },
  tooltip: {},
  legend: {
    data: ["销量"],
  },
  xAxis: {
    data: new Array(),
  },
  yAxis: {
     max:100
  },
  series: [
    {
      type: "line",
      smooth: true,
      data: [],
      areaStyle: {},
    },
  ],
};
interface containerData {
    [key:string]:number;
    cpuPortion:number;
    memoryPortion:number;
  }
function initDiagram(diagramDom: HTMLElement | null, option: EChartsOption,pushKey: string) {
  diagram = init(diagramDom);
  diagram.setOption(option);
  const optionRef = option;
  return (data:containerData|containerData[]) => {
    const series: SeriesOption = (cpuOption.series as SeriesOption[])[0];
    if(Array.isArray(data)) {
       let filterArr = data.map((val,index)=>
           val[pushKey]
       );
      series.data instanceof Array ? series.data.push(...filterArr): null;
    } else {
      console.log(data);
      series.data instanceof Array ? series.data.push(data[pushKey]): null;
    }
    diagram.setOption(optionRef);
  };
}
let cpuDiagramUpdate:Function|null = null;
function websocketInit() {
  const client = new w3cwebsocket(
    `ws://localhost:8888/ibs/api/socket/dashboard/${store.getters["user/token"]}/${id}`
  );
  let websocketTimer: NodeJS.Timer | null = null;
  client.onerror = () => {
    console.log("websocket连接失败");
  };

  client.onopen = () => {
    console.log("打开成功");
    client.send("init");
    websocketTimer = setInterval(() => {
      client.send("current");
    }, 1000);
  };

  client.onmessage = (event: IMessageEvent) => {
    const dataArr = JSON.parse(event.data.toString());
    cpuDiagramUpdate instanceof Function ? cpuDiagramUpdate(dataArr):null;
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
  };
}
const client = websocketInit();
onUnmounted(() => {
  client.close();
});
// the option must is a reference type
interface option {
  title: {
    text: string;
  };
  tooltip: {};
  legend: {
    data: string[];
  };
  xAxis: {
    data: any[];
  };
  yAxis: {};
  series: {
    type: string;
    smooth: boolean;
    data: number[];
    areaStyle: {};
  }[];
}
onMounted(() => {
  const target = getCurrentInstance();
  cpuDiagramUpdate = initDiagram(document.getElementById("cpu"), cpuOption,"cpuPortion");
  // 使用刚指定的配置项和数据显示图表。
});
function controlContiner(status: continerStatus) {
  changeContainerStatus(id, status).then(res=>{
    ElMessage({
      type: "success",
      message: "修改状态成功",
    })
  });
}
</script>
<style lang="scss" scoped>
.docker-work {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}
.docker-work div {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.iconfont {
  font-size: 60px;
  margin-bottom: 20px;
}
.infos-content {
  width: 80%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  margin: auto;
  .docker-title {
    font-size: 18px;
    font-weight: 500;
    padding: 0 10px 10px 0;
  }
  .info-item {
    flex: 1;
    height: 300px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin: 0 5px 5px 0;
    display: flex;
    flex-direction: column;
    padding: 44px;
    box-sizing: border-box;
    width: calc(
      (100% - 10px) / 2
    ); // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
    min-width: calc((100% - 10px) / 2); // 加入这两个后每个item的宽度就生效了
    max-width: calc((100% - 10px) / 2); // 加入这两个后每个item的宽度就生效了
    &:nth-child(2n) {
      // 去除第3n个的margin-right
      margin-right: 0;
    }
    & > span {
      color: $gray;
      margin-top: 10px;
    }
  }
}
.el-avatar {
  cursor: pointer;
}
.el-avatar:hover + .info,
.info:hover {
  display: block;
}
.info {
  display: none;
  position: fixed;
  top: 62px;
  right: 0px;
  background-color: #151822;
  max-height: calc(100vh - 62px);
  height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 140px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.el-avater {
  float: right;
}

.common-layout,
.el-container {
  height: 100%;
}
.el-main {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-header {
  width: 100%;
  height: 62px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 0 20px !important;
  justify-content: space-between;
}
</style>
