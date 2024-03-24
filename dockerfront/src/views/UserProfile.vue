<template>
  <div class="user-profile-body">
    <el-container>
      <el-header>
        <UserTop :show-nav="false" :show-logo="true"></UserTop>
      </el-header>
      <el-main>
        <div class="user-profile-content">
          <div class="title">用户信息</div>
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8888/ibs/api/user/upavatar"
            :headers="{ Authorization: store.getters['user/token'] }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";
import store from "@/store";

const imageUrl = ref(store.getters["user/userInfo"].avatar?`http://localhost:8888/static/avatar/${store.getters["user/userInfo"].avatar}`:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
  return true;
};
</script>
<style lang="scss">
.user-profile-body {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-main {
    margin-top: 20px;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .title {
    @extend %main-title;
    font-size: 26px;
    margin: 0;
    margin-bottom: 10px;
  }
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
.user-profile-content {
  width: 80%;
  height: 80%;
  padding: 44px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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
.title {
  @extend %middle-text;
  display: block;
  text-align: left;
  margin-bottom: 20px;
}
</style>
