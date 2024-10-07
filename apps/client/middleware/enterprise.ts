export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    const store = useAuthStore();
    if (store.refreshToken !== undefined) {
      const refresh = useRefreshSession();
      refresh.mutate(
        { refreshToken: store.refreshToken },
        {
          onError: () => {
            navigateTo("/not-found");
          },
          onSuccess(data) {
            if (data.user.isCustomer) {
              return navigateTo("/not-found");
            }
            if (!data.user.isEnterprise || data.user.enterprise === null) {
              return navigateTo("/enterprise/create");
            }
          },
        }
      );
    } else {
      return navigateTo("/login");
    }
  }
});
