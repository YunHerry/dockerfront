import { login,getInfo } from "@/api/admin";
import auth from "@/utils/auth";
import { ElMessage } from "element-plus";
import { Commit } from "vuex";
const getDefaultState = () => {
  return {
    user: {
      token: "",
      name: "",
      avatar: "",
    },
  };
};
const state = getDefaultState();
const mutations = {
  RESET_STATE: (state: user) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state: user, token: string) => {
    state.token = token;
  },
  SET_NAME: (state: user, name: string) => {
    state.name = name;
  },
  SET_AVATAR: (state: user, avatar: string) => {
    state.avatar = avatar;
  },
};
const actions = {
  login({ commit }: { commit: Commit }, userinfo: userinfo) {
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
          commit("SET_TOKEN", data);
          auth.setToken(data);
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
};
const getters = {
  token: (state: State) => state.user.token,
  avatar: (state: State) => state.user.avatar,
  name: (state: State) => state.user.name,
};
export type State = ReturnType<typeof getDefaultState>;
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
