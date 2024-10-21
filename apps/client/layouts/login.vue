<script setup lang="ts">
import Footer from "~/components/organisms/Footer.vue";
</script>

<template>
  <div>
    <div class="w-screen min-h-[calc(100vh-59px)]">
      <slot />
    </div>
    <Footer />
  </div>
</template>
