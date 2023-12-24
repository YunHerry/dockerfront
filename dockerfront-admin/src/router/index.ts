import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import LoginView from "../views/login/LoginView.vue";
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
