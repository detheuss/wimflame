<template>
  <div class="flex flex-col">
    <label :for="id">{{ label }}</label>
    <div class="flex gap-3">
      <!-- prettier-ignore -->
      <Slider
        v-bind="(props as any)"
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
import useBreathingSession, {
  type BreathingSettingsKey,
} from "@/composables/useBreathingSession";
import { computed, ref, watch } from "vue";

const { settings, saveSettingsToLS } = useBreathingSession();

const props = defineProps<SettingProps>();
const localValue = ref<number[]>([settings.breathing[props.id]]);

watch(
  () => settings.breathing[props.id],
  (newVal) => {
    localValue.value = [newVal];
  },
);

interface SettingProps {
  id: BreathingSettingsKey;
  label?: string;
  min?: number;
  max?: number;
  defaultValue?: number[];
  isDecimal?: boolean;
  step?: number;
}

const displayValue = computed(() => {
  return props.isDecimal
    ? (localValue.value[0] / 10).toString()
    : localValue.value[0].toString();
});

const handleValueCommit = () => {
  if (!localValue.value || !localValue.value.length) return;
  settings.breathing[props.id] = localValue.value[0];

  saveSettingsToLS();
};
</script>

<style scoped></style>
