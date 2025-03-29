export const checkIsIOSPojebanySkurvenyRakByPozulTotuFirmu = (): boolean => {
  const platform = navigator.platform;
  const ua = navigator.userAgent;
  const maxTouch = (navigator as any).maxTouchPoints;

  return (
    /iPad|iPhone|iPod/.test(ua) ||
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(platform) ||
    (platform === "MacIntel" && maxTouch > 1)
  );
};

export const scrollToElementById = (id: string) => {
  const el = document.getElementById(id);
  console.log(el);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth" });
};

export const secondsToMinutes = (seconds: number | null): string | null => {
  if (seconds == null) return seconds;

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
