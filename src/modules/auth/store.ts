import { defineStore } from "pinia";

import { useApi } from "@/composables/useApi";
import type { IAuthTokens, IAuthUser } from "@/types/auth";
import type { IFetchOptions } from "@/types/common";

// import { $ResetPinia } from "@/utils/functions/common";

interface IState {
  tokens: {
    access?: string;
    refresh?: string;
  };
  user?: IAuthUser;
  preloader: boolean;
  oneId?: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): IState => ({
    tokens: {},
    user: {
      id: "94532",
      full_name: "Almamedov Khakim",
      role: "trader",
    },
    preloader: false,
    oneId: null,
  }),
  getters: {
    isAuthenticated: (state) =>
      !!state.tokens?.access || !!state.tokens?.refresh,
    getTokens: (state) => state.tokens,
    hasUser: (state) => Object.keys(state.user || {}).length > 0,
    authUser: (state) => state.user,
    userRole: (state) => state.user?.role || "",
    isAdmin: (state) => state.user?.role === "admin",
    isUser: (state) => state.user?.role === "user",
    isManager: (state) => state.user?.role === "manager",
  },
  actions: {
    initTokens() {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");
      if (access) this.tokens.access = access;
      if (refresh) this.tokens.refresh = refresh;
    },
    refreshToken() {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<Pick<IAuthTokens, "access">>("/auth/token/refresh/", {
            refresh: this.getTokens?.refresh,
          })
          .then((data) => {
            this.setTokens(data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout() {
      // $ResetPinia().all();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // return router.push({ name: "Tests" });
    },
    setTokens(tokens: Partial<IAuthTokens>) {
      if (tokens?.access) {
        this.tokens.access = tokens.access;
        localStorage.setItem("access_token", tokens.access);
      }
      if (tokens?.refresh) {
        this.tokens.refresh = tokens.refresh;
        localStorage.setItem("refresh_token", tokens.refresh);
      }
    },
    getProfile(options?: Pick<IFetchOptions, "force">) {
      return new Promise((resolve, reject) => {
        if (!options?.force && this.hasUser) {
          resolve(this.user);
          return;
        }
        useApi()
          .$get<IAuthUser>("/auth/profile/")
          .then((data) => {
            this.user = data;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    fetchOneId() {
      return new Promise<string>((resolve, reject) => {
        useApi()
          .$get<{ one_id_url: string }>("/auth/oneid/")
          .then((data) => {
            this.oneId = data.one_id_url;
            resolve(this.oneId);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    hasAccessToken() {
      const authToken = localStorage.getItem("access_token");
      return !!authToken; // Convert the value to a boolean
    },
  },
});
