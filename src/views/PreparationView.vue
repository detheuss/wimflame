<template>
  <PhaseView message="GET READY">
    <Timer
      is-countdown
      :time-to-count="settings.breathing.pauseBeforeFirstRound"
      @on-time-reached="handleEndPreparation"
      id="preparation"
    />
  </PhaseView>
</template>

<script setup lang="ts">
import Timer from "@/components/ui/timer/Timer.vue";
import { stopAllConstrainedAudio, useAudio } from "@/composables/useAudio";
import useBreathingSession from "@/composables/useBreathingSession";
import PhaseView from "@/views/PhaseView.vue";
import { onBeforeMount, onBeforeUnmount } from "vue";

const { currentPhase, settings } = useBreathingSession();
const { clearGuidanceAudioQuery } = useAudio();

const handleEndPreparation = () => {
  currentPhase.value = "breathing";
};
onBeforeMount(() => {
  clearGuidanceAudioQuery();
  stopAllConstrainedAudio();
});

onBeforeUnmount(() => {
  clearGuidanceAudioQuery();
  stopAllConstrainedAudio();
});
</script>

<style scoped></style>
