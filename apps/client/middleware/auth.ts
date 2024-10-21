import type { UserInformationData } from "@repo/models";

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    const store = useAuthStore();
    if (store.refreshToken) {
      const { data, error } = await useFetch<UserInformationData>(
        process.env.BASE_URL + "/api/users/@me",
        {
          method: "POST",
          body: { refreshToken: store.refreshToken },
        }
      );

      if (error.value || !data.value?.user) {
        return navigateTo("/login");
      }
      store.setUser(data.value.user);
      useCookie("token").value = data.value.token;
      useCookie("refreshToken").value = data.value.refreshToken;
    } else {
      return navigateTo("/login");
    }
  }
});
