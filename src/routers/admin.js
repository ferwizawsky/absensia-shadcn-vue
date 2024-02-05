export default {
  path: "/admin",
  name: "Admin",
  component: () => import("@/layouts/admin.vue"),
  redirect: "/admin/dash",
  children: [
    {
      path: "dash",
      name: "Admin Dashboard",
      component: () => import("@/pages/admin/dashboard.vue"),
    },
  ],
};
