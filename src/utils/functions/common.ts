import dayjs from "dayjs";
import { getActivePinia, Pinia, Store } from "pinia";
import { useI18n } from "vue-i18n";

import { IAuthUser } from "@/types/auth";
import { EImageSize, TImages } from "@/types/common";

const timeouts: { [key: string]: unknown } = {};

const cTimeout = (key = "key") => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key]);
    timeouts[key] = undefined;
  }
};

export const debounce = (key = "key", fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: () => void, timeout: number) => {
    cTimeout(key);

    timeouts[key] = setTimeout(() => {
      try {
        fn();
      } catch (e) {
        console.log(e);
      }

      timeouts[key] = undefined;
    }, timeout);
  };

  return sTimeout(key, fn, timeout);
};

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function formatPhoneNumber(number: string | undefined) {
  const { t } = useI18n();
  if (!number) return t("undefined");
  const format = number
    ?.replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  return `+${format && format[1] ? format[1] : ""} ${
    format && format[2] ? format[2] : ""
  } ${format && format[3] ? format[3] : ""}-${
    format && format[4] ? format[4] : ""
  }-${format && format[5] ? format[5] : ""}`;
}

export function formatSmallPhoneNumber(number: string | undefined) {
  const format = number
    ?.replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  return `${format && format[1] ? format[1] : ""} ${
    format && format[2] ? format[2] : ""
  } ${format && format[3] ? format[3] : ""} ${
    format && format[4] ? format[4] : ""
  }`;
}

export function getActualRate(rate: number): number {
  const period = rate % 1;
  if (period === 0.5) {
    return rate;
  } else if (period < 0.5 && period > 0) {
    return rate - period + 0.5;
  } else if (period > 0.5) {
    return rate - period + 1;
  } else {
    return rate;
  }
}

export function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime(); // Timestamp
  let d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; // Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; // random number between 0 and 16
    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function generateFingerprint() {
  let visitorId = window.localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = generateUUID();
    window.localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
}

export const moneyMask = {
  mask: [
    "D",
    "D#",
    "D##",
    "D ###",
    "D# ###",
    "D## ###",
    "D ### ###",
    "D# ### ###",
    "D## ### ###",
    "D ### ### ###",
  ],
  tokens: {
    D: {
      pattern: /[1-9]/,
    },
  },
};

export function convertToEmbed(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  } else {
    return "error";
  }
}

export function formatDateTime(date: string | Date) {
  return dayjs(date).format("DD.MM.YYYY, HH:mm");
}

export function getFullName(user?: IAuthUser): string {
  const { t } = useI18n();
  return !user?.first_name && !user?.last_name
    ? t("undefined")
    : `${user?.first_name || ""} ${user?.last_name || ""}`;
}

export function getUserAvatar(user: IAuthUser) {
  return user?.avatar?.[EImageSize.SMALL] || "/svg/default_user.svg";
}

export function getCompanyImage(image: TImages) {
  return (
    image?.[EImageSize.SMALL] ||
    image?.[EImageSize.ORIGINAL] ||
    "/svg/buildings_fill.svg"
  );
}

export function generateQuery(
  data: Record<string, string | number | boolean>,
  exception: string[] = []
): string {
  let query = "";
  for (const key in data) {
    if (!exception.includes(key) && data[key]) {
      query += `${query.length > 1 ? "&" : "?"}${key}=${data[key]}`;
    }
  }
  return query;
}

interface ExtendedPinia extends Pinia {
  _s: Map<string, Store>;
}

export const $ResetPinia = (): Record<string | "all", () => void> => {
  const pinia = getActivePinia() as ExtendedPinia;

  if (!pinia) {
    throw new Error("There is no stores");
  }

  const resetStores: Record<string, () => void> = {};

  pinia._s.forEach((store, name) => {
    resetStores[name] = () => store.$reset();
  });

  resetStores.all = () => pinia._s.forEach((store) => store.$reset());
  return resetStores;
};

export function convertMBtoB(mb: number) {
  return mb * 1024 * 1024;
}

export function checkURLType(url: string) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "mkv"];

  const fileExtension = url?.split(".")?.pop()?.toLowerCase() as string;

  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else {
    return "unknown";
  }
}

export function checkPhoneNumber(value?: string) {
  const validPrefixes = [
    "20",
    "33",
    "55",
    "50",
    "70",
    "71",
    "75",
    "77",
    "78",
    "88",
    "90",
    "91",
    "93",
    "94",
    "95",
    "97",
    "98",
    "99",
  ];
  return validPrefixes.some((prefix) => value?.startsWith(prefix));
}

export function getCookie(key?: string) {
  const regex = new RegExp(`(?:^|;\\s*)${key}\\s*=\\s*([^;]*)`);
  const match = document.cookie.match(regex);
  return match ? match[1] : undefined;
}

export function setCookie(key?: string, value?: string) {
  document.cookie = `${key}=${value};`;
}
