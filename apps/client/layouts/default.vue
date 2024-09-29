<script setup lang="ts">
import Footer from "~/components/organisms/Footer.vue";
import Header from "~/components/organisms/Header.vue";
import Menu from "~/components/organisms/Menu.vue";
</script>

<template>
    <div class="w-screen min-h-[calc(100vh-59px)]">
      <Header />
      <div class="flex flew-row">
        <Menu />
        <slot />
      </div>
    </div>
    <Footer />
</template>