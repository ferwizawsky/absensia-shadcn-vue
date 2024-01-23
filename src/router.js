import { createRouter, createWebHistory } from "vue-router";
import { useOption } from "@/stores/option";
import { useAuth } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./pages/index.vue"),
    meta: {
      public: false,
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
  {
    path: "/dosen",
    name: "Dosen",
    component: () => import("./pages/dosen/layout.vue"),
    redirect: "/dosen/dash",
    children: [
      {
        path: "dash",
        name: "Dosen Dashboard",
        component: () => import("./pages/dosen/index.vue"),
      },
      {
        path: "kelas/:id",
        name: "Kelas Detail",
        component: () => import("./pages/dosen/kelasDetail.vue"),
      },
      {
        path: "jadwal",
        name: "Jadwal",
        component: () => import("./pages/dosen/jadwal/index.vue"),
      },
      {
        path: "jadwal/:id",
        name: "Jadwal Detail",
        component: () => import("./pages/dosen/jadwal/id.vue"),
      },
      {
        path: "jadwal-make",
        name: "Buat Jadwal",
        component: () => import("./pages/dosen/jadwal/id.vue"),
      },
    ],
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
  } else next();
  // console.log(token);
});

export default router;
