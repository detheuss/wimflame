<template>
  <PhaseView message="IN AND HOLD!">
    <Timer
      is-countdown
      :timeToCount="settings.breathing.holdAfterInhale"
      @on-time-reached="handleRecoveryEnded"
      id="recovery"
    />
  </PhaseView>
</template>

<script setup lang="ts">
import Timer from "@/components/ui/timer/Timer.vue";
import {
  playRandomBreatheOut,
  playSpeech,
  stopAllConstrainedAudio,
  useAudio,
} from "@/composables/useAudio";
import useBreathingSession from "@/composables/useBreathingSession";
import PhaseView from "@/views/PhaseView.vue";
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from "vue";

const { settings, goToNextPhase } = useBreathingSession();
const { clearGuidanceAudioQuery } = useAudio();

const playRecoveryGuidance = () => {
  clearGuidanceAudioQuery();
  playSpeech("recovery-in");
};

const handleRecoveryEnded = () => {
  playRandomBreatheOut();

  // this is the fuss I mentioned in the useBreathSession composable
  setTimeout(() => {
    goToNextPhase();
  }, 2000);
};

onBeforeMount(() => {
  clearGuidanceAudioQuery();
  stopAllConstrainedAudio();
});

onMounted(() => {
  playRecoveryGuidance();
});

onBeforeUnmount(() => {
  clearGuidanceAudioQuery();
  stopAllConstrainedAudio();
});
</script>

<style scoped></style>
