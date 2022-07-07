import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import cars from "./modules/cars";
Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit({ commit }) {
        if (this.$cookies.get("authUser")) {
          commit("auth/isAuth", true);
        } else {
          commit("auth/isAuth", false);
        }
      },
    },
    namespaced: true,
    strict: true,
    modules: {
      auth,
      cars,
    },
  });
};
export default store;
