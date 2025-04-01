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
import { createConstrainedAudio, useAudio } from "@/composables/useAudio";
import {
  computed,
  defineProps,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

const { playRandomBreatheIn, playRandomBreatheOut, playSpeech } = useAudio();
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
const { clearGuidanceAudioQuery, setGuidanceAudioQuery } = useAudio();

const inhale = createConstrainedAudio(
  "/audio/sounds/inhale.mp3",
  "inhale",
  settings.audio.volumes.breathing,
);
const exhale = createConstrainedAudio(
  "/audio/sounds/exhale.mp3",
  "exhale",
  settings.audio.volumes.breathing,
);

const isBreathingLoopPlaying = ref();

const countBreaths = () => {
  if (currentPhase.value !== "breathing") return;
  // exit - count ended
  if (settings.breathing.breaths < currentBreath.value) {
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

const playBreathingGuidance = () => {
  if (!isBreathingLoopPlaying.value) return;

  clearGuidanceAudioQuery();

  playRandomBreatheIn();

  setGuidanceAudioQuery(() => {
    playRandomBreatheOut();
  }, breathingSpeedMs.value / 2);

  setGuidanceAudioQuery(() => {
    playSpeech("no-pause");
  }, breathingSpeedMs.value * 5);

  setGuidanceAudioQuery(() => {
    if (!isBreathingLoopPlaying.value) return;
    playSpeech("breath-flow");
  }, breathingSpeedMs.value * 20);

  setGuidanceAudioQuery(
    () => {
      playSpeech("last-breath");
    },
    breathingSpeedMs.value * (settings.breathing.breaths - 1) - 800,
  );
};

onMounted(() => {
  if (!props.isPreview) {
    countBreaths();
    isBreathingLoopPlaying.value = true;
    playBreathingLoop();
    playBreathingGuidance();
  }
});

onBeforeUnmount(() => {
  isBreathingLoopPlaying.value = false;
  clearGuidanceAudioQuery();
});
</script>

<style scoped lang="scss">
@use "./styles.scss";
</style>
