<template>
  <PhaseView message="TAKE A BREAK">
    <Timer
      is-countdown
      :time-to-count="settings.breathing.pauseBetweenRounds"
    />
  </PhaseView>
</template>

<script setup lang="ts">
import Timer from "@/components/ui/timer/Timer.vue";
import { stopAllConstrainedAudio, useAudio } from "@/composables/useAudio";
import useBreathingSession from "@/composables/useBreathingSession";
import PhaseView from "@/views/PhaseView.vue";
import { onBeforeMount, onBeforeUnmount } from "vue";

const { clearGuidanceAudioQuery } = useAudio();
const { settings } = useBreathingSession();

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
