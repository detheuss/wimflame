<template>
  <div
    class="relative flex aspect-square h-full w-full items-center justify-center"
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
    <div v-if="!isPreview" class="absolute">
      <p class="text-xl" v-if="!sessionStarted">Start</p>
      <p class="text-5xl" v-else>{{ currentBreath }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";

const currentBreath = ref(1);

// Define a prop for animation duration with a default value of 3 seconds
const props = defineProps({
  breathTime: {
    type: String,
    default: 3.5, // Default value
  },
  sessionStarted: {
    type: Boolean,
    default: false,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
});
const breathTimeInMs = computed(() => parseFloat(props.breathTime) * 1000);

const countBreaths = () => {
  setTimeout(() => {
    currentBreath.value++;
    countBreaths();
  }, breathTimeInMs.value);
};

countBreaths();
</script>

<style scoped lang="scss">
@keyframes breather {
  0%,
  100% {
    transform: scale(0);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
  }
}
@keyframes breather-aura {
  0%,
  30% {
    transform: scale(1); /* Normal size */
    // opacity: 1;
  }
  50% {
    transform: scale(1.1); /* Slightly larger */
    // opacity: 0;
  }
  80% {
    transform: scale(1); /* Normal size */
    // opacity: 1;
  }
}

.breather {
  animation-name: breather;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.breather-aura {
  animation-name: breather-aura;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
</style>
