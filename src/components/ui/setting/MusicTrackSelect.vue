<template>
  <Dialog>
    <DialogTrigger>
      <MusicTrack track-id="into-the-void" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Music</DialogTitle>
        <DialogDescription> Select music for your session.</DialogDescription>
      </DialogHeader>

      <MusicTrack v-for="track in WIMFLAME_MUSIC_TRACKS" :track-id="track.id" />
      <DialogFooter>
        <SpecialEndorsement />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MusicTrack from "@/components/ui/setting/MusicTrack.vue";
import SpecialEndorsement from "@/components/ui/specialEndorsement/SpecialEndorsement.vue";
import { WIMFLAME_MUSIC_TRACKS } from "@/composables/useAudio";
</script>
