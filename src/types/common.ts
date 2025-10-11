import { TableProps } from "@/types/components/props";

export type TClassName =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[];

export interface PaginationData {
  offset: number;
  limit: number;
  total: number;
  next: string | null;
}

export interface IDefaultResponse<T = unknown> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface IMedia {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface IUserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  avatar: TImages;
  phone: string;
}

export interface IAdminUser {
  id: string;
  first_name: string;
  last_name: string;
  pinfl: string;
  avatar: TImages;
  role: string;
  date_joined: string;
  last_login: string;
  is_online: boolean;
  last_activate: string;
  phone_number: string;
}

export interface IImage {
  id?: string;
  brand_logo?: string;
  name?: string;
  url?: Blob | string;
  file?: Blob | string;
  type?: string;
  status?: string;
}

export enum ERole {
  OWNER = 0,
  ADMIN = 1,
  MODERATOR = 2,
  OBSERVER = 3,
}

export type TRole =
  | ERole.OWNER
  | ERole.ADMIN
  | ERole.MODERATOR
  | ERole.OBSERVER;

export interface IFetchOptions {
  search?: string;
  force?: boolean;
  merge?: boolean;
  returnOnly?: boolean;
  limit: string | number;
}

export enum EImageSize {
  ORIGINAL = "original",
  SMALL = "s100x100",
  MEDIUM = "s500x500",
  LARGE = "s1000x1000",
}

export type TImages = {
  name: string;
  size: number;
} & Record<EImageSize, string>;

export interface IWorkDay {
  day: string;
  isWorkDay: boolean;
  start: string;
  end: string;
}

export interface ICustomObject<T = string> {
  [key: string]: T;
}

export enum EMediaStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  DELETED = 3,
}

export enum EStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  DELETED = 3,
}

export interface IMediaData {
  id: string;
  media: TImages;
  status: EMediaStatus;
  created_at: string;
}

export type TCDNFileType =
  | "png"
  | "jpg"
  | "jpeg"
  | "svg"
  | "webp"
  | "gif"
  | "mp4"
  | string;

export interface ICDNFile {
  id: string;
  file: string;
  type: TCDNFileType;
  file_name: string;
}

export type TStatus = 0 | 1 | 2 | 3;

export type TDescriptionKey = "uzl" | "uzc" | "ru" | "en" | "kaa";

export type TCompanyMediaSection = 0 | 1 | 2 | 3 | 4;

export enum ECompanyMediaSection {
  "office",
  "entrance",
  "exterior",
  "interior",
  "services",
}

export type Image = {
  original: string;
  s100x100: string;
  s500x500: string;
  s1000x1000: string;
};

export type ErrorResponse = {
  detail: string;
};

export type TableSettings = Omit<TableProps<string>, "data">;

// TODO: CHANGE WHILE INTERACTING WITH API
export type Pagination = {
  limit: number;
  offset: number;
  search: string;
};

export type RequestHeaders = {
  Authorization: string;
  "Accept-Language": string;
};

export type Status = "DRAFT" | "IN_PROGRESS" | "FAILED" | "SUCCESS";

export type CommonFile = {
  file: string;
  id: string;
  size: number;
  type: "image" | "video" | "audio" | "document" | "other";
  video_preview: string;
  file_type_display: string;
  size_display: string;
  file_name: string;
};

export type FileForm = {
  file: File;
  type: CommonFile["type"];
};

export type Language = {
  id: number;
  title: string;
  code: string;
  icon: string;
};

export type UserData = {
  id: number;
  full_name: string;
  avatar: string;
  phone_number: string;
};

// Mapped types
export type RequireOnly<T, K extends keyof T> = Partial<T> &
  Required<Pick<T, K>>;

export type Roles = {
  id: number;
  name: string;
  codename: string;
  created_at: string;
  permissions: Permission[];
};

export type Permission = {
  id: number;
  title: string;
  codename: string;
  created_at: string;
};
