import { cn } from "@/lib/utils";
import { useConfiguration } from "@/providers/configuration/use-configuration";
import {
  LyricsLineSegmentType,
  type LyricsLine as LyricsLineType,
} from "@/shared/schemas/song/lyrics/lyrics-line.schema";
import { CSSProperties } from "react";

const CN = "";

type Props = {
  line: LyricsLineType;
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

  if (line.type === LyricsLineSegmentType.MUSIC)
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
