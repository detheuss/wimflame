<template>
  <Dialog @update:open="handleOpenAudioSelector">
    <DialogTrigger as-child>
      <Button size="lg" class="w-full border-primary" variant="outline">{{
        triggerLabel
      }}</Button>
    </DialogTrigger>
    <DialogContent class="flex h-[80%] flex-col">
      <DialogHeader>
        <DialogTitle>Music</DialogTitle>
        <DialogDescription> Select music for your session.</DialogDescription>
      </DialogHeader>
      <div
        class="flex max-h-full flex-1 flex-col gap-4 overflow-y-auto rounded-lg border p-3"
      >
        <AudioView
          v-for="track in audioTracks"
          :audioId="track.id"
          :isMusicTrack="isMusicTrackSelector"
          :class="{ 'outline outline-primary': checkIsSelectedAudio(track.id) }"
        />
      </div>
      <DialogFooter class="flex !flex-col gap-4">
        <DialogClose as-child>
          <Button size="lg" @click="isDialogOpen = false">Close</Button>
        </DialogClose>

        <SpecialEndorsement v-if="isMusicTrackSelector" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import AudioView from "@/components/ui/setting/AudioView.vue";
import SpecialEndorsement from "@/components/ui/specialEndorsement/SpecialEndorsement.vue";
import {
  stopAllConstrainedAudio,
  WIMFLAME_MUSIC_TRACKS,
  WIMFLAME_SOUND_EFFECTS,
  type WimflameMusicTrackIdT,
  type WimflameSoundEffectIdT,
} from "@/composables/useAudio";
import useBreathingSession from "@/composables/useBreathingSession";
import { computed, ref } from "vue";

const props = defineProps<{
  isMusicTrackSelector?: boolean;
  triggerLabel: string;
}>();

const isDialogOpen = ref(false);

const handleOpenAudioSelector = () => {
  stopAllConstrainedAudio();
};

const { settings } = useBreathingSession();

const checkIsSelectedAudio = (
  audioId: WimflameSoundEffectIdT | WimflameMusicTrackIdT,
) => audioId === settings.audio.trackId || audioId === settings.audio.soundId;

const audioTracks = computed(() => {
  return props.isMusicTrackSelector
    ? WIMFLAME_MUSIC_TRACKS
    : WIMFLAME_SOUND_EFFECTS;
});
</script>
