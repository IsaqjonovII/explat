import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { authApi } from "../api/authApi";
import { IAuthTokens, ILoginCredentials } from "@/types/auth";
import { setCookie, getCookie, deleteCookie } from "@/services/cookies";
import { useCustomToast } from "@/composables/useCustomToast";

const AUTH_KEYS = {
  all: ["auth"] as const,
  tokens: () => [...AUTH_KEYS.all, "tokens"] as const,
  user: () => [...AUTH_KEYS.all, "user"] as const,
};

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useCustomToast();

  // Get tokens from cookies
  const getTokens = (): IAuthTokens | null => {
    const access = getCookie("__access_token");
    const refresh = getCookie("__refresh_token");

    if (access && refresh) {
      return { access, refresh };
    }
    return null;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const tokens = getTokens();
    return !!(tokens?.access && tokens?.refresh);
  };

  // Get current user profile
  const userQuery = useQuery({
    queryKey: AUTH_KEYS.user(),
    queryFn: () => authApi.getCurrentUser(),
    enabled: isAuthenticated(),
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: ILoginCredentials) => authApi.login(credentials),
    onSuccess: (tokens: IAuthTokens) => {
      // Store tokens in cookies
      setCookie("__access_token", tokens.access);
      setCookie("__refresh_token", tokens.refresh);

      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.user() });

      showToast("Successfully logged in", "success");
      router.push({ name: "Dashboard" });
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      showToast("Login failed. Please check your credentials.", "error");
    },
  });

  // Refresh token mutation
  const refreshTokenMutation = useMutation({
    mutationFn: (refreshToken: string) => authApi.refreshToken(refreshToken),
    onSuccess: (tokens: IAuthTokens) => {
      setCookie("__access_token", tokens.access);
      setCookie("__refresh_token", tokens.refresh);
    },
    onError: () => {
      // If refresh fails, logout user
      logout();
    },
  });

  // Logout function
  const logout = () => {
    // Clear tokens from cookies
    deleteCookie("__access_token");
    deleteCookie("__refresh_token");
    deleteCookie("__user");

    // Clear all queries
    queryClient.clear();

    // Redirect to auth page
    router.push({ name: "Auth" });
  };

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      logout();
    },
  });

  return {
    // State
    isAuthenticated,

    // User data
    user: () => userQuery.data.value,
    userLoading: () => userQuery.isLoading.value,
    userError: () => userQuery.error.value,

    // Mutations
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    refreshToken: refreshTokenMutation.mutate,

    // Loading states
    isLoggingIn: () => loginMutation.isPending.value,
    isLoggingOut: () => logoutMutation.isPending.value,

    // Error states
    loginError: () => loginMutation.error.value,
    logoutError: () => logoutMutation.error.value,
  };
};
