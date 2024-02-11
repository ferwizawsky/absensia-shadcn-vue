export default {
  path: "/admin",
  name: "Admin",
  component: () => import("@/layouts/admin.vue"),
  redirect: "/admin/user",
  children: [
    {
      path: "dash",
      name: "Admin Dashboard",
      component: () => import("@/pages/admin/dashboard.vue"),
    },
    {
      path: "user",
      name: "Admin User",
      component: () => import("@/pages/admin/user/index.vue"),
    },
    {
      path: "user-make",
      name: "Admin User Make",
      component: () => import("@/pages/admin/user/id.vue"),
    },
    {
      path: "user/:id",
      name: "Admin User Detail",
      component: () => import("@/pages/admin/user/id.vue"),
    },
    {
      path: "jadwal",
      name: "Admin Jadwal",
      component: () => import("@/pages/dosen/jadwal/index.vue"),
    },
    {
      path: "jadwal-make",
      name: "Admin jadwal Make",
      component: () => import("@/pages/dosen/jadwal/id.vue"),
    },
    {
      path: "jadwal/:id",
      name: "Admin jadwal Detail",
      component: () => import("@/pages/dosen/jadwal/id.vue"),
    },
    {
      path: "kelas",
      name: " Admin Kelas List",
      component: () => import("@/pages/dosen/index.vue"),
    },
    {
      path: "kelas/:id",
      name: "Admin Kelas Detail",
      component: () => import("@/pages/dosen/kelasDetail.vue"),
    },
    {
      path: "kelas-make",
      name: "Admin Kelas Make",
      component: () => import("@/pages/dosen/kelasDetail.vue"),
    },
  ],
};
