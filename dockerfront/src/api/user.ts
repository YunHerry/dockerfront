import request from "@/utils/request";
import auth from "@/utils/auth";
import { AxiosResponse } from "axios";
import { continerStatus } from "@/constant";
  export function login(data: userinfo):Promise<requestResponse<string>> {
    return request({
      url: "/ibs/api/verify/login",
      method: "post",
      data: {
        account:data.username,
        pwd:data.password
      }
    });
  }
  export function register(data: userinfo) {
    return request({
      url: "/ibs/api/verify/register",
      method: "post",
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
  export function getContainers(page:number,pageSize:number,filter?:containerFilter) {
    return request({
      url: `/ibs/api/containers/get/${page}/${pageSize}`,
      method: "get",
      data: filter
    });
  }
  export function getImages(pageParam?:pageParam) {
    return request({
      url: "/ibs/api/images",
      method: "get",
      data: pageParam
    });
  }
  export function getImage(label:string,version:string) {
    return request({
      url: `/ibs/api/images/pull/${label}/${version}`,
      method: "post",
    });
  }
  export function createOrder(packetId:string,config:orderPacket) {
    return request({
      url: `/ibs/api/order/create/${packetId}`,
      method: "post",
      data: config
    });
  }
  export function payOrder(orderId:string) {
    return request({
      url: `/ibs/api/order/pay/${orderId}`,
      method: "put",
    });
  }
  export function createPacketOrder(label:string,version:string) {
    return request({
      url: `/ibs/api/images/pull/${label}/${version}`,
      method: "post",
    });
  }
  export function changeContainerStatus(id:string,status:continerStatus) {
    return request({
      url: `/ibs/api/containers/${id}/${status}`,
      method: "put",
    });
  }
  export function exec(id:string,command:string,loc:string) {
    return request({
      url: `/ibs/api/containers/${id}/exec`,
      method: "post",
      data: {
        command: command,
        loc: loc
      }
    });
  }
