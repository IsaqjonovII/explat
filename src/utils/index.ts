import { useI18n } from "vue-i18n";
import i18n from "@/plugins/i18n";

const t = i18n.global.t;
export async function updateQueryParams(
  key: string,
  value: string | undefined | LocationQueryValue[],
) {
  const route = router.currentRoute.value;
  const queryParams = { ...route.query };
  if (queryParams[key]) {
    queryParams[key] = value;
  } else {
    queryParams[key] = value;
  }
  await router.replace({ name: route.name || "Dashboard", query: queryParams });
}
export function formatMoneyDecimal(
  number: number,
  fix = 0,
  option = "decimal",
) {
  let style: string;
  if (["USD", "RUB"].includes(option)) {
    style = "currency";
  } else if (["kilogram", "meter", "percent"].includes(option)) {
    style = "unit";
  } else {
    style = "";
  }

  const newStyle: string = style;
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  };
  return number ? new Intl.NumberFormat("ru-RU", option2).format(number) : "0";
}

export function convertBytes(bytes: number) {
  const sizes = [
    "measure.network.byte",
    "measure.network.kb",
    "measure.network.mb",
    "measure.network.gb",
    "measure.network.tb",
  ];

  if (bytes === 0) return `0 ${t("measure.network.byte")}`;

  const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));

  return (
    Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + t(sizes[i])
  );
}

export function getPercentage(value: number, total: number): string | number {
  const percentage = (value / total) * 100;
  return percentage.toFixed(1);
}

export function getTimeText(minutes: number) {
  const { t } = useI18n();
  if (minutes < 60) {
    return t("measure.date.minutes", { count: minutes });
  } else if (minutes < 3600) {
    return t("measure.date.hours", { count: Math.floor(minutes / 60) });
  } else {
    return t("measure.date.days", { count: Math.floor(minutes / 3600) });
  }
}

export function formatPhoneNumber(number: string) {
  const format = number
    ?.replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  return `+${format && format[1] ? format[1] : ""} ${
    format && format[2] ? format[2] : ""
  } ${format && format[3] ? format[3] : ""} ${
    format && format[4] ? format[4] : ""
  } ${format && format[5] ? format[5] : ""}`;
}
