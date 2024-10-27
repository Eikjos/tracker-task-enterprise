<script setup lang="ts">
import {} from "radix-vue";
import { findAllCustomer } from "~/api/customer";
import CreateCustomerModal from "~/components/templates/CreateCutomerModal.vue";
import CustomerCard from "~/components/templates/CustomerCard.vue";
import { Button } from "~/components/ui/button";

definePageMeta({
  middleware: ["enterprise"],
});
const { data, isLoading, refetch } = useQuery({
  queryKey: ["customer"],
  queryFn: findAllCustomer,
});
const open = ref(false);
const openModal = () => {
  open.value = true;
};

const customerCreateSuccess = () => {
  const { $queryClient } = useNuxtApp();
  $queryClient.invalidateQueries({ queryKey: ["customer"] });
  refetch();
};
</script>

<template>
  <div>
    <h1 class="text-3xl mb-2 pl-5">Mes clients</h1>
    <hr />
    <div class="flex flex-row justify-end mt-3">
      <Button @click="openModal">Ajouter +</Button>
    </div>
    <CreateCustomerModal v-model:open="open" @success="customerCreateSuccess" />
    <div v-if="isLoading">
      <p>Chargement...</p>
    </div>
    <div
      v-else-if="data?.length === 0"
      class="h-[calc(100vh-300px)] w-full flex flex-row justify-center items-center"
    >
      <p>Vous n'avez pas encore de client.</p>
    </div>
    <div v-else>
      <div class="w-full h-10" />
      <CustomerCard
        v-for="customer in data"
        :key="customer.id"
        :customer="customer"
        @delete="customerCreateSuccess"
      />
    </div>
  </div>
</template>
