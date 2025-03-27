<template>
  <WFDrawer
    trigger-label="Install Wimflame App"
    trigger-variant="default"
    title="Install Wimflame"
    description="Native Experience With Offline Access!"
    isConfirmBtnHidden
    confirm-cta="Install Now"
  >
    <AppleFlamingView v-if="isIOS" />
    <AndroidWindowsView v-else @on-install="installPWA" />
  </WFDrawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { checkIsIOSPojebanySkurvenyRakByPozulTotuFirmu } from "@/utils/utils";
import WFDrawer from "@/components/ui/setting/WFDrawer.vue";
import AppleFlamingView from "@/components/ui/installer/AppleFlamingView.vue";
import AndroidWindowsView from "@/components/ui/installer/AndroidWindowsView.vue";

const deferredPrompt = ref<Event | null>(null);
const canInstall = ref(false);

onMounted(() => {
  isIOS.value = checkIsIOSPojebanySkurvenyRakByPozulTotuFirmu();

  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt.value = e;
    canInstall.value = true;
    console.debug("🔥 beforeinstallprompt captured in Installer.vue");
  });
});
const isIOS = ref();

function installPWA() {
  const promptEvent = deferredPrompt.value as any;
  if (!promptEvent) return;

  promptEvent.prompt();

  promptEvent.userChoice.then((result: any) => {
    if (result.outcome === "accepted") {
      console.log("✅ User accepted the install prompt");
    } else {
      console.log("❌ User dismissed the install prompt");
    }

    canInstall.value = false;
    deferredPrompt.value = null;
  });
}
</script>
