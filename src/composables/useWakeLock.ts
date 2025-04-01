import { useToast } from "@/components/ui/toast";
import { ref, type Ref } from "vue";

const baseWakeErrorToast = {
  duration: 5000,
  variant: "destructive",
};

const showWakeError = (
  toast: ReturnType<typeof useToast>["toast"],
  title: string,
  description: string,
) => {
  toast({
    ...baseWakeErrorToast,
    title,
    description,
  } as any);
};

export const useWakeLock = () => {
  const wakeLock: Ref<WakeLockSentinel | null | undefined> = ref();
  const { toast } = useToast();

  const requestWakeLock = async (): Promise<WakeLockSentinel | null> => {
    return navigator.wakeLock
      .request("screen")
      .then((res) => {
        console.debug("Screen Wake Lock REQUESTED! Response", res);
        wakeLock.value = res;
        return res;
      })
      .catch((e) => {
        console.error("Error during Screen Wake Lock request", e);
        showWakeError(
          toast,
          "Hmm... Your device won’t keep the screen awake.",
          `This can happen on low battery or some Apple devices. Try restarting the app. If it keeps happening, send me a screenshot of this error to detheuss@gmail.com. ERROR: ${e}`,
        );
        return e;
      });
  };

  const releaseWakeLock = async (): Promise<void> => {
    if (!wakeLock.value) {
      console.debug("No Screen Wake Lock - nothing to release");
      return Promise.resolve();
    }

    return wakeLock.value
      .release()
      .then(() => {
        console.debug("Screen Wake Lock RELEASED!");
        wakeLock.value = null;
      })
      .catch((e) => {
        console.error("Error during Screen Wake Lock release", e);
        showWakeError(
          toast,
          "Error during Screen Wake Lock release",
          `Failed to release the wake lock. ERROR: ${e}`,
        );
      });
  };

  return {
    wakeLock,
    requestWakeLock,
    releaseWakeLock,
  };
};
