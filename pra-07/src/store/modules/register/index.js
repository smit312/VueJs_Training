import axios from "axios";
// import users from "../users";

// local state
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
  registerUser({ commit }, form) {
    console.log("register api called");
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
        console.log(res);
        console.log(form);
        if (res && res.data) {
          {
            commit("AUTH_USER", uDetails);
            return "success";
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
