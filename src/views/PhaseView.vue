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
      <p
        class="absolute top-12 text-sm text-secondary-foreground"
        :style="{ animationDuration: breathingSpeedSec + 's' }"
      >
        Tap anywhere to skip to next phase.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  stopAllConstrainedSpeechAndSound,
  useAudio,
} from "@/composables/useAudio";
import useBreathingSession from "@/composables/useBreathingSession";
import { computed, onBeforeMount, onBeforeUnmount } from "vue";

defineProps<{
  message: string;
}>();

const { settings } = useBreathingSession();
const { clearGuidanceAudioQuery, playSound } = useAudio();

const breathingSpeedSec = computed(() => {
  return settings.breathing?.breathingSpeed
    ? settings.breathing.breathingSpeed / 10
    : 0;
});

onBeforeMount(() => {
  clearGuidanceAudioQuery();
  stopAllConstrainedSpeechAndSound();
});

onBeforeUnmount(() => {
  playSound(settings.audio.soundId, true);
  clearGuidanceAudioQuery();
  stopAllConstrainedSpeechAndSound();
});
</script>

<style scoped lang="scss">
@use "../components/ui/nexter/styles.scss";
</style>
