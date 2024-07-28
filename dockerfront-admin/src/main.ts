import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import 'element-plus/dist/index.css';
import Terminal from "vue-web-terminal";
import 'vue-web-terminal/lib/theme/dark.css'
import { initRequestInstance } from "@common/api/user";
import store from "./store";
//@ts-ignore
createApp(App).use(Terminal).use(router).mount("#app");
initRequestInstance(router,store);