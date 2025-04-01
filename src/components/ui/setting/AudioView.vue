<template>
  <div
    class="flex-star flex flex-row items-center gap-3 rounded-lg border bg-gradient-to-br from-zinc-50 to-zinc-200 p-3 dark:from-zinc-800 dark:to-zinc-950"
    :id="currentAudio?.id"
    role="button"
    @click="handleSelectAudioPreference"
  >
    <div
      class="flex aspect-square w-[40px] items-center justify-center rounded-lg border bg-zinc-50 dark:bg-zinc-700"
    >
      <img src="/icons/headphones.svg" alt="Headphones Icon" />
    </div>
    <div class="flex flex-col items-start">
      <h3>{{ currentAudio?.title }}</h3>
      <span class="text-sm text-primary" v-if="currentAudio?.author"
        >by {{ currentAudio?.author }}</span
      >
    </div>
    <Button
      variant="outline"
      class="ms-auto !aspect-square !h-[40px] !w-[40px]"
      v-if="!isPlayButtonHidden"
      @click.stop="handleToggleTrack"
    >
      <PlayIcon v-if="!isTrackPlaying" />
      <StopIcon v-else />
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import PlayIcon from "@/assets/icons/play.svg";
import StopIcon from "@/assets/icons/stop.svg";
import {
  findAudio,
  stopAllConstrainedAudio,
  useAudio,
  type WimflameSoundEffectIdT,
  type WimflameMusicTrackIdT,
} from "@/composables/useAudio";
import { computed, ref } from "vue";
import useBreathingSession from "@/composables/useBreathingSession";

const currentAudio = computed(() =>
  findAudio(props.audioId, props.isMusicTrack),
);

const { playSound, playTrack } = useAudio();

const { currentlyPlayingSpeechAndSound } = useAudio();
const { settings } = useBreathingSession();
const props = defineProps<{
  audioId: WimflameMusicTrackIdT | WimflameSoundEffectIdT;
  isPlayButtonHidden?: boolean;
  isMusicTrack?: boolean;
}>();

const isTrackPlaying = computed(() =>
  [...currentlyPlayingSpeechAndSound.value].some(
    (audioEl) => audioEl.id === props.audioId,
  ),
);

const playingAudio = ref();

const handleToggleTrack = () => {
  if (!isTrackPlaying.value) {
    stopAllConstrainedAudio();

    playingAudio.value = props.isMusicTrack
      ? playTrack(props.audioId as WimflameMusicTrackIdT)
      : playSound(props.audioId as WimflameSoundEffectIdT);
    return;
  }

  if (playingAudio.value && isTrackPlaying.value) {
    stopAllConstrainedAudio();

    playingAudio.value.pause();
    playingAudio.value.currentTime = 0;
    return;
  }
};
const { saveSettingsToLS } = useBreathingSession();

const handleSelectAudioPreference = () => {
  props.isMusicTrack
    ? (settings.audio.trackId = currentAudio.value?.id as WimflameMusicTrackIdT)
    : (settings.audio.soundId = currentAudio.value
        ?.id as WimflameSoundEffectIdT);

  saveSettingsToLS();
};
</script>

<style scoped></style>
