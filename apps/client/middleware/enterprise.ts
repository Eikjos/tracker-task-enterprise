import type { UserInformationData } from "@repo/models";

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    const store = useAuthStore();
    if (!store.refreshToken) {
      return navigateTo("/login");
    }
    const { data, error } = await useFetch<UserInformationData>(
      process.env.BASE_URL + "/api/users/@me",
      {
        method: "POST",
        body: { refreshToken: store.refreshToken },
      }
    );

    if (error.value || !data.value?.user) {
      console.error("coucou", error.value?.message);
      return navigateTo("/no");
    }
    store.setUser(data.value.user);
    useCookie("token").value = data.value.token;
    useCookie("refreshToken").value = data.value.refreshToken;
    // Vérifier les conditions et rediriger en fonction des résultats
    if (data.value.user.isCustomer) {
      return navigateTo("/not-found");
    }
    if (!data.value.user.isEnterprise || data.value.user.enterprise === null) {
      return navigateTo("/enterprise/create");
    }
  }
});
