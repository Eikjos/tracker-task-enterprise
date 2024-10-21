<script setup lang="ts">
import Footer from "~/components/organisms/Footer.vue";
import Header from "~/components/organisms/Header.vue";
</script>

<template>
  <div>
    <div class="w-screen min-h-[calc(100vh-59px)]">
      <Header />
      <slot />
    </div>
    <Footer />
  </div>
</template>
