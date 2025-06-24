import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
import { useWakeLock } from "@features/song/hooks/screen/use-wake-lock";
import { useRef, useState } from "react";

export const useScriptPlayer = (song: Song) => {
  const {
    configuration: { player: playerConfig },
  } = useConfiguration();
  useWakeLock({ disabled: !playerConfig.wakeLock });

  const [speedMultiplier, setSpeedMultiplier] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

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
