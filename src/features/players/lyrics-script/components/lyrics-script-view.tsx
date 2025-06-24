import { LyricsLine } from "@components/shared/lyrics/lyrics-line";
import { UseScriptPlayer } from "@features/players/lyrics-script/hooks/use-script-player";

export type Props = {
  manager: UseScriptPlayer;
};

export const LyricsScriptView: FC<Props> = ({ manager }) => {
  const { song, scrollRef } = manager;

  return (
    <div className="h-full overflow-y-scroll" ref={scrollRef}>
      {song.lyrics.map((lyric, idx) => (
        <LyricsLine key={idx} line={lyric} />
      ))}
    </div>
  );
};
