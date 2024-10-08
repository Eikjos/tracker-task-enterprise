<template>
  <nav
    class="w-[250px] ml-3 mr-5 mt-5 px-2 py-5 rounded-xl shadow-md shadow-input bg-background border-t-[1px] border-r-[1px] border-input dark:border-slate-700"
  >
    <h3 class="text-center text-xl font-semibold text-foreground">
      Proxiad Axe Seine
    </h3>
    <ul class="my-5 px-2">
      <MenuLink name="Mon entreprise" url="#" />
      <MenuLink name="Ma comptabilité" url="#" />
      <MenuLink name="Mes clients" url="#" />
      <MenuLink name="Mes factures" url="#" />
      <MenuLink name="Mes tâches" url="#" />
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

<script setup lang="ts">
import MenuLink from "~/components/ui/menu-link/MenuLink.vue";
import { useLogout } from "~/composables/useAuthMutations";

const logout = useLogout();

const onClickLogout = () => {
  console.log("coucou");
  console.log("hello");
  logout.mutate(undefined, {
    onSuccess: () => {
      navigateTo("/login");
    },
  });
};
</script>
