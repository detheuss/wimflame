<template>
  <div
    class="mx-auto flex max-h-screen min-h-[100dvh] w-full max-w-md flex-col p-5 lg:border"
  >
    <!-- HEADER -->
    <Navbar />

    <!-- APP -->
    <main class="flex flex-1 items-center justify-center">
      <Transition name="fade-zoom">
        <StartButton v-if="currentPhase === 'before'" />
      </Transition>
    </main>

    <!-- QUICK ACTIONS -->
    <div class="flex flex-col">
      <Transition name="fade" mode="out-in">
        <QuickActions v-if="currentPhase === 'before'" class="mt-auto" />
      </Transition>
    </div>

    <!-- FOOTER -->
    <Footer class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/ui/navbar/Navbar.vue";
import Footer from "@/components/ui/footer/Footer.vue";
import QuickActions from "@/views/QuickActions.vue";
import useBreathingSession from "@/composables/useBreathingSession";
import StartButton from "@/components/ui/startButton/StartButton.vue";

const { currentPhase } = useBreathingSession();
</script>

<style scoped lang="scss">
@use "./assets/transitions/fade-zoom.scss";
@use "./assets/transitions/fade.scss";
</style>
