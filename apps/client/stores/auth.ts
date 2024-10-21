import type { UserData } from "@repo/models";
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
  actions: {
    setUser(userData: UserData | undefined) {
      this.user = userData;
    },
    setAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});
