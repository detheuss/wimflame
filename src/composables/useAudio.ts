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

/**Used for button sounds that I don't want to stop between phases 
 * Should not be exposed!
*/
const playUnconstrainedSound = (
  soundName: WimflameSoundEffectIdT,
  volume = 0.8,
) => {
  const relativePath = `audio/sounds/${soundName}.mp3`;
  const audio = new Audio(relativePath);
  audio.volume = volume;
  audio.play();
  return audio;
};

export const createConstrainedAudio = (
  relativePath: string,
  id: string,
  volume = 0.8,
  isMusicTrack = false,
) => {
  const audio = new Audio(relativePath);
  audio.id = id;
  audio.volume = volume;

  if (isMusicTrack) {
    audio.onended = () => (currentlyPlayingMusicTrack.value = null);
    currentlyPlayingMusicTrack.value = audio;
  } else {
    audio.onended = () => removeAudioFromCurrentlyPlaying(audio);
    currentlyPlayingSpeechAndSound.value.add(audio);
  }

  return audio;
};

const currentlyPlayingMusicTrack: Ref<HTMLAudioElement | null | undefined> =
  ref();

const currentlyPlayingSpeechAndSound: Ref<Set<HTMLAudioElement>> = ref(
  new Set(),
);

const removeAudioFromCurrentlyPlaying = (audio: HTMLAudioElement) => {
  currentlyPlayingSpeechAndSound.value.delete(audio);
};

export const stopAllConstrainedSpeechAndSound = () => {
  currentlyPlayingSpeechAndSound.value.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  currentlyPlayingSpeechAndSound.value.clear();
};

export const stopConstrainedMusicTrack = () => {
  debugger;
  if (!currentlyPlayingMusicTrack.value) return;
  currentlyPlayingMusicTrack.value.pause();
  currentlyPlayingMusicTrack.value.currentTime = 0;
  currentlyPlayingMusicTrack.value = null;
};

export const stopAllConstrainedAudio = () => {
  stopAllConstrainedSpeechAndSound();
  stopConstrainedMusicTrack();
};

export const useAudio = () => {
  const guidanceAudioQuery = ref<Set<ReturnType<typeof setTimeout>>>(new Set());

  const { settings } = useBreathingSession();

  // plays sound and returns the sound object
  const playSound = (
    soundName: WimflameSoundEffectIdT,
    isUnconstrained = false,
  ) => {
    if (!settings.audio.preferences.isSoundPlayed) return;

    let volume = settings.audio.volumes.sounds;

    if (isUnconstrained) {
      return playUnconstrainedSound(soundName, volume);
    }

    const relativePath = `audio/sounds/${soundName}.mp3`;
    const audio = createConstrainedAudio(relativePath, soundName, volume);
    audio.play();
    return audio;
  };

  const playTrack = (trackName: WimflameMusicTrackIdT) => {
    const relativePath = `audio/tracks/${trackName}.mp3`;
    let volume = settings.audio.volumes.music;
    const audio = createConstrainedAudio(relativePath, trackName, volume, true);
    audio.loop = true;
    audio.play();
    return audio;
  };

  const playSpeech = (speechName: WimflameSpeechT) => {
    if (!settings.audio.preferences.isGuidancePlayed) return;

    const relativePath = `audio/speech/${speechName}.mp3`;
    let volume = settings.audio.volumes.speech;
    const audio = createConstrainedAudio(relativePath, speechName, volume);
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
    currentlyPlayingSpeechAndSound,
    currentlyPlayingMusicTrack,
    playSound,
    playTrack,
    playSpeech,
    playRandomBreatheIn,
    playRandomBreatheOut,
  };
};
