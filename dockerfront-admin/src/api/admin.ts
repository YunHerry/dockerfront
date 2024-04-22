import { continerStatus, continerWorkStatus } from "@/constant";
import request from "@/utils/request";
import axios, { AxiosResponse } from "axios";
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
export function getContainers(nowPage:number=1,size:number=5) {
  return request({
    url: `/ibs/api/admin/containers/${nowPage}/${size}`,
    method: "get",
  });
}
export function changeContainerStatus(id: string, status: continerWorkStatus) {
  return request({
    url: `/ibs/api/containers/${id}/${status}`,
    method: "POST",
  });
}
// export function createContainer(id: string, dockerConfig: containerConfig) {
//   return request.request({
//     url: `/ibs/api/admin/containers/create`,
//     method: "get",
//     data: dockerConfig,
//   });
// }
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
// export function createPacket(packetConfig: packetConfig) {
//   return request.request({
//     url: "/ibs/api/packet/create",
//     method: "post",
//     data: packetConfig,
//   });
// }
// export function getPacket(
//   pageParam?: pageParam
// ): Promise<requestResponse<Array<packet>>> {
//   return request({
//     url: "/ibs/api/packet",
//     method: "GET",
//     params: pageParam,
//   });
// }
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
