export default [
  {
    path: "/balance",
    name: "Balance",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/balance/pages/PBalance.vue"),
  },
];
