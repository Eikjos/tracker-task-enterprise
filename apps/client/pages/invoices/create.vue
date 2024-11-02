<script setup lang="ts">
import {} from "radix-vue";
import { Button } from "~/components/ui/button";

definePageMeta({
  middleware: ["enterprise"],
});
const open = ref(false);
const openModal = () => {
  open.value = true;
};
</script>

<template>
  <div>
    <h1 class="text-3xl mb-2 pl-5">Mes factures</h1>
    <hr />
    <div class="flex flex-row justify-end mt-3">
      <Button @click="openModal">Ajouter +</Button>
    </div>
  </div>
</template>
