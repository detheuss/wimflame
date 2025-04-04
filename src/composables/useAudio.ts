import useBreathingSession from "@/composables/useBreathingSession";
import { computed, ref, watch, type Ref } from "vue";

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
  if (!currentlyPlayingMusicTrack.value) return;
  currentlyPlayingMusicTrack.value.pause();
  currentlyPlayingMusicTrack.value.currentTime = 0;
  currentlyPlayingMusicTrack.value = null;
};

export const stopAllConstrainedAudio = () => {
  stopAllConstrainedSpeechAndSound();
  stopConstrainedMusicTrack();
};

const audioContext: Ref<AudioContext | null | undefined> = ref();
audioContext.value?.onstatechange;

const loadAudioBuffer = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.value?.decodeAudioData(arrayBuffer);
};

const isBreathingLoopPlaying = ref(false);

// controls volume
const breathGainNode = ref();
const inhaleBuffer: Ref<AudioBuffer | undefined> = ref();
const exhaleBuffer: Ref<AudioBuffer | undefined> = ref();

export const useAudio = () => {
  const guidanceAudioQuery = ref<Set<ReturnType<typeof setTimeout>>>(new Set());

  const { settings } = useBreathingSession();

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

  const playRandomBreatheInSpeech = () => {
    const options: WimflameSpeechT[] = ["breathe-in", "breathe-in-2"];
    playSpeech(options[Math.floor(Math.random() * options.length)]);
  };

  const playRandomBreatheOutSpeech = () => {
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

  const breathingAudioQuery = ref<Set<ReturnType<typeof setTimeout>>>(
    new Set(),
  );

  const setBreathingAudioQuery = (fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      breathingAudioQuery.value.delete(id); // Clean up after execution
      fn();
    }, delay);
    breathingAudioQuery.value.add(id);
  };

  const clearBreathingAudioQuery = () => {
    breathingAudioQuery.value.forEach(clearTimeout);
    breathingAudioQuery.value.clear();
  };

  // BREATHING LOOP MAGIC
  const activeAudioBufferSources = ref<Set<AudioBufferSourceNode>>(new Set());

  const stopAndClearAllActiveAudioBuffers = () => {
    activeAudioBufferSources.value.forEach((source) => {
      try {
        source.stop();
      } catch (_) {
        console.error(_);
      }
    });
    activeAudioBufferSources.value.clear();
  };

  const initiateAudioContext = async () => {
    audioContext.value = new (window.AudioContext ||
      (window as any)?.webkitAudioContext)();

    // create & adjust gain (volume)
    breathGainNode.value = audioContext.value.createGain();
    breathGainNode.value.gain.value = settings.audio.volumes.breathing || 0.8;

    inhaleBuffer.value = await loadAudioBuffer("/audio/sounds/inhale.mp3");
    exhaleBuffer.value = await loadAudioBuffer("/audio/sounds/exhale.mp3");
  };

  // update breathing volume when settings chage
  watch(
    () => settings.audio.volumes.breathing,
    (newVal) => {
      if (!breathGainNode) return;
      breathGainNode.value.gain.value = newVal ?? 0.8;
    },
  );

  // const playBreatheIn = (delay?: number) => {
  //   const inhaleSource = createConstrainedBufferSource(
  //     inhaleBuffer,
  //     breathGainNode,
  //   );

  //   inhaleSource.start(delay ?? 0);
  // };

  // const playBreatheOut = (delay?: number) => {
  //   const exhaleSource = createConstrainedBufferSource(
  //     exhaleBuffer,
  //     breathGainNode,
  //   );

  //   exhaleSource.start(delay ?? 0);
  // };

  const createConstrainedBufferSource = (
    buffer: AudioBuffer,
    gain?: GainNode,
    onended?: () => any,
  ) => {
    if (!audioContext.value) {
      throw new Error("Missing Audio Context");
    }

    const source = audioContext.value.createBufferSource();
    source.buffer = buffer;

    // gain is like "resistor" middleware to change volume
    if (gain) {
      gain.connect(audioContext.value.destination);
      source.connect(gain);
    } else {
      // if no gain - connect directly
      source.connect(audioContext.value.destination);
    }

    activeAudioBufferSources.value.add(source);
    source.onended = () => {
      // always remove
      activeAudioBufferSources.value.delete(source);
      // custom actions
      onended?.();
    };

    return source;
  };

  const playBreathingLoop = async () => {
    if (!audioContext.value || !inhaleBuffer.value || !exhaleBuffer.value)
      return;

    if (!isBreathingLoopPlaying.value) {
      clearBreathingAudioQuery();
      stopAndClearAllActiveAudioBuffers();
      return;
    }
    const inhaleSource = createConstrainedBufferSource(
      inhaleBuffer.value,
      breathGainNode.value,
    );

    const exhaleSource = createConstrainedBufferSource(
      exhaleBuffer.value,
      breathGainNode.value,
    );

    const breathingSpeedMs = settings.breathing.breathingSpeed * 100;
    const exhaleDelayMs = breathingSpeedMs / 2;

    inhaleSource.start();
    setBreathingAudioQuery(() => exhaleSource.start(), exhaleDelayMs);

    setBreathingAudioQuery(() => playBreathingLoop(), breathingSpeedMs);
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
    playRandomBreatheInSpeech,
    playRandomBreatheOutSpeech,
    audioContext,
    loadAudioBuffer,
    inhaleBuffer,
    exhaleBuffer,
    isBreathingLoopPlaying,
    playBreathingLoop,
    stopAndClearAllActiveAudioBuffers,
    initiateAudioContext,
    clearBreathingAudioQuery,
  };
};
