<template>
  <Transition>
    <div v-if="currentRound">
      <p class="text-sm">
        Round {{ currentRound }} / {{ settings.breathing.rounds }}
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import useBreathingSession from "@/composables/useBreathingSession";

const { currentRound, settings } = useBreathingSession();
</script>

<style scoped lang="scss"></style>
