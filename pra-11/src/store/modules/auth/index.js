import router from "@/router";
import axios from "axios";
import jwt_decode from "jwt-decode";
const state = {
  user: null,
  isAuth: false,
  userData: {
    email: "",
    password: "",
  },
  users: [],
};

const getters = {
  authUser: (state) => {
    return state.user;
  },
  getisAuth: (state) => {
    return state.isAuth;
  },
  getUser: (state) => {
    return state.userData;
  },
  getAllUser: (state) => {
    return state.users;
  },
};

const mutations = {
  setUserData(state, data) {
    state.userData = data;
  },

  AUTH_USER(state, user) {
    state.user = user;
  },
  isAuth(state, status) {
    state.isAuth = status;
  },
  setAllUser(state, users) {
    state.users = users;
  },
};

const actions = {
  // first param is context object
  async loginUser({ commit }, data) {
    await axios
      .post("http://localhost:8080/api", {
        email: data.uEmail,
        password: data.uPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          commit("isAuth", true);
          router.push({ name: "home" });
          let userToken = jwt_decode(window.$cookies.get("authUser"));
          commit("setUserData", userToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async AllUser({ commit }) {
    return await axios
      .get("https://testapi.io/api/dartya/resource/users")
      .then((res) => {
        if (res.status === 200) {
          console.log("api", res.data.data);
          commit("setAllUser", res.data.data);
        }
      });
  },
  registerUser({ commit }, form) {
    let uDetails = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.selectedrole,
      age: form.age,
      dob: form.dob,
      gender: form.selectedgender,
    };
    return axios
      .post("https://testapi.io/api/dartya/resource/users", uDetails)
      .then((res) => {
        if (res && res.data) {
          {
            commit("AUTH_USER", uDetails);
            return "success";
          }
        } else {
          return "Oops,somthing went wrong please try again";
        }
      })
      .catch(() => {
        return "Oops,somthing went wrong please try again";
      });
  },
  checkAuth({ commit }) {
    if (window.$cookies.get("authUser")) {
      commit("isAuth", true);
    } else {
      commit("isAuth", false);
    }
  },
  UserLogout({ commit }) {
    window.$cookies.remove("authUser");
    commit("isAuth", false);
    router.replace({ name: "userlogin" });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
