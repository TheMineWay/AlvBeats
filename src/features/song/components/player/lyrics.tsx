import { cn } from "@/lib/utils";
import { formatDuration } from "@/shared/utils/time/format-duration";
import { UseSong } from "@features/song/hooks/player/use-song";
import { useCallback } from "react";

const MAX_OFFSET_LINES = 2;

type Props = {
  songManager: UseSong;
};

export const Lyrics: FC<Props> = ({ songManager }) => {
  const { lyrics: _lyrics, activeLyricIndex } = songManager;

  const lyrics = _lyrics.slice(
    activeLyricIndex,
    Math.min(_lyrics.length, activeLyricIndex + MAX_OFFSET_LINES + 1)
  );

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
