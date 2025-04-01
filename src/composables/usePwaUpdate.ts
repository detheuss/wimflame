import { ref } from "vue";
import { registerSW } from "virtual:pwa-register";

const showUpdateModal = ref(false);

const updateSW = registerSW({
  onNeedRefresh() {
    showUpdateModal.value = true;
  },
  onOfflineReady() {
    console.log("[WIMFLAME] Ready to work offline");
  },
});

export const usePwaUpdate = () => {
  const applyUpdate = () => {
    updateSW(true);
  };

  return {
    showUpdateModal,
    applyUpdate,
  };
};
