<template>
  <div
    class="relative mx-auto flex aspect-square h-full w-full max-w-[300px] items-center justify-center"
  >
    <img
      src="/icons/breather-hex.svg"
      alt="Breather Image"
      class="breather absolute aspect-square h-[60%]"
      :style="{ animationDuration: breathingSpeedSec + 's' }"
    />
    <img
      src="/icons/breather-aura.svg"
      alt="Breather Image"
      class="breather-aura aspect-square h-[90%]"
      :style="{ animationDuration: breathingSpeedSec + 's' }"
    />
    <div v-if="!isPreview" class="absolute">
      <p class="text-xl" v-if="!isCounting">Start</p>
      <p class="text-5xl" v-else>{{ currentBreath }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useBreathingSession from "@/composables/useBreathingSession";
import { computed, defineProps, onMounted, ref } from "vue";

// setting in breathing settings must be set to 35, because decimals are bugged
const breathingSpeedSec = computed(() => {
  return settings.breathing?.breathingSpeed
    ? settings.breathing.breathingSpeed / 10
    : 0;
});

const breathingSpeedMs = computed(() => breathingSpeedSec.value * 1000);

const currentBreath = ref(1);

// Define a prop for animation duration with a default value of 3 seconds
const props = defineProps({
  isCounting: {
    type: Boolean,
    default: false,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
});

const { settings, currentPhase } = useBreathingSession();

const inhale = new Audio("/audio/sounds/inhale.mp3");
const exhale = new Audio("/audio/sounds/exhale.mp3");

const isBreathingLoopPlaying = ref();

const countBreaths = () => {
  // exit - count ended
  if (settings.breathing.breaths < currentBreath.value + 1) {
    isBreathingLoopPlaying.value = false;
    currentPhase.value = "retention";
    return;
  }

  setTimeout(() => {
    currentBreath.value++;
    countBreaths();
  }, breathingSpeedMs.value);
};

const playBreathingLoop = () => {
  if (!isBreathingLoopPlaying.value) return;
  inhale.currentTime = 0;
  inhale.play();

  setTimeout(() => {
    exhale.currentTime = 0;
    exhale.play();
  }, breathingSpeedMs.value / 2);

  setTimeout(() => {
    playBreathingLoop();
  }, breathingSpeedMs.value);
};

onMounted(() => {
  if (!props.isPreview) {
    countBreaths();
    isBreathingLoopPlaying.value = true;
    playBreathingLoop();
  }
});
</script>

<style scoped lang="scss">
@use "./styles.scss";
</style>
