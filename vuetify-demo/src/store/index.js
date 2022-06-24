import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import cars from "./modules/cars";
import addcar from "./modules/addcar";
import ui from "./modules/ui";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    cars,
    addcar,
    ui,
  },
});
