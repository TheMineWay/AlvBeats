import {
  Lyric,
  LyricSegmentType,
} from "@/shared/schemas/song/lyrics/lyric.schema";

const CN = "";

type Props = {
  line: Lyric;
};

export const LyricsLine: FC<Props> = ({ line }) => {
  if (line.type === LyricSegmentType.MUSIC) return <p className={CN}>🎶</p>;
  return (
    <p className={CN}>
      {line.segments.map((segment) => segment.text).join(" ")}
    </p>
  );
};
