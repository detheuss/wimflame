<template>
  <div
    class="mx-auto flex max-h-screen min-h-[100dvh] w-full max-w-lg flex-col p-5"
  >
    <nav class="mb-4 flex items-center gap-1">
      <img src="/logo/logo.svg" alt="Wimflame Logo" width="48" height="48" />
      <h1 class="font">Wimflame</h1>
      <ThemeSwitcher class="ms-auto" />
    </nav>

    <Breather :breath-time="'3.5'" />

    <div class="my-auto flex flex-col gap-2">
      <WFDrawer
        title="Breathing Settings"
        description="Adjust breaths, speed, breaks and more."
        trigger-label="Breathing Settings"
        confirm-cta="Save"
      >
        <BreathingSettings @sliding-change="handleSlidingChange" />
      </WFDrawer>

      <WFDrawer
        title="Music & Sound Settings"
        description="Adjust music and sounds."
        trigger-label="Music & Sound Settings"
        confirm-cta="Save"
      >
      </WFDrawer>
      <!-- <Button size="lg" class="font-bold"> Buy me a Coffee </Button> -->
      <Installer />
    </div>
    <div class="mt-auto text-center">
      <a
        class="text-sm text-primary"
        href="https://github.com/detheuss/wimflame"
        target="_blank"
        rel="noopener noreferrer"
      >
        @detheuss</a
      >
      <h3 class="text-secondary-foreground">All the Love—All The Power.</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import WFDrawer from "@/components/ui/setting/WFDrawer.vue";
import BreathingSettings from "@/components/ui/setting/BreathingSettings.vue";
import ThemeSwitcher from "@/components/ui/setting/ThemeSwitcher.vue";
import Breather from "@/components/ui/breather/Breather.vue";
import Installer from "@/components/ui/installer/Installer.vue";

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
  window.addEventListener("beforeinstallprompt", () => {
    console.log("🔥 beforeinstallprompt fired!");
  });
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
