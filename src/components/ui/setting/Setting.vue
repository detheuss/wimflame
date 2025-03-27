<template>
  <div class="flex flex-col">
    <label :for="id">{{ label }}</label>
    <div class="flex gap-3">
      <!-- prettier-ignore -->
      <Slider
        v-bind="(props as any)"
        v-model:modelValue="modelValue"
        :id="`${id}-slider`"
        @touchstart="onSlidingChange(true)"
        @touchend="onSlidingChange(false)"
        @touchcancel="onSlidingChange(false)"
        @valueCommit="handleValueCommit"
      />

      <div
        class="flex aspect-square w-[20%] items-center justify-center rounded-lg border p-2 text-center"
      >
        {{ props.displayValue ?? modelValue?.[0].toString() ?? "0" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Slider from "@/components/ui/slider/Slider.vue";

const props = defineProps<SettingProps>();
const emit = defineEmits<{
  (e: "slidingChange", isSliding: boolean): void;
  (e: "valueCommit"): void;
}>();

const modelValue = defineModel<number[] | undefined>();

const onSlidingChange = (isSliding: boolean) =>
  emit("slidingChange", isSliding);

interface SettingProps {
  id: string;
  label?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  displayValue?: string;
}

const handleValueCommit = () => emit("valueCommit");
</script>

<style scoped></style>
