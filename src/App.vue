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

    <div class="relative flex min-h-[400px] flex-1 items-center justify-center">
      <Transition
        name="fade-zoom"
        mode="out-in"
        @after-leave="isAnimationDone = true"
      >
        <StartButton v-if="currentPhase === 'before'" />
        <PreparationView
          v-else-if="currentPhase === 'preparation' && isAnimationDone"
        />
        <BreathingView v-else-if="currentPhase === 'breathing'" />
        <RetentionView v-else-if="currentPhase === 'retention'" />
      </Transition>
    </div>

    <!-- QUICK ACTIONS -->
    <div class="h-[210px]">
      <Transition name="fade" mode="out-in">
        <div v-if="currentPhase === 'before'">
          <QuickActions class="mt-auto" />
          <Footer class="mt-4" />
        </div>
        <div
          class="absolute bottom-0 left-0 flex w-full items-center justify-center p-5"
          v-else
        >
          <Button
            variant="outline"
            class="w-full border-primary text-primary"
            size="lg"
            @click="handleCancelSession"
          >
            Cancel Session
          </Button>
        </div>
      </Transition>
    </div>
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
import RetentionView from "@/views/RetentionView.vue";
import Button from "@/components/ui/button/Button.vue";
import { useAudio } from "@/composables/useAudio";

const { currentPhase } = useBreathingSession();
const { clearGuidanceAudioQuery } = useAudio();

const handleCancelSession = () => {
  clearGuidanceAudioQuery();
  currentPhase.value = "before";
};

const isAnimationDone = ref(false);
</script>

<style scoped lang="scss">
@use "./assets/transitions/fade-zoom.scss";
@use "./assets/transitions/fade.scss";
</style>
