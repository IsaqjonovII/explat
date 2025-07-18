export default [
  {
    path: "/requisites",
    name: "Requisites",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/requisites/pages/PRequisites.vue"),
  },
];
