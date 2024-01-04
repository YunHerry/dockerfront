import Cookie from "js-cookie";
import service from "./request";
const TOKEN = "auth_token";
export function setToken(token: string) {
  Cookie.set(TOKEN, token, {
    expires: new Date(
      Date.now() + process.env.VUE_APP_TOKEN_EXPIRES * 60 * 1000
    ),
  });
}
export function getToken() {
  return Cookie.get(TOKEN);
}
export function resetToken() {
  Cookie.remove(TOKEN);
}
