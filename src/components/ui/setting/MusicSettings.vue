<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-6">
      <Separator label="MUSIC" class="mb-2 mt-6" />
      <SettingVolume label="Music volume" id="music" />

      <AudioView is-music-track :audioId="settings.audio.trackId" />
      <AudioSelector
        is-music-track-selector
        class="pointer-events-auto"
        trigger-label="Change music track"
      />

      <SettingSwitch
        id="isMusicDuringBreathing"
        label="Music during breathing"
        v-model="settings.audio.preferences.isMusicDuringBreathing"
      />
      <SettingSwitch
        id="isMusicDuringRetention"
        label="Music during retention"
        v-model="settings.audio.preferences.isMusicDuringRetention"
      />
    </div>
    <div class="flex flex-col gap-6">
      <Separator label="BREATHING AND SOUNDS" class="mb-2 mt-6" />
      <SettingVolume label="Breathing volume" id="breathing" />
      <SettingVolume label="Sound effect volume" id="sounds" />
      <AudioView :audio-id="settings.audio.soundId" />
      <AudioSelector
        class="pointer-events-auto"
        trigger-label="Change sound effect"
      />

      <SettingSwitch
        id="isSoundPlayed"
        label="Play sound effect"
        v-model="settings.audio.preferences.isSoundPlayed"
      />
    </div>
    <div class="flex flex-col gap-6">
      <Separator label="SPOKEN GUIDANCE" class="mb-2 mt-6" />
      <SettingVolume label="Guidance volume" id="speech" />
      <SettingSwitch
        id="isGuidancePlayed"
        label="Play guidance"
        v-model="settings.audio.preferences.isGuidancePlayed"
      />
    </div>
    <Button size="lg" variant="destructive" @click="resetAudioSettings">
      Reset audio settings
    </Button>
  </div>
</template>

<script setup lang="ts">
import Separator from "@/components/ui/separator/Separator.vue";
import AudioView from "@/components/ui/setting/AudioView.vue";
import AudioSelector from "@/components/ui/setting/AudioSelector.vue";
import SettingVolume from "@/components/ui/setting/SettingVolume.vue";
import useBreathingSession from "@/composables/useBreathingSession";
import SettingSwitch from "@/components/ui/setting/SettingSwitch.vue";
import Button from "@/components/ui/button/Button.vue";

const { settings, resetAudioSettings } = useBreathingSession();
</script>

<style scoped></style>
