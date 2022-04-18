import { createRouter, createWebHistory } from "vue-router";
// import UserForm from "../components/UserForm.vue";
// import PageNotFound from "../views/PageNotFound.vue";
import Helloworld from "../components/HelloWorld.vue";
const routes = [
  {
    path: "/hello",
    component: Helloworld,
  },
  //   {
  //     path: "*",
  //     name: "not found",
  //     component: PageNotFound,
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
