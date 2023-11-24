import { createRouter, createWebHistory } from "vue-router";
import { useOption } from "@/stores/option";
import { useAuth } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./pages/index.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./pages/login.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./pages/register.vue"),
    meta: {
      public: true,
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name + " | " + useOption().name;
  const token = useAuth().token;

  if (!to.meta?.public && !token) {
    next("/login");
  }
  console.log(token);
  next();
});

export default router;
