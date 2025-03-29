<template>
  <div class="flex flex-col border">
    <div class="flex flex-col gap-2">
      <!-- BREATHING SETTINGS -->
      <WFDrawer
        title="Breathing Settings"
        description="Adjust breaths, speed, breaks and more."
        trigger-label="Breathing Settings"
        confirm-cta="Save"
        @on-confirm-action="handleSaveSettings"
        is-confirm-btn-hidden
      >
        <BreathingSettings />
      </WFDrawer>

      <!-- MUSIC SETTINGS -->
      <WFDrawer
        title="Music & Sound Settings"
        description="Adjust music and sounds."
        trigger-label="Music & Sound Settings"
        confirm-cta="Save"
        @on-confirm-action="handleSaveSettings"
        is-confirm-btn-hidden
      >
      </WFDrawer>

      <!-- INSTALLER -->
      <Installer />
    </div>
  </div>
</template>

<script setup lang="ts">
import WFDrawer from "@/components/ui/setting/WFDrawer.vue";
import BreathingSettings from "@/components/ui/setting/BreathingSettings.vue";
import Installer from "@/components/ui/installer/Installer.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import useBreathingSession from "@/composables/useBreathingSession";

const { saveSettingsToLS } = useBreathingSession();
const { toast } = useToast();
const handleSaveSettings = () => {
  try {
    saveSettingsToLS();
  } catch (e: any) {
    toast({
      title: "Fuck... Error.",
      description: `If you'd like to help, please take a screenshot of this message, note your device model, and send them to detheuss@gmail.com. ${e}`,
      variant: "destructive",
    });
  }
};
</script>

<style scoped lang="scss">
@use "../assets/transitions/fade-zoom.scss";
</style>
