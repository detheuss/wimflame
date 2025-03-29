import { useToast } from "@/components/ui/toast";
import { onMounted, reactive, ref, type Reactive, type Ref } from "vue";

const getErrorToast = (e: any) => {
  return {
    title: "Error: Niečo sa pojebalo",
    description: `Help me out by submitting a screenshot of this message with your device model name to detheuss@gmail.com. ${e}`,
    duration: 5000,
    variant: "destructive",
  };
};

export type BreathingSettingsT = {
  breathingSpeed: number;
  breaths: number;
  rounds: number;
  pauseBetweenRounds: number;
  pauseBeforeFirstRound: number;
  holdAfterInhale: number;
};

export type MusicSettingsT = {
  gongName: string;
  trackName: string;
};

export type SessionSettings = {
  breathing: BreathingSettingsT;
  music?: MusicSettingsT;
};

export type BreathingSettingsKey = keyof BreathingSettingsT;

export type BreathingSessionPhaseT =
  | "preparation"
  | "before"
  | "break"
  | "breathing"
  | "retention"
  | "recovery";

const currentPhase: Ref<BreathingSessionPhaseT> = ref("before");

export const DEFAULT_BREATHING_SETTINGS: BreathingSettingsT = {
  breathingSpeed: 35,
  breaths: 30,
  holdAfterInhale: 15,
  pauseBeforeFirstRound: 0,
  pauseBetweenRounds: 0,
  rounds: 3,
};

export const DEFAULT_MUSIC_SETTINGS: MusicSettingsT = {
  gongName: "gong",
  trackName: "the-old-shaman",
};

const settings: Reactive<SessionSettings> = reactive({
  breathing: { ...DEFAULT_BREATHING_SETTINGS },
  music: { ...DEFAULT_MUSIC_SETTINGS },
});

const loadSettingsFromLS = () => {
  try {
    const rawFromLS = localStorage.getItem("wimflameSettings");
    if (!rawFromLS) return;

    const parsedFromLS: SessionSettings = JSON.parse(rawFromLS);

    // Validate and merge with defaults to ensure type safety
    if (parsedFromLS.breathing) {
      settings.breathing = {
        ...DEFAULT_BREATHING_SETTINGS,
        ...parsedFromLS.breathing,
      };
    }
    if (parsedFromLS.music) {
      settings.music = {
        ...DEFAULT_MUSIC_SETTINGS,
        ...parsedFromLS.music,
      };
    }
  } catch (e) {
    console.error("Failed to load settings:", e);
  }
};

const useBreathingSession = () => {
  const { toast } = useToast();

  const saveSettingsToLS = () => {
    try {
      const serialized = JSON.stringify(settings);
      localStorage.setItem("wimflameSettings", serialized);
    } catch (e) {
      console.error("Failed to save settings:", e);
    }
  };

  const resetBreathingSettings = () => {
    settings.breathing = { ...DEFAULT_BREATHING_SETTINGS };
    try {
      saveSettingsToLS();
      toast({
        title: "Settings have been reset!",
        description: "Original settings are now saved.",
        duration: 1250,
      });
    } catch (e: any) {
      toast(getErrorToast(e) as any);
    }
  };
  onMounted(() => {
    loadSettingsFromLS();
  });
  return {
    currentPhase,
    settings,
    resetBreathingSettings,
    saveSettingsToLS,
  };
};

export default useBreathingSession;
