// import router from "@/router";
import axios from "axios";
// import Vuex from "vuex";
// import Vue from "vue";
import jwt_decode from "jwt-decode";

// Vue.use(Vuex);
// const store = new Vuex.Store({
const state = () => ({
  user: null,
  login: false,
  isAuth: false,
  userData: {
    email: "",
    password: "",
  },
});
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
};

const mutations = {
  setUserData(state, data) {
    state.userData = data;
  },

  authUser(state, user) {
    state.user = user;
  },
  isAuth(state, status) {
    state.isAuth = status;
  },
};

const actions = {
  // first param is context object
  async loginUser({ commit }, data) {
    const response = await axios
      // .post("https://vue-project-97158.web.app/api", {
      .post("http://localhost:3000/api", {
        email: data.uEmail,
        password: data.uPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          commit("isAuth", true);
          // router.push({ name: "home" });
          // router.push("/Home");
          // let userData = jwt_decode(this.$cookies.get("authUser"));
          // commit("setUserData", userData);
          return "success";
        }
      })
      .catch((err) => {
        console.log(err);
        return "error";
      });
    return response;
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
            commit("authUser", uDetails);
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
  UserLogout({ commit }) {
    this.$cookies.remove("authUser");
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
