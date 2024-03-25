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
            <el-skeleton :loading="!containerInfo" :rows="5" animated>
              <template #default>
                <div class="container-info">
                  ID: {{ containerInfo?.containerName }}
                </div>
                <div class="container-info">
                  内存: {{ containerInfo?.memory }}G
                </div>
                <div class="container-info">
                  镜像名称: {{ containerInfo?.imageName }}
                </div>
                <!-- <span>硬盘: 90 / 100 GB</span> -->
                <div class="container-info">
                  硬盘: {{ containerInfo?.diskPercent }}
                </div>
                <!-- <div class="container-info">带宽: {{ containerInfo?. }} Mbp</div> -->
                <div class="container-info">
                  状态: <span class="status" :class="status">{{ status }}</span>
                </div>
              </template>
              <template #template>
                <div>
                  ID: <el-skeleton-item variant="span" style="width: 20%" />
                </div>
                <div>
                  内存: <el-skeleton-item variant="span" style="width: 20%" />
                </div>
                <div>
                  CPU核心数:
                  <el-skeleton-item variant="span" style="width: 20%" />
                </div>
                <div>
                  硬盘: <el-skeleton-item variant="span" style="width: 20%" />
                </div>
                <div>
                  带宽: <el-skeleton-item variant="span" style="width: 20%" />
                </div>
                <div>
                  状态: <el-skeleton-item variant="span" style="width: 20%" />
                </div>
              </template>
            </el-skeleton>
          </div>
          <!-- 仪表图 -->
          <div class="info-item">
            <div id="cpu"></div>
          </div>
          <div class="info-item">
            <div class="docker-title">操作</div>
            <div class="docker-work">
              <div
                v-show="isShow(continerWorkStatus.RUN)"
                @click="controlContiner(continerWorkStatus.RUN)"
              >
                <i class="iconfont icon-poweroff"></i>
                开机
              </div>
              <div
                v-show="isShow(continerWorkStatus.STOP)"
                @click="controlContiner(continerWorkStatus.STOP)"
              >
                <i class="iconfont icon-Pause"></i>
                停机
              </div>
              <div
                v-show="isShow(continerWorkStatus.RESTART)"
                @click="showUploadDialog"
              >
                <i class="iconfont icon-redo"></i>
                上传
              </div>
              <div
                v-show="isShow(continerWorkStatus.RESTART)"
                @click="controlContiner(continerWorkStatus.RESTART)"
              >
                <i class="iconfont icon-redo"></i>
                重启
              </div>
              <!-- <div @click="initTest">
                <i class="iconfont icon-redo"></i>
                重启
              </div> -->
            </div>
          </div>
          <div class="info-item">
            <div id="memory"></div>
          </div>
        </div>
        <el-dialog v-model="isDialogshow" title="Tips" width="500">
          <el-tree
            style="max-width: 600px"
            :props="defaultProps"
            :load="loadNode"
            lazy
          >
          <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a v-if="data.type != '/'" class="download-btn">下载</a>
            
          </span>
        </span>
      </template>
        </el-tree>

          <template #footer>
            <div class="dialog-footer">
              <el-button @click="isDialogshow = false">Cancel</el-button>
              <el-button type="primary" @click="isDialogshow = false">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import UserTop from "@/components/user/UserTop.vue";
