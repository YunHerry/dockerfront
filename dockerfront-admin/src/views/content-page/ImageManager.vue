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
                <el-icon style="margin-left: 4px" :size="12">
                  <Male />
                </el-icon>
              </div>
            </template>
            <!-- <template #suffix>/100</template> -->
          </el-statistic>
        </el-col>
      </el-row>
      <el-row class="exec-content">
        <el-col :span="12"> 操作中心 </el-col>
        <el-col :span="12">
          <el-steps :active="2" direction="vertical">
            <el-step title="未开始" />
            <el-step title="拉取中" />
            <el-step title="拉取完成" />
          </el-steps>
        </el-col>
      </el-row>
    </div>

    <div class="dockers-table card">
      <i class="title">服务器镜像</i>
      <el-table class="image-list" :data="nowImagesData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="tag" label="Tag" width="180" />
        <el-table-column prop="name" label="镜像名称" width="180" />
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
      </el-table>
    </div>
    <div class="dockers-table card">
      <i class="title">可下载镜像</i>
      <el-table
        class="image-list"
        :data="allImagesData"
        style="width: 100%"
        v-loadmore="loadMoreImages"
      >
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="tag" label="Tag" width="180" />
        <el-table-column prop="name" label="镜像名称" width="180" />
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
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getImage } from "@/api/admin";
import { Directive, DirectiveArguments, DirectiveBinding, ObjectDirective, Ref, h, onMounted, ref, withDirectives } from "vue";

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
const vLoadmore:Directive = {
  beforeMount: function(el, binding) {
    const selectWrap = el.querySelector(".el-table__body-wrapper");
    selectWrap?.addEventListener("scroll", function (this: HTMLElement) {
      const scrollDistance =
        this.scrollHeight - this.scrollTop - this.clientHeight;
      if (scrollDistance <= 0.5) {
        binding.value(); //执行在使用时绑定的函数，在这里即loadMorePerson方法
      }
    });
  }} ;
function loadMoreImages() {
  console.log(1)
}
onMounted(() => {
  getImage({ page: 0, pageSize: 10 }).then((res) => {
    allImagesData.value.push(...res.data);
  });
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
}
.exec-content,
.image-list {
  margin-top: 60px;
}
</style>
