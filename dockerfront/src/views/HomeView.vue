<template>
  <div class="home">
    <el-container>
        <el-header>
          <UserTop :show-logo="true" :show-nav="true"></UserTop>
        </el-header>
      <el-main>
        <el-carousel height="500px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <div class="service-intro">
          <h3 class="title">专属服务，陪伴上云旅程</h3>
          <div class="services">
            <div class="service-item">
              <div class="name">基础服务</div>
              <div class="body">提供24小时专业服务</div>
            </div>
            <div class="service-item">
              <div class="name">基础服务</div>
              <div class="body">提供24小时专业服务</div>
            </div>
            <div class="service-item">
              <div class="name">基础服务</div>
              <div class="body">提供24小时专业服务</div>
            </div>
          </div>
          <a class="service-link" href="/">了解更多服务与支持</a>
        </div>
        <div class="banner">
          <div class="title">立刻体验,加速云上构建</div>
          <button class="buy">立即购买</button>
        </div>
      </el-main>
      <el-footer>
        <div class="footer">
          <div class="logo-info"></div>
          <div class="about-info">
            <div class="ul">
              <div class="head">产品相关</div>
              <a class="item">云容器</a>
              <a class="item">云服务器</a>
              <a class="item">CDN加速</a>
            </div>
            <div class="ul">
              <div class="head">服务支持</div>
              <a class="item">帮助中心</a>
              <a class="item">数据安全</a>
              <a class="item">服务协议</a>
              <a class="item">反馈</a>
            </div>
            <div class="ul">
              <div class="head">关于</div>
              <a class="item">关于我们</a>
              <a class="item">媒体报道</a>
              <a class="item">联系我们</a>
              <a class="item">加入我们</a>
            </div>
          </div>
        </div>
        <beianFooter></beianFooter>
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import UserTop from "@/components/user/UserTop.vue";
import beianFooter from "/src/components/beianFooter.vue";
</script>
<style lang="scss">
%base-size {
  height: 500px;
  width: 100%;
}

.el-main {
  margin-top: 0!important;
  padding: 0 !important;
  .el-carousel__item:nth-child(n) {
    background-color: #99a9bf;
  }
  .service-intro {
    @extend %base-size;
    @extend %flex-vertical-center;
    flex-direction: column;
    align-items: normal;
    text-align: center;
    .title,
    .name {
      font-weight: bold;
      color: $black;
    }
    .title {
      @extend %main-title;
    }
    .name {
      border-bottom: 1px solid #e9e9e9;
      text-align: left;
      font-size: 20px;
      width: 80%;
    }
    .body {
      margin-top: 28px;
    }
    .services {
      display: flex;
      justify-content: space-evenly;
    }
    .service-link {
      margin-top: 40px;
      text-decoration: none;
      color: $blue;
      @extend %small-text;
    }
  }
  .banner {
    @extend %flex-vertical-center ;
    flex-direction: column;
    height: 300px;
    background-image: url("/public/img/background/index_background.png"),
      linear-gradient(90deg, #056dff 18%, #5099ff);
    .title {
      color: $white;
      font-size: 34px;
      font-weight: bold;
      margin: 40px 24px;
    }
    .buy {
      width: 136px;
      height: 38px;
      font-size: 14px;
      align-self: center;
      background-color: $white;
      border: 0;
      color: $default-text-color;
    }
  }
}
.footer {
  display: flex;
  flex-direction: row;
  height: 300px;
  .logo-info {
    display: flex;
    flex: 1;
  }
  .about-info {
    flex-direction: row;
    @extend %flex-relative-center;
    flex: 2;
    text-align: left;
    .head {
      color: $gray;
    }
    .item {
      display: block;
      &:nth-child(2) {
        margin-top: 20px;
      }
      &:nth-child(n) {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
