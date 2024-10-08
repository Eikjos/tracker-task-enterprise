import { defineStore } from "pinia";
import type { UserInformation } from "~/types/auth";

export const useAuthStore = defineStore("auth", {
  state: (): UserInformation => ({
    user: undefined,
    token: useCookie("token").value ?? undefined,
    refreshToken: useCookie("refreshToken").value ?? undefined,
    isLoading: false,
    isAuthenticated: false,
  }),
});
