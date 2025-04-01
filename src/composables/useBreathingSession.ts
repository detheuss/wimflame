import { useToast } from "@/components/ui/toast";
import type {
  WimflameSoundEffectIdT,
  WimflameMusicTrackIdT,
} from "@/composables/useAudio";
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
  trackId: WimflameMusicTrackIdT;
  soundId: WimflameSoundEffectIdT;
  volumes: {
    music: number;
    speech: number;
    sounds: number;
    breathing: number;
  };
  preferences: {
    isMusicDuringBreathing: boolean;
    isMusicDuringRetention: boolean;
    isSoundPlayed: boolean;
    isGuidancePlayed: boolean;
    isBreathingPlayed: boolean;
  };
};

export type SessionSettings = {
  breathing: BreathingSettingsT;
  audio: MusicSettingsT;
};

export type BreathingSettingsKey = keyof BreathingSettingsT;

export type BreathingSessionPhaseT =
  | "before"
  | "preparation"
  | "breathing"
  | "retention"
  | "recovery"
  | "break";

const currentPhase: Ref<BreathingSessionPhaseT> = ref("before");

const currentRound: Ref<number> = ref(0);

const phases: BreathingSessionPhaseT[] = [
  "before",
  "preparation",
  "breathing",
  "retention",
  "recovery",
  "break",
];

const goToNextPhase = () => {
  // this is done to avoid bugs if phase ends in setTimeout (e.g. the RecoveryView)
  if (currentPhase.value == "before") {
    console.warn(
      "Not proceeding to next phase because current phase is 'before'",
      "Use direct assignment to currentPhase value in order to start the session.",
    );
  }

  const nextItemIndex =
    phases.findIndex((item) => item == currentPhase.value) + 1;

  let nextPhase = phases[nextItemIndex];

  if (!nextPhase) {
    // undefined nextPhase indicates we are at "break"
    nextPhase =
      currentRound.value == settings.breathing.rounds // currentRound is increased onMounted in BreathingView
        ? "before" // this was last round, we go back to Home Screen
        : "breathing"; // not the last round, we go to next phase
  }

  if (currentRound.value === settings.breathing.rounds) {
    nextPhase = "before";
  }

  if (nextPhase === "break" && !settings.breathing.pauseBetweenRounds) {
    nextPhase = phases[nextItemIndex + 1];
  }

  currentPhase.value = nextPhase ?? "breathing";
};

export const DEFAULT_BREATHING_SETTINGS: BreathingSettingsT = {
  breathingSpeed: 35,
  breaths: 30,
  holdAfterInhale: 15,
  pauseBeforeFirstRound: 0,
  pauseBetweenRounds: 0,
  rounds: 3,
};

export const DEFAULT_MUSIC_SETTINGS: MusicSettingsT = {
  trackId: "into-the-void",
  soundId: "gong",
  volumes: {
    music: 0.8,
    speech: 0.8,
    sounds: 0.8,
    breathing: 0.8,
  },
  preferences: {
    isMusicDuringBreathing: false,
    isMusicDuringRetention: true,
    isSoundPlayed: true,
    isGuidancePlayed: true,
    isBreathingPlayed: true,
  },
};

const settings: Reactive<SessionSettings> = reactive({
  breathing: { ...DEFAULT_BREATHING_SETTINGS },
  audio: { ...DEFAULT_MUSIC_SETTINGS },
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
    if (parsedFromLS.audio) {
      settings.audio = {
        ...DEFAULT_MUSIC_SETTINGS,
        ...parsedFromLS.audio,
        volumes: {
          ...DEFAULT_MUSIC_SETTINGS.volumes,
          ...(parsedFromLS.audio.volumes ?? {}),
        },
        preferences: {
          ...DEFAULT_MUSIC_SETTINGS.preferences,
          ...(parsedFromLS.audio.preferences ?? {}),
        },
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

  const resetAudioSettings = () => {
    settings.audio = {
      ...DEFAULT_MUSIC_SETTINGS,
      volumes: { ...DEFAULT_MUSIC_SETTINGS.volumes },
      preferences: { ...DEFAULT_MUSIC_SETTINGS.preferences },
    };
    try {
      saveSettingsToLS();
      toast({
        title: "Audio settings have been reset!",
        description: "Original audio settings are now saved.",
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
    currentRound,
    settings,
    resetBreathingSettings,
    resetAudioSettings,
    saveSettingsToLS,
    goToNextPhase,
  };
};

export default useBreathingSession;
