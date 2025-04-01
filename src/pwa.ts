// // src/pwa.ts
// import { ref } from "vue";
// import { registerSW } from "virtual:pwa-register";

// export const showUpdateModal = ref(false);

// const updateSW = registerSW({
//   onNeedRefresh() {
//     console.log("🔥 New update available");
//     showUpdateModal.value = true;
//   },
//   onOfflineReady() {
//     console.log("✅ App ready for offline use");
//   },
// });

// export const applyUpdate = () => {
//   updateSW(true); // triggers skipWaiting and reload
// };

import { registerSW } from "virtual:pwa-register";

const intervalMS = 60 * 60 * 1000;

export const updateSW = registerSW({
  onRegisteredSW(swUrl, r) {
    r &&
      setInterval(async () => {
        if (r.installing || !navigator) return;

        if ("connection" in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
          cache: "no-store",
          headers: {
            cache: "no-store",
            "cache-control": "no-cache",
          },
        });

        if (resp?.status === 200) await r.update();
      }, intervalMS);
  },
});
