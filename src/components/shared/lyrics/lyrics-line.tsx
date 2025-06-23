import { cn } from "@/lib/utils";
import { useConfiguration } from "@/providers/configuration/use-configuration";
import {
  Lyric,
  LyricSegmentType,
} from "@/shared/schemas/song/lyrics/lyric.schema";
import { CSSProperties } from "react";

const CN = "";

type Props = {
  line: Lyric;
};

export const LyricsLine: FC<Props> = ({ line }) => {
  const {
    configuration: {
      lyrics: { fontSize, align, fontFamily },
    },
  } = useConfiguration();

  const className = cn(CN);
  const style: CSSProperties = {
    fontSize: `${fontSize}px`,
    textAlign: align,
    fontFamily,
  };

  if (line.type === LyricSegmentType.MUSIC)
    return (
      <p className={className} style={style}>
        🎶
      </p>
    );

  return (
    <p className={className} style={style}>
      {line.segments.map((segment) => segment.text).join(" ")}
    </p>
  );
};
