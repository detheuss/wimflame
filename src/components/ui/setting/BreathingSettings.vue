<template>
  <div class="mx-auto max-w-[50%]">
    <Breather :breath-time="breathTime" is-preview />
  </div>
  <!-- prettier-ignore -->
  <Setting
    :key="settingBs.id"
    v-bind="(settingBs as any)"
    v-model:modelValue="settingsModel[settingBs.id]"
    :display-value="breathingSpeedDisplayValue"
    @slidingChange="handleSlidingChange"
    @value-commit="syncBreather"
  />

  <!-- prettier-ignore -->
  <Setting
    v-for="setting in settingsDefaults"
    :key="setting.id"
    v-bind="(setting as any)"
    v-model:modelValue="settingsModel[setting.id]"
    @slidingChange="handleSlidingChange"
    class="mt-4"
  />
  <Button
    @click="resetToDefaults"
    size="lg"
    variant="secondary"
    class="mt-3 w-full"
  >
    Restore defaults
  </Button>
</template>

<script setup lang="ts">
import Breather from "@/components/ui/breather/Breather.vue";
import Setting from "@/components/ui/setting/Setting.vue";
import { computed, defineProps, onMounted, reactive, ref } from "vue";
import Button from "@/components/ui/button/Button.vue";

interface SettingDefinition {
  id: string;
  label: string;
  min: number;
  max: number;
  defaultValue: number[];
  step?: number;
}

const props = defineProps<{
  onSlidingChange: (value: boolean) => void;
}>();

const settingBs: SettingDefinition = {
  id: "breathingSpeed",
  label: "Breathing Speed",
  min: 15,
  max: 55,
  defaultValue: [35],
  step: 1,
};

const settingsDefaults: SettingDefinition[] = [
  {
    id: "breaths",
    label: "Breaths",
    min: 10,
    max: 100,
    defaultValue: [30],
  },
  {
    id: "rounds",
    label: "Rounds",
    min: 1,
    max: 10,
    defaultValue: [3],
  },
  {
    id: "pauseBetweenRounds",
    label: "Pause between Rounds",
    min: 0,
    max: 20,
    defaultValue: [0],
  },
  {
    id: "pauseBeforeFirstRound",
    label: "Pause before First Round",
    min: 0,
    max: 20,
    defaultValue: [0],
  },
  {
    id: "holdAfterInhale",
    label: "Hold after Inhale",
    min: 5,
    max: 30,
    defaultValue: [15],
  },
];

type SettingId = (typeof settingsDefaults)[number]["id"] | typeof settingBs.id;

const settingsModel = reactive<Record<SettingId, number[]>>({
  breathingSpeed: [...settingBs.defaultValue],
  breaths: [...settingsDefaults[0].defaultValue],
  rounds: [...settingsDefaults[1].defaultValue],
  pauseBetweenRounds: [...settingsDefaults[2].defaultValue],
  pauseBeforeFirstRound: [...settingsDefaults[3].defaultValue],
  holdAfterInhale: [...settingsDefaults[4].defaultValue],
});

const breathingSpeedDisplayValue = computed(() => {
  return (settingsModel.breathingSpeed[0] / 10).toFixed(1).toString();
});

const breathTime = ref("3.5");

const syncBreather = () => {
  breathTime.value = breathingSpeedDisplayValue.value;
};

const resetToDefaults = () => {
  settingsModel.breathingSpeed = settingBs.defaultValue;
  for (const setting of settingsDefaults) {
    settingsModel[setting.id] = [...setting.defaultValue];
  }
};

onMounted(syncBreather);

const handleSlidingChange = (value: boolean) => {
  props.onSlidingChange(value);
};
</script>

<style scoped></style>
