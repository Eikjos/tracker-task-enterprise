import { useNuxtApp } from "#app";
import type { LoginData, RefreshSessionData } from '@repo/models';
import { defineStore } from "pinia";
import { currentUser, login as loginAPI } from "~/api/auth";
import type { UserInformation } from "~/types/auth";

export const useAuthStore = defineStore("auth", {
  state: () : UserInformation => ({
    user: undefined,
    token: undefined,
    refreshToken: undefined,
    isLoading: false,
    isAuthenticated: false
  }),
  actions: {
    async login(email: string, password: string) {
      const { $queryClient } = useNuxtApp(); 
      const mutation = useMutation({
        mutationFn: (values : LoginData) => loginAPI(values.email, values.password),
        onSuccess: (data) => {
          this.token = data.token;
          this.refreshToken = data.refreshToken;
          this.user = data.user;
          useCookie('token').value = data.token;
          useCookie('refreshToken').value = data.refreshToken;
          $queryClient.invalidateQueries('profile');
        },
        onError: (error: any) => {
          console.error("Identifiant invalide", error);
        },
      });
      mutation.mutate({email, password});
    },
    logout() {
      this.token = undefined;
      this.refreshToken = undefined;
      this.user = undefined;
      useCookie('token').value = null;
      useCookie('refreshToken').value = null;
    },
    currentUser() {
      this.isLoading = true;
      this.token = useCookie('token').value ?? undefined;
      this.refreshToken = useCookie('refreshToken').value ?? undefined;
      const mutations  = useMutation({
        mutationFn: (data : RefreshSessionData) =>currentUser(data.token, data.refreshToken),
        onSuccess: (data) => {
          this.user = data.user;
          this.token = data.token;
          useCookie('token').value = data.token;
          useCookie('refreshToken').value = data.refreshToken;
          this.refreshToken = data.refreshToken;
          this.isAuthenticated = this.user !== undefined;
          this.isLoading = false;
        },
        onError: () => {
          this.user = undefined;
          this.token = undefined;
          this.refreshToken = undefined;
          this.isLoading = false;
          useCookie('token').value = null;
          useCookie('refreshToken').value = null;
          this.isAuthenticated = this.user !== undefined;
        }
      });
      if (this.token !== undefined && this.refreshToken !== undefined) {
         mutations.mutate({token : this.token, refreshToken : this.refreshToken});
      }
    }
  },
});
