import request, { defaultInterceptor } from "../utils/request";
import { AxiosResponse } from "axios";
import { continerStatus, continerWorkStatus } from "../constant";
import { ElMessage } from "element-plus";
import { isEmpty } from "@common/utils/stringUtils";
import { getUserInfo } from "@common/utils/auth";
interface Router {

}
interface Store {
  [x: string]: any;

}
export function initRequestInstance(Router1:Router,store:Store) {
  request.interceptors.request.eject(defaultInterceptor);
  request.interceptors.request.use(
    config => {
      //假设store拥有token
      if (!isEmpty(store.getters["user/token"])) {
        config.headers["Authorization"] = getUserInfo().token; 
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
  request.interceptors.response.use(
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
}
export function login(data: userInfo): Promise<requestResponse<user>> {
  return request({
    url: "/ibs/api/verify/login",
    method: "POST",
    data: {
      account: data.username,
      pwd: data.password,
    },
  });
}
export function register(data: userInfo) {
  return request({
    url: "/ibs/api/verify/register",
    method: "POST",
    data: {
      account: data.username,
      pwd: data.password,
    },
  });
}
export function logout() {
  return request({
    url: "/ibs/user/logout",
    method: "POST",
  });
}
export function getInfo() {
  return request({
    url: "/ibs/api/user/",
    method: "GET",
  });
}
export function getOrders(pageParam?: pageParam): Promise<requestResponse<Array<order>>> {
  return request({
    url: `/ibs/api/order/get/${pageParam?.page||1}/${pageParam?.pageSize||10}`,
    method: "GET",
  });
}
export function getContainersByUser(
  page: number,
  pageSize: number,
  filter?: containerFilter
) {
  return request({
    url: `/ibs/api/containers/get/${page}/${pageSize}`,
    method: "GET",
    data: filter,
  });
}
export function getContainersByAdmin(nowPage:number=1,size:number=5) {
  return request({
    url: `/ibs/api/admin/containers/${nowPage}/${size}`,
    method: "get",
  });
}
export function selectContainers(
  page: number,
  pageSize: number,
  selectParam?: pageParam
) {
  return request.request({
    url: `/ibs/api/admin/containers/${page}/${pageSize}`,
    method: "get",
    data: selectParam || null,
  });
}
export function getPacket(
  pageParam?: pageParam
): Promise<requestResponse<Array<packet>>> {
  return request({
    url: "/ibs/api/packet",
    method: "GET",
    params: pageParam,
  });
}
export function getImages(
  pageParam?: pageParam
): Promise<requestResponse<Array<image>>> {
  return request({
    url: "/ibs/api/images",
    method: "POST",
    data: {
      pageParam: pageParam,
    },
  });
}
export function getImageByAdmin(
  local:boolean=false,label:string="",pageParam?: pageParam
): Promise<requestResponse<Array<image>>> {
  return request({
    url: "/ibs/api/images",
    method: "POST",
    data: {
      pageParam,
      center:local,
      label: label
    },
  });
}
export function getImage(label: string, version: string) {
  return request({
    url: `/ibs/api/images/pull/${label}/${version}`,
    method: "POST",
  });
}
export function createOrder(packetId: number, config: orderPacket) {
  console.log(config);
  return request({
    url: `/ibs/api/order/create?id=${packetId}`,
    method: "POST",
    data: config,
  });
}
export function payOrder(orderId: string) {
  return request({
    url: `/ibs/api/order/pay/${orderId}`,
    method: "PUT",
  });
}
export function createPacketOrder(label: string, version: string) {
  return request({
    url: `/ibs/api/images/pull/${label}/${version}`,
    method: "POST",
  });
}
export function changeContainerStatus(id: string, status: continerWorkStatus) {
  return request({
    url: `/ibs/api/containers/${id}/${status}`,
    method: "POST",
  });
}
export function getContainerInfo(containerId:string): Promise<requestResponse<containerInfo>> {
  return request({
    url: `/ibs/api/mix/get/${containerId}`,
    method: "GET",
  });
}
export function getContainerDataList(containerId:string,targetPath:string = "/"): Promise<requestResponse<containerFileList>> {
  return request({
    url: `/ibs/api/containers/get/file?containerId=${containerId}&targetPath=${targetPath}`,
    method: "POST",
  });
}
export function moveFiletoDownloadSpace(containerId:string,targetPath:string): Promise<requestResponse<any>> {
  return request({
    url: `/ibs/api/containers/download`,
    method: "POST",
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      containerId,
      targetPath
    }
  });
}
export function download(containerId:string,username:string,targetPath:string): Promise<any> {
  return request({
    url: `http://localhost:8888/static/${username}/container/${containerId}${targetPath}`,
    method: "GET",
    responseType: "blob"
  });
}
export function upload(containerId:string,targetPath:string): Promise<requestResponse<any>> {
  return request({
    url: `/ibs/api/containers/download`,
    method: "POST",
    data: {
      containerId,
      targetPath
    }
  });
}
export function pullImage(name:string,tag:string) {
  return request({
    url: `/ibs/api/images/pull`,
    method: "POST",
    data: {
      name: name,
      tag:tag
    }
  });
}
export function getHardWare(hardwareId:number) {
  return request.request({
    url: `/ibs/api/hardware/get/${hardwareId}`,
    method: "GET",
  });
}
export function createPacket(packetConfig: packetConfig) {
  return request.request({
    url: "/ibs/api/packet/create?isFree=true",
    method: "post",
    data: packetConfig,
  });
}
export function updatePacket(packetConfig: packet) {
  return request.request({
    url: "/ibs/api/packet/update",
    method: "post",
    data: packetConfig,
  });
}
export function exec(
  id: string,
  command: string,
  loc: string
): Promise<requestResponse<string>> {
  return request({
    url: `/ibs/api/containers/${id}/exec`,
    method: "POST",
    data: {
      command: command,
      loc: loc,
    },
  });
}
