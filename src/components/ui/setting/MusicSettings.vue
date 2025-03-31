<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <Separator label="Music" class="mb-5 mt-2" />
      <MusicTrackSelect />
    </div>
    <div>
      <Separator label="Sound effects" class="mb-5 mt-2" />
    </div>
    <div>
      <Separator label="Speech guidance" class="mb-5 mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Separator from "@/components/ui/separator/Separator.vue";
import MusicTrackSelect from "@/components/ui/setting/MusicTrackSelect.vue";
</script>

<style scoped></style>
