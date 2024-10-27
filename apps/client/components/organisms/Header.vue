<script setup lang="ts">
const { user } = useAuthStore();
</script>

<template>
  <header
    class="mb-5 flex flex-row justify-between items-center w-screen border-b-2 border-input dark:border-slate-700 px-10 gap-2 bg-background dark:bg-slate-900 py-5"
  >
    <img src="/img/png/logo.png" class="h-[25px] object-contain" />
    <ClientOnly>
      <div class="flex flex-row items-center gap-4">
        <span
          class="w-8 h-8 text-center leading-8 bg-primary rounded-full text-sm font-semibold text-white"
          >{{
            user
              ? user.firstName.substring(0, 1) +
                user.lastName.substring(0, 1).toUpperCase()
              : ""
          }}</span
        >
        <span>{{ user ? user?.firstName + " " + user?.lastName : "" }}</span>
      </div>
    </ClientOnly>
  </header>
</template>
