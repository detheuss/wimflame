<template>
  <div
    class="cover-rest-of-screen transition-color w-full p-5 text-center"
    @click="goToNextPhase"
    role="button"
  >
    <RoundCounter />
  </div>
</template>

<script setup lang="ts">
import RoundCounter from "@/components/ui/roundCounter/RoundCounter.vue";
import useBreathingSession from "@/composables/useBreathingSession";

const { goToNextPhase } = useBreathingSession();
</script>

<style scoped lang="scss">
.cover-rest-of-screen {
  height: calc(100vh - 20px - 40px);
}
</style>
