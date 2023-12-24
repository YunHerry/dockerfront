import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'vue-web-terminal/lib/theme/dark.css'
import Terminal from "vue-web-terminal";
import echarts from 'echarts';
const app = createApp(App);
//@ts-ignore
app.use(router).use(Terminal).use(ElementPlus).mount("#app");
app.config.globalProperties.$echarts = echarts;