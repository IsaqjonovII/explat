export interface IAuthTokens {
  access: string;
  refresh: string;
}

type TUserRole = "admin" | "superadmin" | "merchant" | "trader" | "unknown";

export interface IAuthUser {
  id: number;
  name: string;
  role: TUserRole;
  last_login: string;
  date_joined: string;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface IAccess {
  id: string;
}

export interface IOneId {
  one_id_url: string;
}
