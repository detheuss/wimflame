<template>
  <button
    class="relative flex aspect-square h-full w-full max-w-[300px] items-center justify-center"
    @click="handleSessionStarted"
  >
    <img
      src="/icons/breather-hex.svg"
      alt="Breather Image"
      class="breather absolute aspect-square h-[60%]"
      :style="{ animationDuration: breathTime + 's' }"
    />
    <img
      src="/icons/breather-aura.svg"
      alt="Breather Image"
      class="breather-aura aspect-square h-[90%]"
      :style="{ animationDuration: breathTime + 's' }"
    />
    <div class="absolute">
      <p class="text-xl" v-if="!hasSessionStarted">{{ startCta }}</p>
    </div>
  </button>
</template>

<script setup lang="ts">
import useBreathingSession from "@/composables/useBreathingSession";
import { useAudio } from "@/composables/useAudio";

const { currentPhase, settings } = useBreathingSession();
const { initiateAudioContext } = useAudio();
const { playSound } = useAudio();

const handleSessionStarted = () => {
  initiateAudioContext();
  playSound(settings.audio.soundId, true);

  currentPhase.value = settings.breathing.pauseBeforeFirstRound
    ? "preparation"
    : "breathing";
};

defineProps({
  breathTime: {
    type: Number,
    default: 3.5,
  },
  hasSessionStarted: {
    type: Boolean,
    default: false,
  },
  startCta: {
    type: String,
    default: "Start",
  },
});
</script>

<style scoped lang="scss">
@use "../components/ui/breather/styles.scss";
</style>
