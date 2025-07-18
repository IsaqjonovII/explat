export default [
  {
    path: "/devices",
    name: "Devices",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/devices/pages/PDevices.vue"),
  },
];
