import { Song } from "@/shared/schemas/song/song.schema";
import { LyricsLine } from "@components/shared/lyrics/lyrics-line";

export type Props = {
  song: Song;
};

export const LyricsScriptView: FC<Props> = ({ song }) => {
  return (
    <div>
      {song.lyrics.map((lyric, idx) => (
        <LyricsLine key={idx} line={lyric} />
      ))}
    </div>
  );
};
