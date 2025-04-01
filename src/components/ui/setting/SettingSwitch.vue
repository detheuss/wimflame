<template>
  <div class="flex items-center gap-4 border p-3 rounded-lg" :class="{'border-primary': model}">
    <Switch :id="id" :model-value="model" @update:model-value="handleToggle" />
    <Label :for="id">{{ label }}</Label>
  </div>
</template>

<script setup lang="ts">
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import useBreathingSession from "@/composables/useBreathingSession";

const model = defineModel<boolean>();

defineProps<{
  id: string;
  label: string;
}>();

const { saveSettingsToLS } = useBreathingSession();

const handleToggle = (val: boolean) => {
  model.value = val;
  saveSettingsToLS();
};
</script>
