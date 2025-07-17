export default [
  {
    path: "/orders",
    name: "Orders",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/orders/pages/POrders.vue"),
  },
];
