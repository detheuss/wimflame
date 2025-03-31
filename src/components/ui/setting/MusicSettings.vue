<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-3">
      <Separator label="Music" class="mb-5 mt-2" />
      <AudioView is-music-track :audioId="settings.audio.trackId" />
      <SettingVolume id="music" />
      <AudioSelector
        is-music-track-selector
        class="pointer-events-auto"
        trigger-label="Change Music Track"
      />
      <SettingSwitch
        id="isMusicFromBreathing"
        label="Music during breathing"
        v-model="settings.audio.preferences.isMusicFromBreathing"
      />
      <SettingSwitch
        id="isMusicFromRetention"
        label="Music during retention"
        v-model="settings.audio.preferences.isMusicFromRetention"
      />
    </div>
    <div>
      <Separator label="Sound effects" class="mb-5 mt-2" />
    </div>
    <div>
      <Separator label="Speech guidance" class="mb-5 mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Separator from "@/components/ui/separator/Separator.vue";
import AudioView from "@/components/ui/setting/AudioView.vue";
import AudioSelector from "@/components/ui/setting/AudioSelector.vue";
import SettingVolume from "@/components/ui/setting/SettingVolume.vue";
import useBreathingSession from "@/composables/useBreathingSession";
import SettingSwitch from "@/components/ui/setting/SettingSwitch.vue";

const { settings } = useBreathingSession();
</script>

<style scoped></style>
