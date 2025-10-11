import i18n from "@/plugins/i18n";
import { CommonFile } from "@/types/common";

const t = i18n.global.t;

// todo: translate(use Date(js built-in) to get month names)
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DATE_FORMAT_WITH_TIME = "DD.MM.YYYY, HH:mm";
export const DATE_FORMAT_ONLY_TIME = "HH:mm";
export const DATE_FORMAT = "DD.MM.YYYY";
export const DATE_BACKEND_FORMAT = "YYYY-MM-DD";

export const fileTypes: Record<string, CommonFile["type"]> = {
  "application/pdf": "document",
  ".docx": "document",
  ".xlsx": "document",
  ".jpg": "image",
  ".png": "image",
  ".gif": "image",
  ".jpeg": "image",
  ".mp4": "video",
  ".webm": "video",
  ".mp3": "audio",
  ".wav": "audio",
};
