import { useI18n } from "vue-i18n";

export const RequisitesFilterStatus = () => {
  const { t } = useI18n();
  return [
    {
      id: 1,
      name: t("conditions.all"),
      key: "all",
    },
    {
      id: 2,
      name: t("conditions.activate"),
      key: "success",
    },
    {
      id: 3,
      name: t("conditions.deactivate"),
      key: "canceled",
    },
    {
      id: 4,
      name: t("conditions.test"),
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
      title: t("requisites.requisites"),
      key: "requisites",
      hasSort: true,
    },
    {
      title: t("requisites.balance"),
      key: "balance",
      hasSort: true,
    },
    {
      title: t("requisites.bank_method"),
      key: "bank_method",
      hasSort: true,
    },
    {
      title: t("requisites.indicator"),
      key: "indicator",
      hasSort: true,
    },
    {
      title: t("requisites.actions"),
      key: "actions",
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
      icon: "icon-card",
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
