import { createRouter, createWebHistory } from "vue-router";
import DashboardRoutes from "@/modules/dashboard/routes";
import OrdersRoutes from "@/modules/orders/routes";
import AppealsRoutes from "@/modules/appeals/routes";
import RequisitesRoutes from "@/modules/requisites/routes";
import BalanceRoutes from "@/modules/balance/routes";
import DevicesRoutes from "@/modules/devices/routes";
import NotificationRoutes from "@/modules/notification/routes";
import AuthRoutes from "@/modules/auth/routes";
import { getCookie } from "@/services/cookies";

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

// Auth guard
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!(
    getCookie("__access_token") && getCookie("__refresh_token")
  );

  const isAuthRoute = to.name === "Auth";

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && !isAuthRoute) {
    next({ name: "Auth" });
    return;
  }

  // If user is authenticated and trying to access auth page
  if (isAuthenticated && isAuthRoute) {
    next({ name: "Dashboard" });
    return;
  }

  next();
});

export default router;
