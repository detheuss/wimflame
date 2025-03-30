<template>
  <PhaseView message="HOLD">
    <Timer />
  </PhaseView>
</template>

<script setup lang="ts">
import Timer from "@/components/ui/timer/Timer.vue";
import { playSound, playSpeech, useAudio } from "@/composables/useAudio";
import PhaseView from "@/views/PhaseView.vue";
import { onBeforeUnmount, onMounted } from "vue";

const { clearGuidanceAudioQuery, setGuidanceAudioQuery } = useAudio();
const playRetentionGuidance = () => {
  clearGuidanceAudioQuery();
  /**
   * Time markers up to 5 min
   */
  // one minute
  setGuidanceAudioQuery(() => {
    playSpeech("one-minute");
    playSound("gong");
  }, 60000);
  // two minutes
  setGuidanceAudioQuery(() => {
    playSound("gong");
    playSpeech("two-minutes");
  }, 120000);

  // three minutes
  setGuidanceAudioQuery(() => {
    playSound("gong");
    playSpeech("three-minutes");
  }, 180000);

  // four minutes
  setGuidanceAudioQuery(() => {
    playSound("gong");
    playSpeech("four-minutes");
  }, 240000);

  // five minutes
  setGuidanceAudioQuery(() => {
    playSound("gong");
    playSpeech("five-minutes");
  }, 300000);

  // motivation guidance
  setGuidanceAudioQuery(() => {
    playSpeech("retention-1");
  }, 1000);

  setGuidanceAudioQuery(() => {
    playSpeech("retention-2");
  }, 20000);

  setGuidanceAudioQuery(() => {
    playSpeech("retention-3");
  }, 35000);

  setGuidanceAudioQuery(() => {
    playSpeech("retention-4");
  }, 65000);
};

onMounted(() => {
  playRetentionGuidance();
});

onBeforeUnmount(() => {
  clearGuidanceAudioQuery();
});
</script>

<style scoped></style>
