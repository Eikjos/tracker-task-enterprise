export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    const store = useAuthStore();
    if (!store.refreshToken) {
      return navigateTo("/login");
    }
  }
  if (import.meta.client) {
    const store = useAuthStore();
    const refresh = useRefreshSession();
    if (store.refreshToken !== undefined) {
      refresh.mutate(
        { refreshToken: store.refreshToken },
        {
          onError: () => {
            return navigateTo("/login");
          },
        }
      );
    }
  } else {
    return navigateTo("/login");
  }
});
