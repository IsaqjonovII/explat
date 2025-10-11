import { useI18n } from "vue-i18n";

export const devicesFilterStatus = () => {
  const { t } = useI18n();
  return [
    {
      id: 1,
      name: t("statuses.all_statuses"),
      key: "all",
    },
    {
      id: 2,
      name: t("devices.status.active"),
      key: "active",
    },
    {
      id: 3,
      name: t("devices.status.inactive"),
      key: "inactive",
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
      title: t("devices.name"),
      key: "name",
      hasSort: true,
    },
    {
      title: t("devices.model"),
      key: "model",
      hasSort: true,
    },
    {
      title: t("devices.phone_number"),
      key: "phone_number",
      hasSort: true,
    },
    {
      title: t("devices.battery"),
      key: "battery",
      hasSort: true,
    },
    {
      title: t("devices.carrier"),
      key: "carrier",
      hasSort: true,
    },
    {
      title: t("devices.status"),
      key: "status",
      hasSort: true,
    },
    {
      title: t("devices.availability"),
      key: "is_available",
      hasSort: true,
    },
    {
      title: t("devices.actions"),
      key: "actions",
      hasSort: false,
    },
  ];
};

export const tableSettings = () => {
  const { t } = useI18n();
  return {
    noData: {
      title: t("no_data.title"),
      subtitle: t("no_data.subtitle"),
      icon: "icon-phone",
      hasAction: false,
    },
    thClass: "last:!text-left",
  };
};

export const devicesFilterCarrier = () => {
  const { t } = useI18n();
  return [
    {
      id: 1,
      name: t("all"),
      key: "all",
    },
    {
      id: 2,
      name: "Beeline",
      key: "beeline",
    },
    {
      id: 3,
      name: "Ucell",
      key: "ucell",
    },
    {
      id: 4,
      name: "UzMobile",
      key: "uzmobile",
    },
    {
      id: 5,
      name: "Mobiuz",
      key: "mobiuz",
    },
  ];
};

export const devicesOrderingOptions = () => {
  const { t } = useI18n();
  return [
    {
      id: 1,
      name: t("devices.ordering.id_asc"),
      key: "id",
    },
    {
      id: 2,
      name: t("devices.ordering.id_desc"),
      key: "-id",
    },
    {
      id: 3,
      name: t("devices.ordering.name_asc"),
      key: "name",
    },
    {
      id: 4,
      name: t("devices.ordering.name_desc"),
      key: "-name",
    },
    {
      id: 5,
      name: t("devices.ordering.battery_asc"),
      key: "battery",
    },
    {
      id: 6,
      name: t("devices.ordering.battery_desc"),
      key: "-battery",
    },
    {
      id: 7,
      name: t("devices.ordering.created_asc"),
      key: "created_at",
    },
    {
      id: 8,
      name: t("devices.ordering.created_desc"),
      key: "-created_at",
    },
  ];
};
