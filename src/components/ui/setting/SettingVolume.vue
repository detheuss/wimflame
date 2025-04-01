<template>
  <div class="flex flex-col">
    <label :for="id">{{ label }}</label>
    <div class="flex gap-3">
      <!--prettier-ignore-->
      <Slider
        v-bind="(props as any)"
        v-model:modelValue="localValue"
        :id="`${id}-slider`"
        @valueCommit="handleValueCommit"
        :min="0"
        :max="100"
        @update:modelValue="stopAllConstrainedAudio"
      />

      <div
        class="flex aspect-square w-[20%] items-center justify-center rounded-lg border p-2 text-center"
      >
        {{ displayValue }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Slider from "@/components/ui/slider/Slider.vue";
import {
  createConstrainedAudio,
  stopAllConstrainedAudio,
  useAudio,
} from "@/composables/useAudio";
import useBreathingSession, {
  type MusicSettingsT,
} from "@/composables/useBreathingSession";
import { computed, onMounted, ref, watch } from "vue";

const { settings, saveSettingsToLS } = useBreathingSession();
const { currentlyPlayingSpeechAndSound, playSpeech, playSound } = useAudio();
const props = defineProps<{
  id: keyof MusicSettingsT["volumes"];
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}>();

const localValue = ref<number[]>([settings.audio.volumes[props.id] * 100]);

// Keep in sync with changes to global volume setting
watch(
  () => settings.audio.volumes[props.id],
  (newVal) => {
    localValue.value = [newVal * 100];
  },
);

const displayValue = computed(() => localValue.value[0].toString());

//@TODO this is ugly, but will work for now - BUT this relies on only one track playing! Else it gets buggy
const setVolumeOfCurrentlyPlaying = () => {
  currentlyPlayingSpeechAndSound.value.forEach((item) => {
    item.volume = localValue.value[0] / 100;
  });
};

const handleValueCommit = () => {
  if (!localValue.value?.length) return;

  settings.audio.volumes[props.id] = localValue.value[0] / 100;

  setVolumeOfCurrentlyPlaying();

  if (props.id == "speech") playSpeech("no-pause");
  if (props.id == "breathing") {
    //@TODO again, ugly... logic in Breather. unify later
    const exhale = createConstrainedAudio(
      "/audio/sounds/exhale.mp3",
      "exhale",
      settings.audio.volumes.breathing,
    );
    exhale.play();
  }

  if (props.id == "sounds") {
    playSound(settings.audio.soundId);
  }

  saveSettingsToLS();
};
</script>
