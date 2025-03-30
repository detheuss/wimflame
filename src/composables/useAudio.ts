import { ref, type Ref } from "vue";

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
  const relativePath = `audio/sounds/${soundName}.mp3`;
  const audio = createConstrainedAudio(relativePath);
  audio.play();
  return audio;
};

/**Used for button sounds that I don't want to stop between phases */
export const playUnconstrainedSound = (soundName: WimflameSoundT) => {
  const relativePath = `audio/sounds/${soundName}.mp3`;
  const audio = new Audio(relativePath);
  audio.play();
  return audio;
};

export const playTrack = (trackName: WimflameTrackT) => {
  const relativePath = `audio/tracks/${trackName}.mp3`;
  const audio = createConstrainedAudio(relativePath);
  audio.play();
  return audio;
};

export const playSpeech = (speechName: WimflameSpeechT) => {
  const relativePath = `audio/speech/${speechName}.mp3`;
  const audio = createConstrainedAudio(relativePath);
  audio.play();
  return audio;
};

export const createConstrainedAudio = (relativePath: string) => {
  const audio = new Audio(relativePath);
  audio.onended = () => removeFromCurrentlyPlaying(audio);
  currentlyPlaying.value.add(audio);
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

export const currentlyPlaying: Ref<Set<HTMLAudioElement>> = ref(new Set());

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
