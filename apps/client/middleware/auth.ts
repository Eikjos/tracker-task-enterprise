export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();
  if (import.meta.server) {
    const store = useAuthStore();
    if (store.refreshToken !== undefined) {
      const refresh = useRefreshSession();
      refresh.mutate(
        { refreshToken: store.refreshToken },
        {
          onError: () => {
            return nuxtApp.$router.replace("/login");
          },
        }
      );
    } else {
      return nuxtApp.$router.replace("/login");
    }
  }
});
