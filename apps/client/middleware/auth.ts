export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  if (import.meta.server) {
    const store = useAuthStore();
    const refresh = useRefreshSession();
    if (store.refreshToken !== undefined) {
      refresh.mutate({ refreshToken : store.refreshToken}, {
        onError: () => {
          return nuxtApp.$router.replace('/login');
        },
      })
    } else {
      return nuxtApp.$router.replace('/login')
    }
  }
});