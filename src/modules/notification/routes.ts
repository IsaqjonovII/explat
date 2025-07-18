export default [
  {
    path: "/notifications",
    name: "Notifications",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/notification/pages/PNotification.vue"),
  },
];
