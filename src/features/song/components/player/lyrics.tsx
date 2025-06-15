import { cn } from "@/lib/utils";
import { useConfiguration } from "@/providers/configuration/use-configuration";
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
  const onClick = useCallback(() => {
    if (item.isActive) return;

    const startTime = item.data.startTime;
    if (startTime !== undefined) {
      songManager.timer.setTime(startTime);
    }
  }, [item.data.startTime, item.isActive, songManager.timer]);

  return (
    <p
      className={cn("text-center", {
        ["font-bold text-xl"]: item.isActive,
        ["hover:underline cursor-pointer"]: !item.isActive,
      })}
      onClick={onClick}
    >
      <i>{formatDuration(item.data.startTime)} </i>- {item.data.text}
      {item.data.endTime ? (
        <i>{` - ${formatDuration(item.data.endTime)}`}</i>
      ) : (
        ""
      )}
    </p>
  );
};
