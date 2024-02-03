export default {
  path: "/dosen",
  name: "Dosen",
  component: () => import("@/layouts/dosen.vue"),
  redirect: "/dosen/dash",
  children: [
    {
      path: "dash",
      name: "Dosen Dashboard",
      component: () => import("@/pages/dosen/index.vue"),
    },
    {
      path: "kelas/:id",
      name: "Kelas Detail",
      component: () => import("@/pages/dosen/kelasDetail.vue"),
    },
    {
      path: "jadwal",
      name: "Jadwal",
      component: () => import("@/pages/dosen/jadwal/index.vue"),
    },
    {
      path: "jadwal/:id",
      name: "Jadwal Detail",
      component: () => import("@/pages/dosen/jadwal/id.vue"),
    },
    {
      path: "jadwal-make",
      name: "Buat Jadwal",
      component: () => import("@/pages/dosen/jadwal/id.vue"),
    },
  ],
};
