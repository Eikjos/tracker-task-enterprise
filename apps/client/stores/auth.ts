import { defineStore } from 'pinia';
import type { UserInformation } from '~/types/auth';

export const useAuthStore = defineStore("auth", {
  state: (): UserInformation => ({
    user: undefined,
    token: useCookie('token').value ?? undefined,
    refreshToken: useCookie('refreshToken').value ?? undefined,
    isLoading: false,
    isAuthenticated: false,
  }),
  actions: {    
    logout() {
      this.token = undefined;
      this.refreshToken = undefined;
      this.user = undefined;
      useCookie('token').value = null;
      useCookie('refreshToken').value = null;
      this.isAuthenticated = false;
    },
  },
});
