import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
import { useWakeLock } from "@features/song/hooks/screen/use-wake-lock";

export const useScriptPlayer = (song: Song) => {
  const {
    configuration: { player: playerConfig },
  } = useConfiguration();
  useWakeLock({ disabled: !playerConfig.wakeLock });

  return { song };
};

export type UseScriptPlayer = ReturnType<typeof useScriptPlayer>;
