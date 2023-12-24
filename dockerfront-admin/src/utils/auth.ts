import Cookie from "js-cookie";
import service from "./request";
class auth {
  public static readonly TOKEN = "auth_token";
  public static setToken(token: string) {
    Cookie.set(this.TOKEN, token,{expires:new Date(Date.now()+ process.env.VUE_APP_TOKEN_EXPIRES * 60 * 1000)});
  }
  public static getToken() {
    return Cookie.get(this.TOKEN);
  }
  public static resetToken() {
    Cookie.remove(this.TOKEN);
  }
}
export default auth;
