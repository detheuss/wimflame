<template>
  <a
    v-bind="$attrs"
    class="text-primary hover:opacity-80"
    target="_blank"
    rel="noopener noreferrer nofollow"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>
