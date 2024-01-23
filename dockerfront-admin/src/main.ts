import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import 'element-plus/dist/index.css';
import Terminal from "vue-web-terminal";
import 'vue-web-terminal/lib/theme/dark.css'
//@ts-ignore
createApp(App).use(Terminal).use(router).mount("#app");
