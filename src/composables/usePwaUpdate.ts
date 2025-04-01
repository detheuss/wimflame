import { ref } from "vue";
import { registerSW } from "virtual:pwa-register";

const showUpdateModal = ref(false);

export const usePwaUpdate = () => {
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
