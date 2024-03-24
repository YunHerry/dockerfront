import request from "@/utils/request";
import { AxiosResponse } from "axios";
import { continerStatus, continerWorkStatus } from "@/constant";
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
export function getContainers(
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
