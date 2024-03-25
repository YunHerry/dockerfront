import { login,getInfo} from "@/api/user";
import { getUserInfo,setUserInfo,clearUserInfo } from "@/utils/auth";
import { isEmpty } from "@/utils/stringUtils";
import { ElMessage } from "element-plus";
import { Commit } from "vuex";
import store from "..";
const getDefaultState = () => {
  return {
    user: {
      token: "",
      userName: "",
      avatar: "",
      balance: 0,
    },
  };
};
const state = getDefaultState();
const mutations = {
  RESET_STATE: (state: State) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state: State, token: string) => {
    state.user.token = token;
  },
  SET_NAME: (state: State, name: string) => {
    state.user.userName = name;
  },
  SET_AVATAR: (state: State, avatar: string) => {
    state.user.avatar = avatar;
  },
  SET_BALANCE: (state: State, money: number) => {
    state.user.balance = money;
  },
};
const actions = {
  setUserInfo({ commit }: { commit: Commit }, user:user) {
     commit("SET_BALANCE",user.balance);
     commit("SET_TOKEN",user.token);
     commit("SET_AVATAR",user.avatar);
     commit("SET_NAME",user.userName);
  },
  login({ commit }: { commit: Commit }, userinfo: userInfo) {
    return new Promise<void>((resolve, rject) => {
      login(userinfo)
        .then((res) => {
          const data = res.data || null;
          console.log(data);
          if (!data) {
            rject("账号或密码错误,请重新输入!");
            ElMessage({
              message: "账号或密码错误,请重新输入!"
            })
            return;
          }
          store.dispatch("user/setUserInfo",data);
          setUserInfo(data);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          ElMessage({
            message: "网络连接异常,请重试!"
          })
          rject("网络连接异常,请重试!");
        });
    });
  },
  getInfo({ commit }: { commit: Commit }): Promise<void> {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((res) => {
          const user = res.data.data;
          if (!user) {
            return reject("Verification failed, please Login again.");
            ElMessage({
              message: "Verification failed, please Login again."
            })
          }
          commit("SET_NAME", user.name);
          commit("SET_AVATAR", user.head);
          resolve;
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  loadToken({ commit }: {commit:Commit}) {
    const userInfo = getUserInfo();
    return new Promise((resolve, rject) => {
      if (userInfo) {
        store.dispatch("user/setUserInfo",userInfo);
        resolve("profile has been");
      } else {
        rject("token is null");
      }
    });
  },
  logout({ commit }: { commit: Commit }) {
      return new Promise<void>((resolve) => {
        // Clear user info from cookies or local storage
        clearUserInfo(); // Assuming setUserInfo(null) clears the user info
        // Reset state to default
        commit("RESET_STATE");
        resolve();
        window.location.reload();
    });
  },
};
const getters = {
  token: (state: State) => state.user.token,
  money: (state: State) => state.user.balance,
  avatar: (state: State) => state.user.avatar,
  name: (state: State) => state.user.userName,
  userInfo: (state: State) => state.user,
};
export type State = ReturnType<typeof getDefaultState>;
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
