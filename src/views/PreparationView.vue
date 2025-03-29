<template>
  <PhaseView message="GET READY">
    <Timer
      is-countdown
      :time-to-count="settings.breathing.pauseBeforeFirstRound"
      @on-time-reached="handleEndPreparation"
    />
  </PhaseView>
</template>

<script setup lang="ts">
import Timer from "@/components/ui/timer/Timer.vue";
import useBreathingSession from "@/composables/useBreathingSession";
import PhaseView from "@/views/PhaseView.vue";

const { currentPhase, settings } = useBreathingSession();

const handleEndPreparation = () => {
  currentPhase.value = "breathing";
};
</script>

<style scoped></style>
