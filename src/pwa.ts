// src/pwa.ts
import { ref } from "vue";
import { registerSW } from "virtual:pwa-register";

export const showUpdateModal = ref(false);

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("🔥 New update available");
    showUpdateModal.value = true;
  },
  onOfflineReady() {
    console.log("✅ App ready for offline use");
  },
});

export const applyUpdate = () => {
  updateSW(true); // triggers skipWaiting and reload
};
