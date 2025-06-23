import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
import { LyricsScriptView } from "@features/players/lyrics-script/components/lyrics-script-view";
import { useWakeLock } from "@features/song/hooks/screen/use-wake-lock";

type Props = {
  song: Song;
};

export const LyricsScriptPlayer: FC<Props> = ({ song }) => {
  const {
    configuration: { player: playerConfig },
  } = useConfiguration();
  useWakeLock({ disabled: !playerConfig.wakeLock });

  return <LyricsScriptView song={song} />;
};
