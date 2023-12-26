import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/login/LoginView.vue";
import DockerManager from "../views/DockerManager.vue";
import Order from "../views/order/Order.vue";
import DefaultOrder from "../views/order/pages/DefaultOrder.vue";
// import CustomOrder from "../views/order/pages/CustomOrder.vue";
import Dashboard from "@/views/Dashboard.vue";
import auth from "@/utils/auth";
import WebShell from "../views/WebShell.vue";
import { ElMessage } from "element-plus";
import { h } from "vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
    path: "/dockerManager",
    name: "dockerManager",
    component: DockerManager,
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    children: [
      {
        path: "",
        name: "default",
        component: DefaultOrder,
      },
      // {
      //   path: "custom",
      //   name: "custom",
      //   component: CustomOrder,
      // },
    ]
  },
  {
    path: "/dashboard",
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
//@TODO login后续考虑修改为没有子路由
const filterRouter = ["home", "account", "password"];
router.beforeEach((to, from, next) => {
  console.log(to.name);
  //如果属于不需要登陆的页面,则放行,不需要进行下列判断
  // for (const filter of filterRouter) {
  //   if (filter == to.name) {
  //     console.log("进入");
  //     return next();
  //   }
  // }
  const token = auth.getToken() || null;
  // if (!token) {
  //   ElMessage({
  //     message: "登录用户信息失效,请重新登录",
  //     type: 'warning',
  //   });
  //   setTimeout(()=>{
  //     from
  //     //  next(`/login/${}`);
  //   },
  //   3000)
  //   return;
  // }
  next();
});
export default router;
