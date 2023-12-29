import request from "@/utils/request";
import auth from "@/utils/auth";
import { AxiosResponse } from "axios";
import { continerStatus } from "@/constant";
export function login(data: userinfo): Promise<requestResponse<string>> {
  return request({
    url: "/ibs/api/verify/login",
    method: "POST",
    data: {
      account: data.username,
      pwd: data.password,
    },
  });
}
export function register(data: userinfo) {
  return request({
    url: "/ibs/api/verify/register",
    method: "POST",
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
export function getImages(pageParam?: pageParam):Promise<requestResponse<Array<image>>> {
  console.log(pageParam);
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
  return request({
    url: `/ibs/api/order/create`,
    method: "POST",
    params: {
      id: packetId
    },
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
export function changeContainerStatus(id: string, status: continerStatus) {
  return request({
    url: `/ibs/api/containers/${id}/${status}`,
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
