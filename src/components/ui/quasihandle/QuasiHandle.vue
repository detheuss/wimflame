<script setup lang="ts">
/**
 * THIS DIDN'T WORK!
 * 
 * Workaround for shadcn-vue broken Drawer component:
 * 'handleOnly' should allow closing the drawer by pulling down
 * the handle, but setting it to true disables closing this way.
 * 'QuasiHandle' component temporarily sets 'handleOnly' to true when touched,
 * allowing pulling down to close, then reverts it to true.
 */

const emit = defineEmits<{
  touchChange: [value: boolean];
}>();
</script>

<template>
  <div
    class="pointer-events-auto absolute top-0 h-[5%] w-full border-2 border-red-500"
    @touchstart="emit('touchChange', false)"
    @touchcancel="emit('touchChange', false)"
    @touchend="emit('touchChange', false)"
  />
</template>
