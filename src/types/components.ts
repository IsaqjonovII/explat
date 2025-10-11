import type { RouteLocationRaw } from "vue-router";

import type { TClassName } from "@/types/common";
import type {
  TButtonSizes,
  TButtonVariants,
} from "@/components/Base/Button/BaseButton";
import type { TSelectOption } from "@/components/Base/Form/Select/Select";

export interface ButtonProps {
  variant?: TButtonVariants;
  size?: TButtonSizes;
  loading?: boolean;
  mainClass?: TClassName;
  iconPosition?: "left" | "right";
  text?: string | number;
  icon?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  id?: string;
}

export type ButtonEmits = {
  (e: "click"): void;
};

export interface TabItem {
  label: string;
  value: string;
  icon?: string;
  iconName?: string;
  suffixText?: string | number;
  img?: string;
}

export type TabProps = {
  list: TabItem[];
  variant?: TabVariants;
} & TabVariantKeys;

export type TabVariants = "default" | "full" | "bordered";

export type CellProps = {
  className?: string;
  image?: string;
  imageClass?: string;
  title?: string;
  info?: string;
  titleClass?: string;
  infoClass?: string;
  rounded?: "full" | "default";
  wrpClass?: string;
  query?: string;
  imageSize?: "xs" | "sm" | "md" | "lg";
};

export type TableStatusColors = "green" | "gray" | "red" | "yellow" | "blue";

export interface TableHead {
  title: string;
  key: string;
  hasSort?: boolean;
  sortValue?: string;
}

export interface TableStatusIndicator {
  show: boolean;
  key: string;
  colors: {
    label: string;
    value: string | boolean | number;
    color: TableStatusColors;
  }[];
}

export interface TableProps<D> {
  activeCount?: number;
  head: TableHead[];
  hasAddButton?: {
    title: string;
    link: string;
  };
  title?: string;
  hasFilter?: boolean;
  subtitle?: string;
  searchPlaceholder?: string;
  thClass?: TClassName;
  bodyTrClass?: TClassName;
  tdClass?: TClassName;
  wrapperClass?: TClassName;
  data: D[];
  noSearch?: boolean;
  noHeader?: boolean;
  loading?: boolean;
  total?: number;
  noPagination?: boolean;
  noFooter?: boolean;
  headerClass?: TClassName;
  titleClass?: TClassName;
  subtitleClass?: TClassName;
  searchValue?: string;
  searchInputClass?: string;
  actionsClass?: string;
  hasCheckbox?: boolean;
  trigger?: boolean;
  beforeSearchClass?: TClassName;
  indicator?: TableStatusIndicator;
  noFilter?: boolean;
  noData?: {
    title: string;
    subtitle: string;
    image: string;
  };
}

export interface IRoute {
  name: string;
  route: RouteLocationRaw;
  loading?: boolean;
  target?: boolean;
}

export interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  readonly?: boolean;
  maxlength?: number | string;
  minlength?: number | string;
  max?: number | string;
  min?: number | string;
  inputClass?: string | string[];
  autocomplete?: boolean;
}

export type TabVariantKeys = {
  wrapperClass?: string;
  activeClass?: string;
  itemClass?: string;
  suffixClass?: string;
  itemActiveClass?: string;
};

export type BreadcrumbProps = {
  routes: IRoute[];
};

export type ModalProps = {
  title?: string;
  description?: string;
  wrpClass?: string;
};

export type TableFilterFieldWithApi = {
  type: "withApi";
  saveName?: string;
  api: string;
  defaultValueKey: string;
};

export type TableFilterFieldDefault = {
  type: "default";
  options: TSelectOption[];
};

export type TableFilterField =
  | TableFilterFieldWithApi
  | TableFilterFieldDefault;

export type TableFilterProps = {
  fields: (TableFilterField & {
    key: string;
    valueKey?: string;
    labelKey?: string;
    selectedOptionStyles?: string;
  })[];
};
