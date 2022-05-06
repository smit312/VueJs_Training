import axios from "axios";
const state = {
  user: null,
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
          return "Invalid Credentials!";
        }
      })
      .catch(() => {
        return "Oops,Something went wrong!";
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
          return "Oops,car data not updated please try again";
        }
      })
      .catch(() => {
        return "Oops,car data not updated please try again";
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
