export default [
  {
    path: "/",
    redirect: { name: "Dashboard" },
    meta: {
      layout: "default",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/dashboard/pages/PDashboard.vue"),
  },
];
