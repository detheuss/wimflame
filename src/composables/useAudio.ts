import { ref } from "vue";

type WimflameSoundT = "gong" | "sonar";
type WimflameTrackT = "the-old-shaman";
type WimflameSpeechT =
  | "breath-flow"
  | "breathe-in-2"
  | "breathe-in"
  | "breathe-out-2"
  | "breathe-out"
  | "last-breath"
  | "no-pause"
  | "recovery-in"
  | "retention";

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
