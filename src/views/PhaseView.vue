<template>
  <div class="flex h-full w-full flex-col">
    <div
      class="my-auto flex h-full flex-1 flex-col items-center justify-center"
    >
      <slot />
    </div>
    <div class="mt-12 text-center">
      <h1 class="color-primary text-3xl font-black">{{ message }}</h1>
    </div>

    <div class="h-[136px]"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped></style>
