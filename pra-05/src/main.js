import Vue from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
Vue.config.productionTip = false;

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
import UserForm from "./components/UserForm.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/homepage", component: UserForm }],
});

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
Vue.use(router);
localize("en", en);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
