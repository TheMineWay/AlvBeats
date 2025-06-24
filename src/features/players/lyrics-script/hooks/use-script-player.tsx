import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
import { useWakeLock } from "@features/song/hooks/screen/use-wake-lock";
import { useEffect, useRef, useState } from "react";

export const useScriptPlayer = (song: Song) => {
  const {
    configuration: { player: playerConfig },
  } = useConfiguration();

  useWakeLock({ disabled: !playerConfig.wakeLock });

  const [speed, setSpeed] = useState(10); // px per second
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animation = useRef<number | null>(null);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const scrollElement = scrollRef.current;

  useEffect(() => {
    if (!isPlaying || !scrollElement) {
      if (!isPlaying && animation.current)
        cancelAnimationFrame(animation.current);
      return;
    }

    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = scrollElement.clientHeight;

    const animFn = () => {
      const scrollTop = scrollElement.scrollTop;
      const targetScrollTop = scrollHeight - clientHeight;

      if (scrollTop < targetScrollTop) {
        scrollElement.scrollTo({
          top: scrollTop + speed,
          behavior: "smooth",
        });
        animation.current = requestAnimationFrame(animFn);
      } else {
        if (animation.current) cancelAnimationFrame(animation.current);
        setIsPlaying(false); // Stop playing when the end is reached
      }
    };

    animation.current = requestAnimationFrame(animFn);
  }, [speed, scrollElement, isPlaying]);

  return {
    song,
    scrollRef,
    isPlaying,
    play,
    pause,
    speed,
    setSpeed,
  };
};

export type UseScriptPlayer = ReturnType<typeof useScriptPlayer>;
