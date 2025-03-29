<template>
  <div class="flex h-full w-full flex-col">
    <div
      class="my-auto flex h-full flex-1 flex-col items-center justify-center"
    >
      <slot />
    </div>
    <div
      class="relative mt-12 flex flex-col items-center justify-center text-center"
    >
      <h1 class="color-primary text-3xl font-black">{{ message }}</h1>
      <p class="absolute top-12 text-sm text-secondary-foreground">
        Tap anywhere to skip to next phase.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped></style>
