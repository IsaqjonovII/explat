import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { deleteCookie, getCookie, setCookie } from "./cookies";
import { useCustomToast } from "@/composables/useCustomToast";
import i18n from "@/plugins/i18n";
import QueryClientService from "./query-client";

// Extend AxiosRequestConfig to include _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Define error response type
interface ErrorResponse {
  errors: Array<{
    error: {
      message: string;
    };
  }>;
}

const t = i18n.global.t;

export class ApiSetupService {
  protected axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor(apiUrl?: string) {
    const baseURL =
      apiUrl ||
      (import.meta.env["VITE_APP_BASE_URL"] as string) ||
      "https://api.explat.glob.uz/ru/api/v1";

    this.axiosInstance = axios.create({
      baseURL,
    });

    this.setupInterceptors();
  }

  public deleteCredentials() {
    deleteCookie("__access_token");
    deleteCookie("__refresh_token");
    deleteCookie("__user");

    // Clear all queries when logging out
    QueryClientService.getInstance().clearQueries();
  }

  private subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  private async refreshToken(): Promise<string> {
    const refreshToken = getCookie("__refresh_token");
    if (!refreshToken) throw new Error("No refresh token");

    const response = await axios.post(
      "/auth/token/refresh/",
      { refresh: refreshToken },
      { baseURL: this.axiosInstance.defaults.baseURL! }
    );
    const { access, refresh } = response.data;
    setCookie("__access_token", access);
    setCookie("__refresh_token", refresh);
    return access;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getCookie("__access_token");
        const language = getCookie("locale") || "uz";

        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }
        config.headers["Accept-Language"] = language;

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          delete config.headers.Authorization;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ErrorResponse["errors"]>) => {
        const statusCode = error?.response?.status;
        console.log(statusCode, "code");
        const { showToast } = useCustomToast();

        if ([500, 502].includes(statusCode!)) {
          showToast(t("toast.serverError"), "error");
          return Promise.reject(error);
        }

        if ([401].includes(statusCode!)) {
          const originalRequest = error.config as CustomAxiosRequestConfig;
          const refreshToken = getCookie("__refresh_token");

          if (refreshToken && originalRequest && !originalRequest._retry) {
            if (this.isRefreshing) {
              return new Promise((resolve) => {
                this.subscribeTokenRefresh((token: string) => {
                  if (!originalRequest.headers)
                    originalRequest.headers = new AxiosHeaders();
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  originalRequest._retry = true;
                  resolve(this.axiosInstance.request(originalRequest));
                });
              });
            }

            this.isRefreshing = true;
            originalRequest._retry = true;

            try {
              const newAccessToken = await this.refreshToken();
              this.onRefreshed(newAccessToken);
              if (!originalRequest.headers)
                originalRequest.headers = new AxiosHeaders();
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return this.axiosInstance.request(originalRequest);
            } catch (refreshError) {
              this.deleteCredentials();
              return Promise.reject(refreshError);
            } finally {
              this.isRefreshing = false;
            }
          }
          this.deleteCredentials();

          return Promise.reject(error);
        }

        error.response?.data?.forEach(
          (err: { error?: { message?: string } }) => {
            showToast(
              err?.error?.message || t("toast.somethingWrong"),
              "error"
            );
          }
        );

        return Promise.reject(error);
      }
    );
  }
}
