// composables/useAuth.js
import type {
  LoginData,
  RefreshSessionData,
  UserInformationData,
} from "@repo/models";
import type { HTTPError } from "ky";
import {
  currentUser,
  login as loginAPI,
  logout as logoutAPI,
} from "~/api/auth";
import { useAuthStore } from "~/stores/auth";

export function useLogin() {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (values: LoginData) => loginAPI(values.email, values.password),
    onSuccess: (data: UserInformationData) => {
      authStore.token = data.token;
      authStore.refreshToken = data.refreshToken;
      authStore.user = data.user;
      authStore.isAuthenticated = true;

      // Gérer les cookies
      authStore.setUser(data.user);
      useCookie("token").value = data.token;
      useCookie("refreshToken").value = data.refreshToken;
    },
    onError: (e: HTTPError) => {
      console.error(e);
    },
  });
}

export function useRefreshSession() {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (data: RefreshSessionData) => currentUser(data.refreshToken),
    onSuccess: (data: UserInformationData) => {
      authStore.user = data.user;
      authStore.token = data.token;
      authStore.refreshToken = data.refreshToken;
      authStore.isAuthenticated = true;
      useCookie("token").value = data.token;
      useCookie("refreshToken").value = data.refreshToken;
    },
    onError: () => {
      authStore.user = undefined;
      authStore.token = undefined;
      authStore.refreshToken = undefined;
      authStore.isAuthenticated = false;
      useCookie("token").value = null;
      useCookie("refreshToken").value = null;
    },
  });
}

export function useLogout() {
  const authStore = useAuthStore();
  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      authStore.user = undefined;
      authStore.token = undefined;
      authStore.refreshToken = undefined;
      authStore.isAuthenticated = false;
      useCookie("token").value = null;
      useCookie("refreshToken").value = null;
    },
  });
}
