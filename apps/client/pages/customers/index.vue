<script setup lang="ts">
import { findAllCustomer } from "~/api/customer";
import CustomerCard from "~/components/templates/CustomerCard.vue";

definePageMeta({
  middleware: ["enterprise"],
});
const { data, isLoading } = useQuery({
  queryKey: ["customer"],
  queryFn: findAllCustomer,
});
</script>

<template>
  <div>
    <h1 class="text-3xl mb-2 pl-5">Mes clients</h1>
    <hr />
    <div v-if="isLoading">
      <p>Chargement...</p>
    </div>
    <div v-else>
      <div class="w-full h-10" />
      <CustomerCard
        v-for="customer in data"
        :key="customer.id"
        :customer="customer"
      />
    </div>
  </div>
</template>
