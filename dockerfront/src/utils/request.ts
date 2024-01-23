import store from "@/store";
import axios from "axios";
import router from "@/router/index"
import { isEmpty } from "./stringUtils";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/auth";
const service = axios.create({
  baseURL: "http://localhost:8888",
  withCredentials: false,
  timeout: 5000, // request timeout
});
service.interceptors.request.use(
  config => {
    //假设store拥有token
    if (!isEmpty(store.getters["user/token"])) {
      config.headers["Authorization"] = getToken(); 
    }
    return config;
  },
  error => {
    ElMessage.warning("服务器在忙,请稍后再试");
    return Promise.reject(error)
  }
)
enum requestResult {
  //2xx
  SUCCESS=2,
  //3xx
  DIRECTION,
  //4xx
  CLIENT_ERROR,
  //5xx
  SEVER_ERROR
}
service.interceptors.response.use(
  response => {
    const res = response.data;
    const code = parseInt((parseInt(res.code) / 100).toFixed());
    if(code != requestResult.SUCCESS) {
      ElMessage(
        {
          message: res.message,
          type: "warning"
        }
      )
    }
    return res;
  },
  error => {
    ElMessage.warning("服务器在忙,请稍后再试");
    return Promise.reject(error)
  }
)

export default service;
