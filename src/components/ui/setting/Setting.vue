<template>
  <div class="px-8 pb-6 pt-4 border-t border-b flex flex-col gap-4">
    <label :for="id">{{ label }}</label>
    <div class="flex gap-3">
      <Slider
        v-bind="(props as any)"
        v-model:modelValue="modelValue"
        :id="id"
        @touchstart="onSlidingChange(true)"
        @touchend="onSlidingChange(false)"
        @touchcancel="onSlidingChange(false)"
      />
      <div>
        {{ modelValue?.[0] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Slider from "@/components/ui/slider/Slider.vue";

const props = defineProps<SettingProps>();
const emit = defineEmits<{
  (e: "slidingChange", isSliding: boolean): void;
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
}
</script>

<style scoped></style>
