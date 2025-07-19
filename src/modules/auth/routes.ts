export default [
  {
    path: "/auth",
    name: "Auth",
    meta: {
      layout: "auth",
    },
    component: () => import("@/modules/auth/pages/PAuth.vue"),
  },
];
