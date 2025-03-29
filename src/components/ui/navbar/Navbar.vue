<template>
  <nav class="flex items-center gap-1">
    <img src="/logo/logo.svg" alt="Wimflame Logo" width="48" height="48" />
    <h1 class="font">Wimflame</h1>
    <ThemeSwitcher class="ms-auto" />
  </nav>
</template>

<script setup lang="ts">
import ThemeSwitcher from "@/components/ui/setting/ThemeSwitcher.vue";
</script>

<style scoped></style>
