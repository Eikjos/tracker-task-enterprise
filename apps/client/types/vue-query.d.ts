import { QueryClient } from 'vue-query';

declare module '#app' {
  interface NuxtApp {
    $queryClient: QueryClient;
  }
}
