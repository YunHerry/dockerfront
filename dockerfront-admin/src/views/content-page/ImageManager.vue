<template>
  <div class="images-content">
    <div class="card">
      <i class="title">镜像管理</i>
      <el-row justify="space-evenly">
        <el-col :span="12">
          <el-statistic title="当前镜像数量" :value="268500" />
        </el-col>
        <el-col :span="12">
          <el-statistic :value="138">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                当前服务器存有镜像
              </div>
            </template>
            <!-- <template #suffix>/100</template> -->
          </el-statistic>
        </el-col>
      </el-row>
      <el-row class="exec-content">
        <el-col :span="12">
          操作中心
          <div class="options">
            <div class="option">
              <el-icon><Upload /></el-icon>
              更新
            </div>
          </div>
        </el-col>
        <el-col :span="12" class="steps">
          <div class="flex-content">
            <el-steps :active="nowStep" direction="vertical">
              <el-step title="未开始" />
              <el-step title="拉取中" />
              <el-step title="拉取完成" />
            </el-steps>
            <div class="loader" v-show="pulling"></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="dockers-table card">
      <i class="title">服务器镜像</i>
      <el-table
        class="image-list"
        :data="nowImagesData"
        style="width: 100%"
        height="140"
        v-loadmore="
          loadMoreImages(false, nowImagesData, nowLocalPage, localEnd)
        "
        :row-style="{ height: '30px' }"
      >
        <template #append>
          <div class="no-more" v-show="localEnd">我~是有底线的 (～￣▽￣)～</div>
        </template>
        <template #default>
          <el-table-column prop="id" label="ID" width="180" />
          <el-table-column prop="tag" label="Tag" width="180" />
          <el-table-column prop="name" label="镜像名称" show-overflow-tooltip />
          <el-table-column width="180">
            <template #header>
              <el-input
                v-model="input"
                size="small"
                placeholder="关键字检索"
                @change="search"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope"> </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="dockers-table card">
      <i class="title">可下载镜像</i>
      <el-table
        class="image-list"
        :data="allImagesData"
        style="width: 100%"
        v-loadmore="loadMoreImages(true, allImagesData, nowAllPage, allEnd)"
        :row-style="{ height: '30px' }"
        height="160"
      >
        <template #append>
          <div class="no-more" v-show="allEnd">我~是有底线的 (～￣▽￣)～</div>
        </template>
        <template #default>
          <el-table-column prop="id" label="ID" width="180" />
          <el-table-column prop="tag" label="Tag" width="180" />
          <el-table-column prop="name" label="镜像名称" show-overflow-tooltip />
          <el-table-column width="180">
            <template #header>
              <el-input
                v-model="input"
                size="small"
                placeholder="关键字检索"
                @change="search"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                v-show="!pulling"
                @click="pull(scope.row.name, scope.row.tag)"
                >拉取</el-button
              >
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getImage, pullImage } from "@/api/admin";
import store from "@/store";
import { websocketInit } from "@/utils/websocket";
import { Upload } from "@element-plus/icons-vue";
import { Directive, Ref, isRef, onDeactivated, onMounted, ref } from "vue";
//websocket
let clientRef:any = {};
 websocketInit(
  `ws://localhost:8888/ibs/api/socket/command/${store.getters["user/token"]}`,
  clientRef,
  (client) => {
    client.send(
      JSON.stringify({
        command: "images/get",
      })
    );
    return Promise.resolve();
  },
  (data) => {
    if (data.length <= 0) {
      nowStep.value = 1;
    } else {
      if (isPulling(data)) nowStep.value = 2;
      else nowStep.value = 3;
    }
  },
  () => {
    updatePullingStatus();
  },
  () => true
);
const nowImagesData = ref([]);
const allImagesData: Ref<Array<image>> = ref([]);

