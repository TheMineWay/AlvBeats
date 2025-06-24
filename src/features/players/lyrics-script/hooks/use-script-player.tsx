import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
import { useWakeLock } from "@features/song/hooks/screen/use-wake-lock";
import { useEffect, useRef, useState } from "react";

export const useScriptPlayer = (song: Song) => {
  const {
    configuration: { player: playerConfig },
  } = useConfiguration();

  useWakeLock({ disabled: !playerConfig.wakeLock });

  const [speedMultiplier, setSpeedMultiplier] = useState(20); // px per second
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const lastTimestamp = useRef<number | null>(null);

  useEffect(() => {
    const step = (timestamp: number) => {
      lastTimestamp.current ??= timestamp;
      const delta = timestamp - lastTimestamp.current;
      lastTimestamp.current = timestamp;

      const distance = (speedMultiplier * delta) / 1000; // px per frame

      if (scrollRef.current) {
        scrollRef.current.scrollTop += distance;
      }

      animationFrame.current = requestAnimationFrame(step);
    };

    if (isPlaying) {
      lastTimestamp.current = null;
      animationFrame.current = requestAnimationFrame(step);
    } else if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };
  }, [isPlaying, speedMultiplier]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return {
    song,
    scrollRef,
    isPlaying,
    play,
    pause,
    speedMultiplier,
    setSpeedMultiplier,
  };
};

export type UseScriptPlayer = ReturnType<typeof useScriptPlayer>;
