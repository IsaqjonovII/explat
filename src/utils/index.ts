import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useI18n } from "vue-i18n";
import type { LocationQueryRaw, LocationQueryValue } from "vue-router";
import i18n from "@/plugins/i18n";
import router from "@/router";
import { User } from "@/types/auth";
import { DATE_FORMAT } from "@/data";

export * from "@/utils/browser";
export * from "@/utils/mask";
export * from "@/utils/time";
export * from "@/utils/validations";
export * from "@/utils/functions/common";

const t = i18n.global.t;

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatNumbers(number?: number, fix = 0, option = "decimal") {
  if (!number) {
    return 0;
  }

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

export async function updateQueryParams(
  key: string,
  value: string | undefined | LocationQueryValue[]
) {
  const route = router.currentRoute.value;
  const queryParams: LocationQueryRaw = { ...route.query };
  if (queryParams[key]) {
    queryParams[key] = value;
  } else {
    queryParams[key] = value;
  }
  await router.replace({ name: route.name || "Dashboard", query: queryParams });
}

export function convertBytes(bytes?: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (!bytes) return "0 Byte";

  const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
}

export function getPercentage(
  value: number,
  total: number,
  fixed = 1
): string | number {
  if (total > 0) {
    const percentage = (value / total) * 100;
    return percentage.toFixed(fixed);
  } else return 0;
}

export function isValidSlug(slug: string) {
  // Define a regular expression for a valid slug
  const slugRegex = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;

  // Test the input slug against the regular expression
  return slugRegex.test(slug);
}

export function getTimeText(minutes: number) {
  const { t } = useI18n();
  if (minutes < 60) {
    return t("minutes", { count: minutes });
  } else if (minutes < 3600) {
    return t("hours", { count: Math.floor(minutes / 60) });
  } else {
    return t("days", { count: Math.floor(minutes / 3600) });
  }
}

export const validatePhoneNumber = (value: string) => {
  const regex =
    /^\+998([- ])?(90|91|93|94|95|98|99|88|33|97|71|77|78|70)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/;

  return regex.test(value);
};

export const formatDate = (date?: string | null, format?: string) => {
  if (!date) return "-";
  return dayjs(date || new Date())
    .utc()
    .format(format || DATE_FORMAT);
};

export function formatDateWithTime(date) {
  return dayjs(date).format("D.M.YYYY, HH:mm");
}

export const calcDaysFromToday = (date: string) => {
  const today = dayjs();
  const targetDate = dayjs(date);

  if (targetDate.isBefore(today)) {
    return "";
  }

  return targetDate.diff(today, "days");
};

export const calcDaysTillToday = (date: string) => {
  const today = dayjs();
  const targetDate = dayjs(date);

  if (targetDate.isAfter(today)) {
    return "";
  }

  return today.diff(targetDate, "days");
};

export function calculateRemainingDate(
  insuredDate: string,
  need?: "days" | "all"
) {
  const today = dayjs();
  const targetDate = dayjs(insuredDate);

  if (targetDate.isBefore(today)) {
    return t("date.expired");
  }

  const yearsLeft = targetDate.diff(today, "year");
  const monthsLeft = targetDate.diff(
    need === "days" ? today : today.add(yearsLeft, "year"),
    "month"
  );
  const daysLeft = targetDate.diff(
    need === "days"
      ? today
      : today.add(yearsLeft, "year").add(monthsLeft, "month"),
    "day"
  );

  if (need !== "days") {
    const years = yearsLeft ? t("date.years", { years: yearsLeft }) : "";
    const months = monthsLeft ? t("date.months", { months: monthsLeft }) : "";
    const days = daysLeft ? t("date.days", { days: daysLeft }) : "";

    return t("date.left", {
      date: `${years} ${months} ${days}`,
    });
  } else {
    return t("date.days_left", { days: daysLeft });
  }
}

export function calculateElapsedDate(
  insuredDate: string,
  need?: "days" | "all"
) {
  const today = dayjs();
  const targetDate = dayjs(insuredDate);

  if (targetDate.isAfter(today)) {
    return t("date.not_started");
  }

  const yearsElapsed = today.diff(targetDate, "year");
  const monthsElapsed = today.diff(
    need === "days" ? targetDate : targetDate.add(yearsElapsed, "year"),
    "month"
  );
  const daysElapsed = today.diff(
    need === "days"
      ? targetDate
      : targetDate.add(yearsElapsed, "year").add(monthsElapsed, "month"),
    "day"
  );

  if (need !== "days") {
    const years = yearsElapsed ? t("date.years", { years: yearsElapsed }) : "";
    const months = monthsElapsed
      ? t("date.months", { months: monthsElapsed })
      : "";
    const days = daysElapsed ? t("date.days", { days: daysElapsed }) : "";

    return t("date.elapsed", {
      date: `${years} ${months} ${days}`,
    });
  } else {
    return t("date.days_elapsed", { days: daysElapsed });
  }
}

export const getFullName = <T = User>(user: T & Partial<User>) =>
  user?.first_name && user?.last_name
    ? `${user?.first_name} ${user?.last_name}`
    : "-";

export const getOnlyUpdatedFields = function <T>(
  oldFields: T,
  updatedFields: T
) {
  let result = {};
  for (const x in updatedFields) {
    if (oldFields[x] !== updatedFields[x]) {
      result = { ...result, [x]: updatedFields[x] };
    }
  }
  return result;
};

export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export async function downloadFile(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the object URL
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Ошибка при скачивании PDF:", error);
  }
}

// Legacy functions for compatibility
export function formatMoneyDecimal(
  number: number,
  fix = 0,
  option = "decimal"
) {
  return formatNumbers(number, fix, option);
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
