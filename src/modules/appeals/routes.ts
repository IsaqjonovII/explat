export default [
  {
    path: "/appeals",
    name: "Appeals",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/appeals/pages/PAppeals.vue"),
  },
];
