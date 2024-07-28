import axios from "axios";
import { isEmpty } from "./stringUtils";
import { ElMessage } from "element-plus";
import { getUserInfo } from "./auth";
const controller = new AbortController();
const service = axios.create({
  baseURL: "http://localhost:8888",
  withCredentials: false,
  timeout: 5000, // request timeout
});
export const defaultInterceptor = service.interceptors.request.use(
  (config) => {
    config.signal = controller.signal;
    controller.abort();
    ElMessage.info("请先初始化上下文");
    return config;
  },
  (error) => {
    // return Promise.reject(error);
  }
);
export default service;
