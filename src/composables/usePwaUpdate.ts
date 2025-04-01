import { ref } from "vue";
import { registerSW } from "virtual:pwa-register";

export const usePwaUpdate = () => {
  const showUpdateModal = ref(false);

  const updateSW = registerSW({
    onNeedRefresh() {
      showUpdateModal.value = true;
    },
    onOfflineReady() {
      console.log("[PWA] Ready to work offline");
    },
  });

  const applyUpdate = () => {
    updateSW(true);
  };

  return {
    showUpdateModal,
    applyUpdate,
  };
};
