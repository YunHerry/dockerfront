import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import 'element-plus/dist/index.css';
createApp(App).use(router).mount("#app");
