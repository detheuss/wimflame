<template>
  <div class="mx-auto flex min-h-screen w-full max-w-lg flex-col border p-5">
    <nav class="mb-4 flex items-center gap-1">
      <img src="/logo/logo.svg" alt="Wimhales Logo" width="48" height="48" />
      <h1 class="font-black">WIMFLAME</h1>
    </nav>

    <main class="h-full w-full flex-col">
      <Display
        >All the <span class="text-cyan-400">Love</span>—<br />
        all the <span class="text-cyan-400">Power</span>.
      </Display>
    </main>

    <Drawer :handleOnly="isSliding">
      <div class="mt-auto flex w-full gap-2">
        <DrawerTrigger class="flex-1"> Settings </DrawerTrigger>
        <Button size="lg" class="flex-1"> Breathe </Button>
      </div>
      <DrawerContent class="mx-auto flex w-full max-w-lg flex-col border">
        <DrawerHeader>
          <DrawerTitle class="text-lg">Session Settings</DrawerTitle>
          <DrawerDescription
            >Adjust breathing speed, music, and more.</DrawerDescription
          >
        </DrawerHeader>
        <div
          class="max-h-[60vh] overflow-y-auto border"
          @scroll.prevent="handleSlidingChange(true)"
          @scrollend.prevent="handleSlidingChange(false)"
        >
          <Setting
            v-for="(setting, key) in settingsValues"
            :key="key"
            :id="key"
            :label="setting.label"
            :min="setting.min"
            :max="setting.max"
            v-model:modelValue="settingsModel[key as keyof SettingsModel]"
            @slidingChange="handleSlidingChange"
          />
        </div>

        <DrawerFooter class="flex w-full flex-row">
          <DrawerClose class="w-full">
            <Button size="lg" variant="outline" class="w-full"> Cancel </Button>
          </DrawerClose>
          <Button
            size="lg"
            variant="default"
            class="w-full"
            @click="handleSaveSettings"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Display from "@/components/ui/typography/Display.vue";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { reactive, ref } from "vue";
import Setting from "@/components/ui/setting/Setting.vue";

const isSliding = ref(false);
const settingsValues = {
  breathingSpeed: {
    label: "Breathing Speed",
    min: 1,
    max: 5,
    defaultValue: [50],
  },
  breaths: {
    label: "Breaths",
    min: 1,
    max: 100,
    defaultValue: [50],
  },
  rounds: {
    label: "Rounds",
    min: 1,
    max: 100,
    defaultValue: [50],
  },
  pauseBetweenRounds: {
    label: "Pause between Rounds",
    min: 1,
    max: 100,
    defaultValue: [50],
  },
  holdAfterInhale: {
    label: "Hold after Inhale",
    min: 1,
    max: 100,
    defaultValue: [50],
  },
};

const settingsModel = reactive<SettingsModel>({
  breathingSpeed: [...settingsValues.breathingSpeed.defaultValue],
  breaths: [...settingsValues.breaths.defaultValue],
  rounds: [...settingsValues.rounds.defaultValue],
  pauseBetweenRounds: [...settingsValues.pauseBetweenRounds.defaultValue],
  holdAfterInhale: [...settingsValues.holdAfterInhale.defaultValue],
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

const handleSaveSettings = () => {
  console.log(settingsModel);
};
</script>

<style scoped></style>
