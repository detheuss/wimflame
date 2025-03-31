<template>
  <div
    class="flex-star flex flex-row items-center gap-3 rounded-lg border bg-gradient-to-br from-zinc-50 to-zinc-200 p-3 dark:from-zinc-800 dark:to-zinc-950"
    :id="musicTrack?.id"
    role="button"
  >
    <div
      class="flex aspect-square w-[40px] items-center justify-center rounded-lg border bg-zinc-50 dark:bg-zinc-700"
    >
      <img src="/icons/headphones.svg" alt="Headphones Icon" />
    </div>
    <div class="flex flex-col items-start">
      <h3>{{ musicTrack?.title }}</h3>
      <span class="text-sm text-primary">by {{ musicTrack?.author }}</span>
    </div>
    <Button
      variant="outline"
      class="ms-auto !aspect-square !h-[40px] !w-[40px]"
      v-if="!isPlayButtonHidden"
      @click="handleToggleTrack"
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
  findMusicTrack,
  playTrack,
  stopAllConstrainedAudio,
  useAudio,
  type WimflameTrackIdT,
} from "@/composables/useAudio";
import { computed, ref } from "vue";

const musicTrack = computed(() => findMusicTrack(props.trackId));

const { currentlyPlaying } = useAudio();

const props = defineProps<{
  trackId: WimflameTrackIdT;
  isPlayButtonHidden?: boolean;
}>();

const isTrackPlaying = computed(() =>
  [...currentlyPlaying.value].some((audioEl) => audioEl.id === props.trackId),
);

const track = ref();

const handleToggleTrack = () => {
  if (!isTrackPlaying.value) {
    stopAllConstrainedAudio();

    track.value = playTrack(props.trackId);
    return;
  }

  if (track.value && isTrackPlaying.value) {
    stopAllConstrainedAudio();

    track.value.pause();
    track.value.currentTime = 0;
    return;
  }
};
</script>

<style scoped></style>
