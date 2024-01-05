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
    children: [
      {
        path: "",
        name: "account",
        component: () => import("../views/login/pages/AccountView.vue"),
      },
      {
        path: "password",
        name: "password",
        component: () => import("../views/login/pages/PasswordView.vue"),
      },
      {
        path: "variety",
        name: "variety",
        component: () => import("../views/login/pages/VarietyView.vue"),
      },
      {
        path: "registerAccount",
        name: "registerAccount",
        component: () => import("../views/login/pages/RegisterAccountView.vue"),
      },
      {
        path: "registerPassword",
        name: "registerPassword",
        component: () =>
          import("../views/login/pages/RegisterPasswordView.vue"),
      },
    ],
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
