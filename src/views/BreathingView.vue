<template>
  <PhaseView message="BREATHE">
    <Breather is-counting />
  </PhaseView>
</template>

<script setup lang="ts">
import Breather from "@/components/ui/breather/Breather.vue";
import useBreathingSession from "@/composables/useBreathingSession";
import PhaseView from "@/views/PhaseView.vue";
import { onMounted } from "vue";

const { currentRound } = useBreathingSession();

onMounted(() => {
  currentRound.value++;
  console.log("breathing round", currentRound.value);
});
</script>

<style scoped></style>
