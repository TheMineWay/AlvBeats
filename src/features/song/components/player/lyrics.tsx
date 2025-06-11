import { cn } from "@/lib/utils";
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
      <b>
        {item.data.startTime}:{item.data.endTime}
      </b>{" "}
      - {item.data.text}
    </p>
  );
};
