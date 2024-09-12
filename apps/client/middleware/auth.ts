export default defineNuxtRouteMiddleware(async (to, from) => {
  var store = useAuthStore();
  store.currentUser();

  if (!store.user) {
    return navigateTo('/login');
  }
});