import { createRouter, createWebHistory } from "vue-router";
import DashboardRoutes from "@/modules/dashboard/routes";
import OrdersRoutes from "@/modules/orders/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...DashboardRoutes, ...OrdersRoutes],
});

export default router;
