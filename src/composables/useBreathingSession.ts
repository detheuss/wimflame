import { ref, type Ref } from "vue";

export type BreathingSessionPhaseT =
  | "preparation"
  | "before"
  | "break"
  | "breathing"
  | "retention"
  | "recovery";

const currentPhase: Ref<BreathingSessionPhaseT> = ref("before");

const useBreathingSession = () => {
  return {
    currentPhase,
  };
};

export default useBreathingSession;
