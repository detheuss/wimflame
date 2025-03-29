<template>
  <div
    class="relative flex aspect-square h-full w-full max-w-[300px] items-center justify-center"
    :role="!hasSessionStarted ? 'button' : undefined"
    @click="handleSessionStarted"
  >
    <img
      src="/icons/breather-hex.svg"
      alt="Breather Image"
      class="breather absolute aspect-square h-[60%]"
      :style="{ animationDuration: breathTime + 's' }"
    />
    <img
      src="/icons/breather-aura.svg"
      alt="Breather Image"
      class="breather-aura aspect-square h-[90%]"
      :style="{ animationDuration: breathTime + 's' }"
    />
    <div class="absolute">
      <p class="text-xl" v-if="!hasSessionStarted">{{ startCta }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useBreathingSession from "@/composables/useBreathingSession";
import { playSound } from "@/composables/useMusicSounds";

const { currentPhase } = useBreathingSession();

const handleSessionStarted = () => {
  playSound("gong");
  currentPhase.value = "preparation";
};

defineProps({
  breathTime: {
    type: Number,
    default: 3.5,
  },
  hasSessionStarted: {
    type: Boolean,
    default: false,
  },
  startCta: {
    type: String,
    default: "Start",
  },
});
</script>

<style scoped lang="scss">
@use "../components/ui/breather/styles.scss";
</style>
