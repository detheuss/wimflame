<template>
  <Toaster />

  <div
    class="relative mx-auto flex max-h-screen min-h-[100dvh] w-full max-w-md flex-col overflow-hidden p-5 lg:border"
  >
    <!-- HEADER -->
    <Transition name="fade" mode="out-in">
      <Navbar v-if="currentPhase === 'before'" />
      <NavbarPlaceholder v-else />
    </Transition>

    <!-- APP -->

    <Transition
      name="fade-zoom"
      mode="out-in"
      @after-leave="isAnimationDone = true"
    >
      <div
        v-if="currentPhase === 'before'"
        class="my-auto flex h-full flex-1 flex-col items-center justify-center"
      >
        <StartButton />
      </div>
    </Transition>

    <div class="my-auto">
      <PreparationView
        v-if="currentPhase === 'preparation' && isAnimationDone"
      />
      <BreathingView v-else-if="currentPhase === 'breathing'" />
    </div>

    <!-- QUICK ACTIONS -->
    <Transition name="fade" mode="out-in">
      <div v-if="currentPhase === 'before'">
        <QuickActions class="mt-auto" />
        <Footer class="mt-4" />
      </div>
    </Transition>

    <!-- FOOTER -->
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/ui/navbar/Navbar.vue";
import Footer from "@/components/ui/footer/Footer.vue";
import QuickActions from "@/views/QuickActions.vue";
import useBreathingSession from "@/composables/useBreathingSession";
import StartButton from "@/views/StartButton.vue";
import PreparationView from "@/views/PreparationView.vue";
import { ref } from "vue";
import BreathingView from "@/views/BreathingView.vue";
import NavbarPlaceholder from "@/components/ui/navbar/NavbarPlaceholder.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";

const { currentPhase } = useBreathingSession();

const isAnimationDone = ref(false);
</script>

<style scoped lang="scss">
@use "./assets/transitions/fade-zoom.scss";
@use "./assets/transitions/fade.scss";
</style>
