import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import LoginView from "../views/login/LoginView.vue";
import addPacket from "../views/addPacket.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: IndexView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
      path: "/addPacket",
      name: "addPacket",
      component: addPacket,
    },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
