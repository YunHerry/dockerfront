import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import LoginView from "../views/login/LoginView.vue";
import AddPacket from "../views/AddPacket.vue"
import Dashboard from "@/views/Dashboard.vue";
import WebShell from "@/views/WebShell.vue";
import store from "@/store";
import { isEmpty } from "@/utils/stringUtils";
import { ElMessage } from "element-plus";
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
      component: AddPacket,
  },
  {
    path: "/dashboard/:id",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/webshell/:id",
    name: "webshell",
    component: WebShell,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const filterRouter = ["account","password","registerAccount","registerPassword"];
router.beforeEach((to, from, next) => {
  console.log(to);
  for (const filter of filterRouter) {
    if (filter == to.name) {
      return next();
    }
  }
  const token = store.getters["user/token"] || "";
  if (isEmpty(token)) {
    ElMessage({
      message: "登录用户信息失效,请重新登录",
      type: 'warning',
    });
    return next("/login");;
  } else {
    next();
  }
});
export default router;
