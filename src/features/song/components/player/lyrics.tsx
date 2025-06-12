import { cn } from "@/lib/utils";
import { formatDuration } from "@/shared/utils/time/format-duration";
import { UseSong } from "@features/song/hooks/player/use-song";

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
        <Item key={idx} item={item} />
      ))}
    </div>
  );
};

type ItemProps = {
  item: UseSong["lyrics"][number];
};

const Item: FC<ItemProps> = ({ item }) => {
  return (
    <p
      className={cn("text-center", {
        ["font-bold text-xl"]: item.isActive,
      })}
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
