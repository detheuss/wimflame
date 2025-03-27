<template>
  <div class="w-full max-w-lg h-[100dvh] mx-auto px-10 py-9 flex flex-col">
    <nav class="flex gap-1 items-center mb-4">
      <img src="/logo/logo.svg" alt="Wimhales Logo" width="48" height="48" />
      <h1 class="font-black">WIMFLAME</h1>
    </nav>

    <main class="w-full h-full flex flex-col">
      <Display
        >All the <span class="text-cyan-400">Love</span>—<br />
        all the <span class="text-cyan-400">Power</span>.
      </Display>
      <h2>Free. Forever.</h2>

      <Drawer :handleOnly="isSliding">
        <div class="mt-auto w-full flex gap-2">
          <DrawerTrigger class="flex-1"> Settings </DrawerTrigger>
          <Button class="flex-1"> Breathe </Button>
        </div>
        <DrawerContent class="w-full max-w-lg border mx-auto flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Session Settings</DrawerTitle>
            <DrawerDescription
              >Adjust breathing speed, music, and more.</DrawerDescription
            >
          </DrawerHeader>
          <div
            class="border max-h-[60vh] overflow-y-auto"
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

          <DrawerFooter class="flex flex-row w-full">
            <DrawerClose class="w-full">
              <Button variant="outline" class="w-full"> Cancel </Button>
            </DrawerClose>
            <Button
              variant="default"
              class="w-full"
              @click="handleSaveSettings"
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </main>
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
