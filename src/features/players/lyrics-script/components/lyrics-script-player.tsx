import { Song } from "@/shared/schemas/song/song.schema";
import { ScriptPlayerActions } from "@features/players/lyrics-script/components/actions/script-player-actions";
import { LyricsScriptView } from "@features/players/lyrics-script/components/lyrics-script-view";
import { useScriptPlayer } from "@features/players/lyrics-script/hooks/use-script-player";

type Props = {
  song: Song;
};

export const LyricsScriptPlayer: FC<Props> = ({ song }) => {
  const manager = useScriptPlayer(song);

  return (
    <div className="flex flex-col h-full w-full gap-4 p-2">
      <ScriptPlayerActions manager={manager} />
      <LyricsScriptView manager={manager} />
    </div>
  );
};
