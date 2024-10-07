export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    const store = useAuthStore();
    if (store.refreshToken !== undefined) {
      const refresh = useRefreshSession();
      refresh.mutate(
        { refreshToken: store.refreshToken },
        {
          onError: () => {
            return navigateTo("/login");
          },
        }
      );
    } else {
      return navigateTo("/login");
    }
  }
});
