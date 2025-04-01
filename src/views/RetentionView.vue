<template>
  <PhaseView message="HOLD">
    <Timer id="retention" />
  </PhaseView>
</template>

<script setup lang="ts">
import Timer from "@/components/ui/timer/Timer.vue";
import {
  stopAllConstrainedAudio,
  stopAllConstrainedSpeechAndSound,
  stopConstrainedMusicTrack,
  useAudio,
} from "@/composables/useAudio";
import useBreathingSession from "@/composables/useBreathingSession";
import PhaseView from "@/views/PhaseView.vue";
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";

const { clearGuidanceAudioQuery, setGuidanceAudioQuery } = useAudio();

const { settings } = useBreathingSession();
const { playSound, playSpeech, playTrack } = useAudio();
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

const handlePlayMusicTrack = () => {
  const { isMusicDuringBreathing, isMusicDuringRetention } =
    settings.audio.preferences;

  if (isMusicDuringBreathing && isMusicDuringRetention) {
    // Already handled by BreathingView
    return;
  }

  if (isMusicDuringBreathing && !isMusicDuringRetention) {
    stopConstrainedMusicTrack();
  }

  if (!isMusicDuringBreathing && isMusicDuringRetention) {
    playTrack(settings.audio.trackId);
  }

  if (!isMusicDuringBreathing && !isMusicDuringRetention) {
    stopConstrainedMusicTrack();
  }
};

onMounted(() => {
  playRetentionGuidance();
  handlePlayMusicTrack();
});

onBeforeMount(() => {
  clearGuidanceAudioQuery();
  // so music can continue if user selected
  stopAllConstrainedSpeechAndSound();
});

onBeforeUnmount(() => {
  clearGuidanceAudioQuery();
  stopAllConstrainedAudio();
});
</script>

<style scoped></style>
