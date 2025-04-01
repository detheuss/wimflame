import useBreathingSession from "@/composables/useBreathingSession";
import { ref, type Ref } from "vue";

export type WimflameSoundEffectIdT =
  | "gong"
  | "sonar"
  | "action"
  | "doppler"
  | "journey";
export type WimflameMusicTrackIdT = "into-the-void" | "with-frost-by-my-side";
type WimflameSpeechT =
  // Breathing cues
  | "breathe-in"
  | "breathe-in-2"
  | "breathe-out"
  | "breathe-out-2"
  | "breath-flow"

  // Time markers
  | "one-minute"
  | "two-minutes"
  | "three-minutes"
  | "four-minutes"
  | "five-minutes"

  // Retention phases
  | "retention"
  | "retention-1"
  | "retention-2"
  | "retention-3"
  | "retention-4"

  // Transitional/ending cues
  | "no-pause"
  | "last-breath"
  | "recovery-in";

export type WimflameMusicTrackT = {
  id: WimflameMusicTrackIdT; // fileName without extension
  title: string;
  author: string;
};

export const WIMFLAME_MUSIC_TRACKS: WimflameMusicTrackT[] = [
  {
    id: "into-the-void",
    title: "Into The Void",
    author: "kalsstockmedia",
  },
  {
    id: "with-frost-by-my-side",
    title: "Frost By My Side",
    author: "kalsstockmedia",
  },
];

export type WimflameSoundEffectsT = {
  id: WimflameSoundEffectIdT;
  title: string;
  author?: string;
};

export const WIMFLAME_SOUND_EFFECTS: WimflameSoundEffectsT[] = [
  {
    id: "gong",
    title: "Gong",
  },
  {
    id: "doppler",
    title: "Doppler",
  },
  {
    id: "sonar",
    title: "Sonar",
  },
  {
    id: "action",
    title: "Action",
  },
  {
    id: "journey",
    title: "Journey",
  },
];

export const findAudio = (
  id: WimflameMusicTrackIdT | WimflameSoundEffectIdT,
  isMusicTrack?: boolean,
) => {
  const searchingIn = isMusicTrack
    ? WIMFLAME_MUSIC_TRACKS
    : WIMFLAME_SOUND_EFFECTS;

  return searchingIn.find((item) => item.id == id);
};

/**Used for button sounds that I don't want to stop between phases */
export const playUnconstrainedSound = (soundName: WimflameSoundEffectIdT) => {
  const relativePath = `audio/sounds/${soundName}.mp3`;
  const audio = new Audio(relativePath);
  audio.play();
  return audio;
};

export const createConstrainedAudio = (relativePath: string, id: string) => {
  const audio = new Audio(relativePath);
  audio.id = id;
  audio.onended = () => removeFromCurrentlyPlaying(audio);
  currentlyPlaying.value.add(audio);
  return audio;
};

const currentlyPlaying: Ref<Set<HTMLAudioElement>> = ref(new Set());

const removeFromCurrentlyPlaying = (audio: HTMLAudioElement) => {
  currentlyPlaying.value.delete(audio);
};

export const stopAllConstrainedAudio = () => {
  currentlyPlaying.value.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  currentlyPlaying.value.clear();
};

export const useAudio = () => {
  const guidanceAudioQuery = ref<Set<ReturnType<typeof setTimeout>>>(new Set());

  const { settings } = useBreathingSession();

  // plays sound and returns the sound object
  const playSound = (soundName: WimflameSoundEffectIdT) => {
    const relativePath = `audio/sounds/${soundName}.mp3`;
    const audio = createConstrainedAudio(relativePath, soundName);
    audio.volume = settings.audio.volumes.sounds / 100;
    audio.play();
    return audio;
  };

  const playTrack = (trackName: WimflameMusicTrackIdT) => {
    const relativePath = `audio/tracks/${trackName}.mp3`;
    const audio = createConstrainedAudio(relativePath, trackName);
    audio.volume = settings.audio.volumes.music / 100;
    audio.play();
    return audio;
  };

  const playSpeech = (speechName: WimflameSpeechT) => {
    const relativePath = `audio/speech/${speechName}.mp3`;
    const audio = createConstrainedAudio(relativePath, speechName);
    audio.volume = settings.audio.volumes.speech / 100;
    audio.play();
    return audio;
  };

  const playRandomBreatheIn = () => {
    const options: WimflameSpeechT[] = ["breathe-in", "breathe-in-2"];
    playSpeech(options[Math.floor(Math.random() * options.length)]);
  };

  const playRandomBreatheOut = () => {
    const options: WimflameSpeechT[] = ["breathe-out", "breathe-out-2"];
    playSpeech(options[Math.floor(Math.random() * options.length)]);
  };

  const setGuidanceAudioQuery = (fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      guidanceAudioQuery.value.delete(id); // Clean up after it runs
      fn();
    }, delay);
    guidanceAudioQuery.value.add(id);
  };

  const clearGuidanceAudioQuery = () => {
    guidanceAudioQuery.value.forEach(clearTimeout);
    guidanceAudioQuery.value.clear();
  };

  return {
    guidanceAudioQuery,
    setGuidanceAudioQuery,
    clearGuidanceAudioQuery,
    currentlyPlaying,
    playSound,
    playTrack,
    playSpeech,
    playRandomBreatheIn,
    playRandomBreatheOut,
  };
};
