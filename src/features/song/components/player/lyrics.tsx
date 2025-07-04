import { cn } from "@/lib/utils";
import { useConfiguration } from "@/providers/configuration/use-configuration";
import {
  Lyric,
  LyricSegmentType,
} from "@/shared/schemas/song/lyrics/lyric.schema";
import { formatDuration } from "@/shared/utils/time/format-duration";
import { UseSong } from "@features/song/hooks/player/use-song";
import { useCallback, useMemo } from "react";

type Props = {
  songManager: UseSong;
};

export const Lyrics: FC<Props> = ({ songManager }) => {
  const { lyrics: _lyrics, activeLyric } = songManager;

  const {
    configuration: {
      player: { lyricsOffset },
    },
  } = useConfiguration();

  const lyrics = useMemo(() => {
    return _lyrics.slice(
      Math.max(0, activeLyric.index - lyricsOffset.anterior),
      Math.min(_lyrics.length, activeLyric.index + lyricsOffset.posterior + 1)
    );
  }, [
    _lyrics,
    activeLyric.index,
    lyricsOffset.anterior,
    lyricsOffset.posterior,
  ]);

  return (
    <div>
      {lyrics.map((item, idx) => (
        <Item key={idx} item={item} songManager={songManager} />
      ))}
    </div>
  );
};

type ItemProps = {
  item: UseSong["lyrics"][number];
  songManager: UseSong;
};

const Item: FC<ItemProps> = ({ item, songManager }) => {
  const {
    configuration: {
      player: { lyricsTimestamps },
    },
  } = useConfiguration();

  const isAnyTimestamp = lyricsTimestamps.showStart || lyricsTimestamps.showEnd;

  const onClick = useCallback(() => {
    if (item.isActive) return;

    const startTime = item.data.startTime;
    if (startTime !== undefined) {
      songManager.timer.setTime(startTime);
    }
  }, [item.data.startTime, item.isActive, songManager.timer]);

  return (
    <div
      className={cn(
        "text-center flex gap-4 items-center",
        isAnyTimestamp ? "justify-between" : "justify-center",
        item.isActive ? "font-bold text-xl" : "hover:underline cursor-pointer"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {lyricsTimestamps.showStart && (
        <small className="text-xs">{formatDuration(item.data.startTime)}</small>
      )}
      <RenderLyrics lyric={item.data} />
      {item.data.endTime && lyricsTimestamps.showEnd && (
        <small className="text-xs">{formatDuration(item.data.endTime)}</small>
      )}
    </div>
  );
};

/* Internal */

type RenderLyricsProps = {
  lyric: Lyric;
};

const RenderLyrics: FC<RenderLyricsProps> = ({ lyric }) => {
  return (
    <p className="text-center">
      {lyric.type === LyricSegmentType.TEXT ? (
        lyric.segments.map((s) => s.text).join(" ")
      ) : (
        <i>🎵🎵🎵</i>
      )}
    </p>
  );
};
