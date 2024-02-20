import Cookie from "js-cookie";
import service from "./request";
const TOKEN = "auth_token";
export function setToken(token: string) {
  Cookie.set(TOKEN, token, {
    expires: new Date(
      Date.now() + 10000 * 60 * 1000
    ),
  });
}
export function getToken() {
  return Cookie.get(TOKEN);
}
export function resetToken() {
  Cookie.remove(TOKEN);
}
