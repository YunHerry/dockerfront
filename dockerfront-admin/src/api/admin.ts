import { continerStatus } from "@/constant";
import request from "@/utils/request";
import axios, { AxiosResponse } from "axios";
export function login(data: userinfo): Promise<requestResponse<string>> {
  return request({
    url: "/ibs/api/verify/login",
    method: "post",
    data: {
      account: data.username,
      pwd: data.password,
    },
  });
}
export function register(data: userinfo): Promise<requestResponse<userinfo>>  {
  return request({
    url: "/ibs/api/verify/register",
    method: "post",
    data: {
      account: data.username,
      pwd: data.password,
    },
  });
}
export function logout() {
  return request({
    url: "/ibs/user/logout",
    method: "post",
  });
}
export function getInfo() {
  return request({
    url: "/ibs/api/user/",
    method: "get",
  });
}
export function changeContainerStatus(id: string, status: continerStatus) {
  return request.request({
    url: `/ibs/api/admin/containers/${id}/${status}`,
    method: "get",
  });
}
export function createContainer(id: string, dockerConfig: containerConfig) {
  return request.request({
    url: `/ibs/api/admin/containers/create`,
    method: "get",
    data: dockerConfig,
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
