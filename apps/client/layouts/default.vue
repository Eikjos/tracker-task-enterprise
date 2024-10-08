<script setup lang="ts">
import Footer from "~/components/organisms/Footer.vue";
import Header from "~/components/organisms/Header.vue";
import Menu from "~/components/organisms/Menu.vue";
</script>

<template>
  <div>
    <div class="w-screen min-h-[calc(100vh-96px)]">
      <Header />
      <div class="flex flew-row">
        <Menu />
        <slot />
      </div>
    </div>
    <Footer class="mt-10" />
  </div>
</template>
