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

const { currentRound, settings } = useBreathingSession();
const {
  clearGuidanceAudioQuery,
  playTrack,
  currentlyPlayingMusicTrack,
  currentlyPlayingSpeechAndSound,
} = useAudio();

onMounted(() => {
  currentRound.value++;

  if (settings.audio.preferences.isMusicDuringBreathing) {
    playTrack(settings.audio.trackId);
  }
});

onBeforeMount(() => {
  clearGuidanceAudioQuery();
  stopAllConstrainedAudio();
});

onBeforeUnmount(() => {
  clearGuidanceAudioQuery();
  // so music can continue to retention if user selected
  stopAllConstrainedSpeechAndSound();
});
</script>

<style scoped></style>
