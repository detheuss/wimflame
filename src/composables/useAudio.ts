import { ref } from "vue";

type WimflameSoundT = "gong" | "sonar" | "action" | "doppler" | "journey";
type WimflameTrackT = "the-old-shaman" | "music-1";
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

// plays sound and returns the sound object
export const playSound = (soundName: WimflameSoundT) => {
  const audio = new Audio(`audio/sounds/${soundName}.mp3`);
  audio.play();

  return audio;
};

export const playTrack = (trackName: WimflameTrackT) => {
  const audio = new Audio(`audio/track/${trackName}.mp3`);
  audio.play();

  return audio;
};

export const playSpeech = (speechName: WimflameSpeechT) => {
  const audio = new Audio(`audio/speech/${speechName}.mp3`);
  audio.play();

  return audio;
};

export const playRandomBreatheIn = () => {
  const options: WimflameSpeechT[] = ["breathe-in", "breathe-in-2"];
  playSpeech(options[Math.floor(Math.random() * options.length)]);
};

export const playRandomBreatheOut = () => {
  const options: WimflameSpeechT[] = ["breathe-out", "breathe-out-2"];
  playSpeech(options[Math.floor(Math.random() * options.length)]);
};

export const useAudio = () => {
  const guidanceAudioQuery = ref<Set<ReturnType<typeof setTimeout>>>(new Set());

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
  };
};
