<template>
  <div class="mx-auto max-w-[50%]">
    <Breather is-preview />
  </div>
  <!-- prettier-ignore -->
  <SettingSlider
    :key="settingBs.id"
    v-bind="(settingBs as any)"
    is-decimal
  />

  <!-- prettier-ignore -->
  <SettingSlider
    v-for="setting in settingsDefaults"
    :key="setting.id"
    v-bind="(setting as any)"
    class="mt-4"
  />
  <Button
    size="lg"
    variant="destructive"
    class="mt-3 w-full"
    @click="resetBreathingSettings"
  >
    Reset breathing settings
  </Button>
</template>

<script setup lang="ts">
import Breather from "@/components/ui/breather/Breather.vue";
import Button from "@/components/ui/button/Button.vue";
import useBreathingSession from "@/composables/useBreathingSession";
import SettingSlider from "@/components/ui/setting/SettingSlider.vue";

const { resetBreathingSettings } = useBreathingSession();

interface SettingDefinition {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
}

const settingBs: SettingDefinition = {
  id: "breathingSpeed",
  label: "Breathing Speed",
  min: 20,
  max: 60,
  step: 1,
};

const settingsDefaults: SettingDefinition[] = [
  {
    id: "breaths",
    label: "Breaths",
    min: 15,
    max: 100,
    step: 5,
  },
  {
    id: "rounds",
    label: "Rounds",
    min: 1,
    max: 10,
  },
  {
    id: "pauseBetweenRounds",
    label: "Pause between Rounds",
    min: 0,
    max: 30,
    step: 5,
  },
  {
    id: "pauseBeforeFirstRound",
    label: "Pause before First Round",
    min: 0,
    max: 30,
    step: 5,
  },
  {
    id: "holdAfterInhale",
    label: "Hold after Inhale",
    min: 5,
    max: 30,
    step: 5,
  },
];
</script>

<style scoped></style>
