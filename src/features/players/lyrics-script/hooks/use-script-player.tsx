import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
import { useWakeLock } from "@features/song/hooks/screen/use-wake-lock";
import { useEffect, useRef, useState } from "react";

export const useScriptPlayer = (song: Song) => {
  const {
    configuration: { player: playerConfig },
  } = useConfiguration();

  useWakeLock({ disabled: !playerConfig.wakeLock });

  const [speed, setSpeed] = useState(50); // px per second
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number>(null);
  const lastFrameTime = useRef<number | null>(null);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const scrollStep = (timestamp: number) => {
    if (!scrollRef.current) return;

    lastFrameTime.current ??= timestamp;

    const delta = timestamp - lastFrameTime.current;
    const deltaPx = (speed * delta) / 1000; // convert ms to seconds

    scrollRef.current.scrollTop += deltaPx;
    lastFrameTime.current = timestamp;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const reachedBottom = scrollTop + clientHeight >= scrollHeight;

    if (!reachedBottom && isPlaying) {
      animationRef.current = requestAnimationFrame(scrollStep);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      lastFrameTime.current = null;
      animationRef.current = requestAnimationFrame(scrollStep);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed]);

  const hasReachedEnd =
    scrollRef.current &&
    scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
      scrollRef.current.scrollHeight;

  const hasScroll =
    scrollRef.current &&
    scrollRef.current.scrollHeight > scrollRef.current.clientHeight;

  return {
    song,
    scrollRef,
    isPlaying,
    play,
    pause,
    speed,
    setSpeed,
    hasReachedEnd,
    hasScroll,
  };
};

export type UseScriptPlayer = ReturnType<typeof useScriptPlayer>;
