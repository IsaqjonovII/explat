import { useI18n } from "vue-i18n";

export const notificationFilterStatus = () => {
  const { t } = useI18n();
  return [
    {
      id: 1,
      name: t("statuses.all_statuses"),
      key: "all",
    },
    {
      id: 2,
      name: t("statuses.success"),
      key: "success",
    },
    {
      id: 3,
      name: t("statuses.canceled"),
      key: "canceled",
    },
    {
      id: 4,
      name: t("statuses.pending"),
      key: "pending",
    },
  ];
};

export const tableHead = () => {
  const { t } = useI18n();
  return [
    {
      title: "№",
      key: "_index",
    },
    {
      title: "ID",
      key: "id",
      hasSort: true,
    },
    {
      title: t("notification.body"),
      key: "body",
      hasSort: true,
    },
    {
      title: t("notification.date"),
      key: "date",
      hasSort: true,
    },
  ];
};

export const tableSettings = () => {
  const { t } = useI18n();
  return {
    noData: {
      title: t("no_data.title"),
      subtitle: t("no_data.subtitle"),
      icon: "icon-bell",
      hasAction: false,
    },
    thClass: "last:!text-left",
  };
};

export const filterTypes = () => {
  const { t } = useI18n();
  return [
    {
      name: t("all"),
      key: "all",
    },
    {
      name: t("market.types.buy"),
      key: "buy",
    },
    {
      name: t("market.types.sell"),
      key: "sell",
    },
  ];
};
