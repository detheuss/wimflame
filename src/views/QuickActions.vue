<template>
  <div class="flex flex-col border">
    <div class="flex flex-col gap-2">
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
      <Installer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import WFDrawer from "@/components/ui/setting/WFDrawer.vue";
import BreathingSettings from "@/components/ui/setting/BreathingSettings.vue";
import Installer from "@/components/ui/installer/Installer.vue";
import useBreathingSession from "@/composables/useBreathingSession";

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
const { currentPhase } = useBreathingSession();
</script>

<style scoped lang="scss">
@use "../assets/transitions/fade-zoom.scss";
</style>