const input = ref("");
function search(value: string) {
  let dataFilters = JSON.parse(
    JSON.stringify(nowImagesData)
  ) as Array<continer>;
  dataFilters.filter((item, index) => {
    return item.name == value;
  });
}
const pulling = ref(false);
const nowStep = ref(1);
function updatePullingStatus() {
  clientRef.send(
    JSON.stringify({
      command: "images/get",
    })
  );
}
function isPulling(data: Array<any>): boolean {
  pulling.value = !!(data.findIndex((val) => val.status != "complete") + 1);
  return pulling.value;
}
function pull(name: string, tag: string) {
  pullImage(name, tag).then((res) => {
    updatePullingStatus();
  });
}
//pull down of part
const vLoadmore: Directive = {
  beforeMount: function (el, binding) {
    const selectWrap = el.querySelector(
      ".el-scrollbar__wrap.el-scrollbar__wrap--hidden-default"
    );
    selectWrap.addEventListener("scroll", function (this: HTMLElement) {
      let sign = 0;
      const scrollDistance =
        this.scrollHeight - this.scrollTop - this.clientHeight - 1;
      if (scrollDistance <= sign) {
        binding.value();
      }
    });
    binding.value();
  },
};
const nowLocalPage = ref(0);
const nowAllPage = ref(0);
const localEnd = ref(false);
const allEnd = ref(false);
function loadMoreImages(
  isLocal: boolean,
  ref: Ref<Array<image>>,
  pageIndex: Ref<number>,
  isEnd: Ref<boolean>
): Function;
function loadMoreImages(
  isLocal: boolean,
  ref: Array<image>,
  pageIndex: number,
  isEnd: boolean
): Function;
function loadMoreImages(
  isLocal: boolean,
  ref: Ref<Array<image>> | Array<image>,
  pageIndex: Ref<number> | number,
  isEnd: Ref<boolean> | boolean
): Function {
  return () => {
    if (
      isRef<Array<image>>(ref) &&
      isRef<number>(pageIndex) &&
      isRef<boolean>(isEnd)
    ) {
      pageIndex.value++;
      getImage(isLocal, { page: pageIndex.value, pageSize: 10 }).then((res) => {
        if (res.data.length) ref.value.push(...res.data);
        //@TODO
        else (isEnd as Ref).value = true;
      });
    } else if (
      typeof pageIndex == "number" &&
      Array.isArray(ref) &&
      typeof isEnd == "boolean"
    ) {
      pageIndex++;
      getImage(isLocal, { page: pageIndex, pageSize: 10 }).then((res) => {
        if (res.data.length) ref.push(...res.data);
        else isEnd = true;
      });
    }
  };
}
onMounted(() => {
  // loadMoreImages(true, allImagesData, nowAllPage)();
  // loadMoreImages(false, nowImagesData, nowLocalPage)();
});

</script>
<style lang="scss" scoped>
.images-content {
  //   height: 80%;
  flex: 1;
  width: 80%;
  .title {
    // @extend %middle-text;
    display: block;
    text-align: left;
    margin-bottom: 20px;
  }
  .dockers-table {
    width: 100%;
    text-align: left;
    margin-top: 20px;
  }
  .el-scrollbar {
    text-align: left;
  }
  .no-more {
    color: gray;
    text-align: center;
    font-size: 12px;
    box-sizing: border-box;
    padding: 10px;
  }
}
.exec-content {
  margin-top: 60px;
}
.exec-content {
  .options {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    box-sizing: border-box;
    padding: 22px 0px;
    .option {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .el-icon {
        font-size: 50px;
      }
    }
  }
}
.steps {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .flex-content {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-right: 8px;
    .loader {
      width: 50px;
      height: 50px;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 8px solid;
      border-color: #000 #0000;
      animation: l1 1s infinite;
      position: relative;
      bottom: 3px;
    }
    @keyframes l1 {
      to {
        transform: rotate(0.5turn);
      }
    }
  }
}
</style>
