<script setup lang="ts">
import MenuLink from "~/components/ui/menu-link/MenuLink.vue";
import { useLogout } from "~/composables/useAuthMutations";

const { user } = useAuthStore();
const logout = useLogout();

const onClickLogout = () => {
  logout.mutate(undefined, {
    onSuccess: () => {
      navigateTo("/login");
    },
  });
};
</script>

<template>
  <nav
    class="w-[250px] ml-3 mr-5 mt-5 px-2 py-5 rounded-xl shadow-md shadow-input bg-background border-t-[1px] border-r-[1px] border-input dark:border-slate-700"
  >
    <h3 class="text-center text-xl font-semibold text-foreground">
      {{ user?.enterprise?.name }}
    </h3>
    <ul class="my-5 px-2">
      <MenuLink name="Mon entreprise" url="enterprise" />
      <MenuLink name="Ma comptabilité" url="comptability" />
      <MenuLink name="Mes clients" url="customers" />
      <MenuLink name="Mes factures" url="orders" />
      <MenuLink name="Mes tâches" url="tasks" />
      <Button
        class="mx-auto w-full mt-5"
        variant="outline"
        @click="onClickLogout"
      >
        Me déconnecter
      </Button>
    </ul>
  </nav>
</template>
