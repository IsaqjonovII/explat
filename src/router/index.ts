import { createRouter, createWebHistory } from "vue-router";
import DashboardRoutes from "@/modules/dashboard/routes";
import OrdersRoutes from "@/modules/orders/routes";
import AppealsRoutes from "@/modules/appeals/routes";
import RequisitesRoutes from "@/modules/requisites/routes";
import BalanceRoutes from "@/modules/balance/routes";
import DevicesRoutes from "@/modules/devices/routes";
import NotificationRoutes from "@/modules/notification/routes";
import AuthRoutes from "@/modules/auth/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...DashboardRoutes,
    ...OrdersRoutes,
    ...AppealsRoutes,
    ...RequisitesRoutes,
    ...BalanceRoutes,
    ...DevicesRoutes,
    ...NotificationRoutes,
    ...AuthRoutes,
  ],
});

export default router;