import { Ref, getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import { ECharts, EChartsOption, init, SeriesOption, throttle } from "echarts";
import {
  changeContainerStatus,
  getContainerInfo,
  getContainerDataList,
} from "@/api/user";
import { continerWorkStatus, continerStatus } from "@/constant";
import { useRoute } from "vue-router";
import store from "@/store";
import { IMessageEvent, w3cwebsocket } from "websocket";
import { ElMessage } from "element-plus";
import { websocketInit } from "@/utils/websocket";
import type Node from "element-plus/es/components/tree/src/model/node";
const route = useRoute();
const id = route.params.id as string;
console.log(store.getters["user/token"]);
const status: Ref<continerStatus> = ref(continerStatus.RUNNING);
const containerInfo: Ref<containerInfo | null> = ref(null);
const isDialogshow: Ref<boolean> = ref(false);
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
function isShow(buttonType: continerWorkStatus) {
  const linkObj: {
    [key: string]: Array<continerWorkStatus>;
  } = {
    running: [
      continerWorkStatus.STOP,
      continerWorkStatus.PAUSE,
      continerWorkStatus.RESTART,
      continerWorkStatus.DELETE,
    ],
    exited: [
      continerWorkStatus.RESTART,
      continerWorkStatus.DELETE,
      continerWorkStatus.RUN,
    ],
    created: [],
    paused: [
      continerWorkStatus.RESTART,
      continerWorkStatus.DELETE,
      continerWorkStatus.RUN,
    ],
  };
  return linkObj[status.value].includes(buttonType);
}
let cpuOption: EChartsOption = {
  title: {
    text: "CPU占用(%)",
  },
  tooltip: {},

  xAxis: {
    data: new Array(),
    boundaryGap: false,
  },
  yAxis: {
    // max: 100,
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
let memoryOption: EChartsOption = {
  title: {
    text: "内存占用(%)",
  },
  tooltip: {},

  xAxis: {
    data: new Array(),
    boundaryGap: false,
  },
  yAxis: {
    // max: 100,
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
  [key: string]: number;
  cpuPortion: number;
  memoryPortion: number;
}
let gobalDiagram: ECharts[] = [];
function initDiagram(
  diagramDom: HTMLElement | null,
  option: EChartsOption,
  pushKey: string
) {
  const diagram = init(diagramDom);
  diagram.setOption(option);
  window.addEventListener("resize", () => {
    for (const diagramObj of gobalDiagram) diagramObj.resize();
  });
  gobalDiagram.push(diagram);
  return (data: containerData | containerData[]) => {
    const series: SeriesOption = (option.series as SeriesOption[])[0];
    if (Array.isArray(data)) {
      let filterArr = data.map((val, index) => val[pushKey].toFixed(2));
      series.data instanceof Array ? series.data.push(...filterArr) : null;
    } else {
      series.data instanceof Array
        ? series.data.push(data[pushKey].toFixed(2))
        : null;
      console.log(data[pushKey]);
    }
    diagram.setOption(option);
  };
}
let cpuDiagramUpdate: Function | null = null;
let memoryDiagramUpdate: Function | null = null;
const isRuning = (statusStr: string) => statusStr == "running";
const client = websocketInit(
  `ws://localhost:8888/ibs/api/socket/dashboard/${store.getters["user/token"]}/${id}`,
  (client) => {
    return new Promise((resolve, reject) => {
      client.send("init");
      resolve();
    });
  },
  (data) => {
    cpuDiagramUpdate instanceof Function ? cpuDiagramUpdate(data) : null;
    memoryDiagramUpdate instanceof Function ? memoryDiagramUpdate(data) : null;
  },
  (client) => {
    client.send("current");
  },
  () => isRuning(status.value)
);
const statusClient = websocketInit(
  `ws://localhost:8888/ibs/api/socket/dashboard/${store.getters["user/token"]}/${id}`,
  (client) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  (data) => {
    status.value = data;
  },
  (client) => {
    client.send("status");
  },
  () => isRuning(status.value)
);
onUnmounted(() => {
  client.close();
  statusClient.close();
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
  getContainerInfo(id).then((res) => {
    // const target = getCurrentInstance();
    containerInfo.value = res.data;
    status.value = containerInfo.value.containerStatus;
    cpuDiagramUpdate = initDiagram(
      document.getElementById("cpu"),
      cpuOption,
      "cpuPortion"
    );
    memoryDiagramUpdate = initDiagram(
      document.getElementById("memory"),
      memoryOption,
      "memoryPortion"
    );
    // 使用刚指定的配置项和数据显示图表。
    window.onbeforeunload = (e) => {
      client.close();
    };
  });
});
function controlContiner(status: continerWorkStatus) {
  changeContainerStatus(id, status).then((res) => {
    statusClient.client.send("status");
    ElMessage({
      type: "success",
      message: "修改状态成功",
    });
  });
}
const defaultProps = {
  children: "treeNodeList",
  label: "name",
  isLeaf: "leaf"
};
const data: Ref<Array<any>> = ref([]);
const nowUrl = "/";
function showUploadDialog() {
  getContainerDataList(id, nowUrl).then((res) => {
    isDialogshow.value = true;
    res.data.treeNodeList.forEach((element) => {
      data.value.push(element);
    });
  });
}
function loadNode(node: Node, resolve: (data: Array<any>) => void) {
  if (node.level === 0) {
    return resolve([{ name: "/", absolutePath: "/",type: "/"}]);
  }
  let nodeParent = node;
  let url = "";
  console.log(nodeParent);
  do {
    console.log(nodeParent.data.absolutePath);
    url = nodeParent.data.absolutePath + url;
    nodeParent = nodeParent.parent;
  } while(nodeParent?.data.absolutePath);
  getContainerDataList(id,url).then((res) => {
    return resolve(res.data.treeNodeList.map((element)=>{
      element.leaf = element.type != "/";
      return element;
    }));
  });
};
function downloadFile() {
  
}
</script>
<!-- websocket close -->
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
    & .container-info,
    & .el-skeleton > div {
      color: $gray;
      margin-top: 10px;
    }
    #cpu,
    #memory {
      width: 100%;
      height: 100%;
    }
    .status.running {
      color: #41b983;
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
.download-btn {
  margin-left: 10px;
  color: $blue;
}
</style>
