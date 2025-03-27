<template>
  <div
    class="mx-auto flex max-h-screen min-h-[100dvh] w-full max-w-lg flex-col p-5"
  >
    <nav class="mb-4 flex items-center gap-1">
      <img src="/logo/logo.svg" alt="Wimflame Logo" width="48" height="48" />
      <h1 class="font-black">WIMFLAME</h1>

      <ThemeSwitcher class="ms-auto" />
    </nav>
    <Breather :breath-time="'3.5'" />

    <div class="mt-auto flex flex-col gap-2">
      <SettingsDrawer
        title="Breathing Settings"
        description="Adjust breaths, speed, breaks and more."
        trigger-label="Breathing Settings"
      >
        <BreathingSettings @sliding-change="handleSlidingChange" />
      </SettingsDrawer>

      <SettingsDrawer
        title="Music & Sound Settings"
        description="Adjust music and sounds."
        trigger-label="Music & Sound Settings"
      >
      </SettingsDrawer>
      <Button size="lg" class="font-bold"> Buy me a Coffee </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";

import { computed, onMounted, reactive, ref } from "vue";

import SettingsDrawer from "@/components/ui/setting/SettingsDrawer.vue";
import BreathingSettings from "@/components/ui/setting/BreathingSettings.vue";
import ThemeSwitcher from "@/components/ui/setting/ThemeSwitcher.vue";
import Breather from "@/components/ui/breather/Breather.vue";

const isSliding = ref(false);
const settingBs = {
  id: "breathingSpeed",
  label: "Breathing Speed",
  min: 15,
  max: 55,
  defaultValue: [35],
  step: 1,
};

const settings = {
  breaths: {
    id: "breaths",
    label: "Breaths",
    min: 10,
    max: 100,
    defaultValue: [30],
  },
  rounds: {
    id: "rounds",
    label: "Rounds",
    min: 1,
    max: 10,
    defaultValue: [3],
  },
  pauseBetweenRounds: {
    id: "pauseBetweenRounds",
    label: "Pause between Rounds",
    min: 0,
    max: 20,
    defaultValue: [0],
  },
  holdAfterInhale: {
    id: "holdAfterInhale",
    label: "Hold after Inhale",
    min: 5,
    max: 30,
    defaultValue: [15],
  },
};

const settingsModel = reactive<SettingsModel>({
  breathingSpeed: [...settingBs.defaultValue],
  breaths: [...settings.breaths.defaultValue],
  rounds: [...settings.rounds.defaultValue],
  pauseBetweenRounds: [...settings.pauseBetweenRounds.defaultValue],
  holdAfterInhale: [...settings.holdAfterInhale.defaultValue],
});

const breathingSpeedDisplayValue = computed(() => {
  return (settingsModel.breathingSpeed[0] / 10).toFixed(1).toString();
});

const breathTime = ref("3.5");

const syncBreather = () => {
  breathTime.value = breathingSpeedDisplayValue.value;
};

onMounted(() => {
  syncBreather();
});

interface SettingsModel {
  breathingSpeed: number[];
  breaths: number[];
  rounds: number[];
  pauseBetweenRounds: number[];
  holdAfterInhale: number[];
}

const handleSlidingChange = (value: boolean) => {
  isSliding.value = value;
  console.log("isSliding", isSliding.value);
};
</script>

<style scoped></style>
