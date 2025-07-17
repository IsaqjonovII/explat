import type { RouteLocationRaw } from "vue-router";

import i18n from "@/plugins/i18n";

const t = i18n.global.t;

type MetaItem = string | boolean | number;

export interface IMenu {
  heading: string;
  route: RouteLocationRaw;
  svgIcon?: string;
  c?: Record<string, MetaItem | MetaItem[]>;
  withCount?: boolean;
  countName?: string;
  sub?: IMenu[];
  space?: boolean;
  role?: string;
}

export const menu: IMenu[] = [
  {
    heading: t("menu.sidebar.main"),
    route: "/dashboard",
    svgIcon: "icon-dashboard",
    meta: ["trader", "admin", "superadmin"],
  },
  {
    heading: t("menu.sidebar.merchants"),
    route: "/merchants",
    svgIcon: "icon-id",
    meta: ["superadmin"],
  },
  {
    heading: t("menu.sidebar.viplating"),
    route: "/payments",
    svgIcon: "icon-users-group",
    meta: ["superadmin"],
  },
  {
    heading: t("menu.sidebar.admins"),
    route: "/admins",
    svgIcon: "icon-user",
    meta: ["superadmin"],
  },
  {
    heading: t("menu.sidebar.traders"),
    route: "/traders",
    svgIcon: "icon-users-group",
    meta: ["admin", "superadmin"],
  },
  {
    heading: t("menu.sidebar.orders"),
    route: "/orders",
    svgIcon: "icon-money",
    meta: ["trader", "admin", "superadmin"],
  },
  {
    heading: t("menu.sidebar.appeals"),
    route: "/appeals",
    svgIcon: "icon-apilki",
    meta: ["trader", "admin", "superadmin"],
  },
  {
    heading: t("menu.sidebar.requisites"),
    route: "/requisites",
    svgIcon: "icon-card",
    meta: ["trader", "admin", "superadmin"],
  },
  {
    heading: t("menu.sidebar.balance"),
    route: "/balance",
    svgIcon: "icon-cards",
    meta: ["trader"],
  },
  {
    heading: t("menu.sidebar.devices"),
    route: "/devices",
    svgIcon: "icon-pnone",
    meta: ["trader", "admin", "superadmin"],
  },
  {
    heading: t("menu.sidebar.notifications"),
    route: "/notifications",
    svgIcon: "icon-jinglebens",
    meta: ["trader", "admin", "superadmin"],
  },
];
