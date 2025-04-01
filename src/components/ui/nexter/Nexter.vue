<template>
  <div
    class="cover-rest-of-screen transition-color w-full p-5 text-center"
    @click="handleClick"
    role="button"
  >
    <RoundCounter />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RoundCounter from "@/components/ui/roundCounter/RoundCounter.vue";
import useBreathingSession from "@/composables/useBreathingSession";

const { goToNextPhase } = useBreathingSession();
const clickCount = ref(0);
const clickTimeout = ref<number | null>(null);

const handleClick = () => {
  clickCount.value++;

  // Double tap
  if (clickCount.value === 1) {
    // Single click detected, set a timeout to reset the click count
    clickTimeout.value = window.setTimeout(() => {
      clickCount.value = 0;
    }, 500); // Adjust the timeout duration as needed
  } else if (clickCount.value === 2) {
    // Double click detected
    if (clickTimeout.value) {
      clearTimeout(clickTimeout.value);
      clickTimeout.value = null;
    }
    clickCount.value = 0;
    goToNextPhase();
  }
};
</script>

<style scoped lang="scss">
.cover-rest-of-screen {
  height: calc(100vh - 20px - 40px);
}
</style>
