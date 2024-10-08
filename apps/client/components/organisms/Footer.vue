<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<template>
  <footer
    :class="`w-screen px-10 gap-2 bg-background dark:bg-slate-900 py-5 ${props.class !== null ? props.class : ''}`"
  >
    <div class="flex flex-row w-1/3 mx-auto gap-10 justify-center">
      <a class="text-xs">Conditions générales d'utilisation</a>
      <span class="text-xs">© 2024 - Freeflow</span>
    </div>
  </footer>
</template>
