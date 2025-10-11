import { apiService } from "@/services/api";
import { IAuthTokens, ILoginCredentials, IAuthUser } from "@/types/auth";

export const authApi = {
  login: async (credentials: ILoginCredentials): Promise<IAuthTokens> => {
    return apiService.$post<IAuthTokens>("/auth/token/", credentials);
  },

  refreshToken: async (refreshToken: string): Promise<IAuthTokens> => {
    return apiService.$post<IAuthTokens>("/auth/token/refresh/", {
      refresh: refreshToken,
    });
  },

  logout: async (): Promise<void> => {
    return apiService.$post<void>("/auth/logout/");
  },

  getCurrentUser: async (): Promise<IAuthUser> => {
    return apiService.$get<IAuthUser>("/users/current/");
  },
};
