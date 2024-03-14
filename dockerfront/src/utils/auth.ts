import Cookie from "js-cookie";
import service from "./request";
const USER_TOKEN = "user_token";
// export function setToken(token: string) {
//   Cookie.set(USER_TOKEN, token, {
//     expires: new Date(
//       Date.now() + 10000 * 60 * 1000
//     ),
//   });
// }
// export function getToken() {
//   return Cookie.get(TOKEN);
// }
// export function resetToken() {
//   Cookie.remove(TOKEN);
// }
export function setUserInfo(user:user,expires:number = 10000) {
  Cookie.set(USER_TOKEN, JSON.stringify(user), {
    expires: new Date(
      Date.now() + expires * 60 * 1000
    ),
  });
}
export function getUserInfo():user {
  const userInfo = Cookie.get(USER_TOKEN);
  return userInfo?JSON.parse(userInfo):null;
}
export function isUserInfoExpire() {
  return !Cookie.get(USER_TOKEN);
}