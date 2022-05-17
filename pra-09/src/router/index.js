import Vue from "vue";
import VueRouter from "vue-router";
// import HomeComponent from "../views/Home.vue";
// import UserLogin from "../views/UserLogin.vue";
// import UserRegister from "../views/UserRegister.vue";
// import carDetails from "../views/carDetails.vue";
import jwt_decode from "jwt-decode";
import store from "@/store";
Vue.use(VueRouter);
function lazyLoad(view) {
  console.log("lazyload Called");
  return () => import(`@/views/${view}.vue`);
}

const routes = [
  {
    path: "/",
    name: "home",
    // component: HomeComponent,
    component: lazyLoad("Home"),
  },
  {
    path: "/register",
    name: "userregister",
    // component: UserRegister,
    component: lazyLoad("UserRegister"),
  },
  {
    path: "/login",
    name: "userlogin",
    // component: UserLogin,
    component: lazyLoad("UserLogin"),
  },
  {
    path: "/cardetails/:carId",
    name: "cardetails",
    // component: carDetails,
    component: lazyLoad("carDetails"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isAuth = false;
  let userData = {};
  if (window.$cookies.get("authUser")) {
    isAuth = true;
    userData = jwt_decode(window.$cookies.get("authUser"));
    store.commit("auth/setUserData", userData);
  }
  if (to.name !== "userlogin" && to.name !== "userregister" && !isAuth)
    next({ name: "userlogin" });
  else if ((to.name === "userlogin" || to.name === "userregister") && isAuth) {
    next({ name: "home" });
  } else next();
});

export default router;
