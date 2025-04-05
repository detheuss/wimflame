<template>
  <PhaseView message="BREATHE">
    <Breather is-counting />
  </PhaseView>
</template>

<script setup lang="ts">
import Breather from "@/components/ui/breather/Breather.vue";
import {
  stopAllConstrainedAudio,
  stopAllConstrainedSpeechAndSound,
  useAudio,
} from "@/composables/useAudio";
import useBreathingSession from "@/composables/useBreathingSession";
import PhaseView from "@/views/PhaseView.vue";
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";

const { currentRound } = useBreathingSession();
const {
  clearGuidanceAudioQuery,
  stopAndClearAllActiveAudioBuffers,
  isBreathingLoopPlaying,
  clearBreathingAudioQuery,
} = useAudio();

onMounted(async () => {
  currentRound.value++;

  // breathing and guidance is in Breather.vue
});

onBeforeMount(() => {
  clearGuidanceAudioQuery();
  stopAllConstrainedAudio();
});

onBeforeUnmount(() => {
  isBreathingLoopPlaying.value = false;
  clearGuidanceAudioQuery();
  clearBreathingAudioQuery();
  stopAllConstrainedSpeechAndSound();
  stopAndClearAllActiveAudioBuffers();
});
</script>

<style scoped></style>
