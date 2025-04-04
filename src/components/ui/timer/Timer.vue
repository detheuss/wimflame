<template>
  <div
    class="relative mx-auto flex aspect-square h-full w-full max-w-[300px] items-center justify-center"
  >
    <img
      src="/icons/breather-aura.svg"
      alt="Breather Image"
      class="breather-timer aspect-square h-[90%]"
      :style="{ animationDuration: 3 + 's' }"
    />
    <p class="absolute text-2xl">{{ displayTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { secondsToMinutes } from "@/utils/utils";
import { computed, onBeforeUnmount, onMounted, ref, type Ref } from "vue";

const props = defineProps<{
  timeToCount?: number;
  isCountdown?: boolean;
  id?: string;
}>();

const currentTimeCount: Ref<number | null> = ref(null);

const displayTime = computed(() => secondsToMinutes(currentTimeCount.value));

const emit = defineEmits(["onTimeReached"]);

const isCountingForceStopped = ref(false);

const handleTimeCount = () => {
  if (isCountingForceStopped.value) return;
  if (currentTimeCount.value == null) return;
  if (
    // counted to 0, OR
    (props.isCountdown && currentTimeCount.value == 0) ||
    // counted to max
    (!props.isCountdown && currentTimeCount.value == props.timeToCount)
  ) {
    emit("onTimeReached");
    return;
  }

  props.isCountdown ? currentTimeCount.value-- : currentTimeCount.value++;

  setTimeout(() => handleTimeCount(), 1000);
};

const timeToCountAdjusted = ref(
  props.isCountdown
    ? (props.timeToCount ?? 0 + 1)
    : (props.timeToCount ?? 0 - 1),
);

onMounted(() => {
  currentTimeCount.value = props.isCountdown ? timeToCountAdjusted.value : 0;

  handleTimeCount();
});

onBeforeUnmount(() => {
  isCountingForceStopped.value = true;
  currentTimeCount.value = 0;
});
</script>

<style scoped lang="scss">
@use "../breather/styles.scss";
</style>
