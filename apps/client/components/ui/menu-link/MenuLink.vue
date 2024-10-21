<template>
  <li class="border-b-2 border-input mb-2 pb-3">
    <NuxtLink
      :to="url"
      class="p-2 block hover:bg-accent rounded-md w-full h-full"
      active-class="bg-primary text-white"
      >{{ name }}</NuxtLink
    >
  </li>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  url: string;
}>();
</script>
