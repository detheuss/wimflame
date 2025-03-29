type WimflameSound = "gong" | "sonar";
type WimflameTrack = "the-old-shaman";

// plays sound and returns the sound object
export const playSound = (soundName: WimflameSound) => {
  const audio = new Audio(`audio/sounds/${soundName}.mp3`);
  audio.play();

  return audio;
};

export const playTrack = (trackName: WimflameTrack) => {
  const audio = new Audio(`audio/track/${trackName}.mp3`);
  audio.play();

  return audio;
};
