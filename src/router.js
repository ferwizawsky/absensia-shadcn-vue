import { createRouter, createWebHistory } from "vue-router";
import { useOption } from "@/stores/option";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./components/HelloWorld.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name + " | " + useOption().name;
  const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role_id");

  // if (to.name == "Login" && token) {
  //   if (role == "2") next("/dash");
  //   else next("/");
  // }
  //   if (to.name != "Login" && !token) next("/login");
  //   else next();
  console.log(to);
  next();
});

export default router;
