// src/pwa.ts
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("🔥 New update available");
  },
  onOfflineReady() {
    console.log("✅ App ready for offline use");
  },
});

export const applyUpdate = () => {
  updateSW(true);
};
