import { useI18n } from "vue-i18n";

export const orderFilterStatus = () => {
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
      title: "ID",
      key: "_index",
    },
    {
      title: t("orders.amount"),
      key: "amount",
      hasSort: true,
    },
    {
      title: t("orders.device"),
      key: "device",
      hasSort: true,
    },
    {
      title: t("orders.payment_method"),
      key: "payment_method",
      hasSort: true,
    },
    {
      title: t("orders.status"),
      key: "status",
      hasSort: true,
    },
    {
      title: t("orders.date"),
      key: "date",
      hasSort: true,
    },
  ];
};

export const tableSettings = () => {
  const { t } = useI18n();
  return {
    noData: {
      title: t("transactions_not_found"),
      subtitle: t("transactions_not_found_try_again_later"),
      image: "/images/no-data/transactions.png",
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
