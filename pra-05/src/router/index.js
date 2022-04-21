import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import HomeComponent from "../components/HomeComponent.vue";
import UserLogin from "../components/UserLogin.vue";
import UserRegister from "../components/UserRegister.vue";
import carDetails from "../views/carDetails.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeComponent,
  },
  {
    path: "/register",
    name: "userregister",
    component: UserRegister,
  },
  {
    path: "/login",
    name: "userlogin",
    component: UserLogin,
  },
  {
    path: "/cardetails/:carId",
    name: "cardetails",
    component: carDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
