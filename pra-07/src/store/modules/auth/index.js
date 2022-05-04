import axios from "axios";
const state = {
  user: null,
  uText: "Hello",
};

const getters = {
  authUser: (state) => {
    return state.user;
  },
};

const mutations = {
  AUTH_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  // first param is context object
  loginUser({ commit }, data) {
    return axios
      .get("https://testapi.io/api/dartya/resource/users/1")
      .then((res) => {
        if (res && res.data) {
          if (
            data.uEmail === res.data.email &&
            data.uPassword === res.data.password
          ) {
            commit("AUTH_USER", data);
            return "success";
          } else {
            return "Invalid Credentials!";
          }
        } else {
          return "Oops,Something went wrong!";
        }
      })
      .catch(() => {
        return "Oops,Something went wrong!";
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
