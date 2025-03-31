<template>
  <div class="flex flex-col">
    <label :for="id">{{ label }}</label>
    <div class="flex gap-3">
      <Slider
        v-bind="props as any"
        v-model:modelValue="localValue"
        :id="`${id}-slider`"
        @valueCommit="handleValueCommit"
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
import useBreathingSession, { type MusicSettingsT } from "@/composables/useBreathingSession";
import { computed, ref, watch } from "vue";

const { settings, saveSettingsToLS } = useBreathingSession();

const props = defineProps<{
  id: keyof MusicSettingsT["volumes"];
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}>();

const localValue = ref<number[]>([settings.audio.volumes[props.id]]);

// Keep in sync with changes to global volume setting
watch(
  () => settings.audio.volumes[props.id],
  (newVal) => {
    localValue.value = [newVal];
  },
);

const displayValue = computed(() => localValue.value[0].toString());

const handleValueCommit = () => {
  if (!localValue.value?.length) return;
  settings.audio.volumes[props.id] = localValue.value[0];
  saveSettingsToLS();
};
</script>
