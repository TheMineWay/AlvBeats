import { cn } from "@/lib/utils";
import { Song } from "@/shared/schemas/song/song.schema";
import defaultSongCover from "@assets/song/default-song-cover.png";
import { useTranslation } from "@i18n/use-translation";

type SongItemProps = {
  song: Pick<Song, "metadata">;
  hoverable?: boolean;
  className?: string;
  extra?: React.ReactNode;
};

export const SongItem: FC<SongItemProps> = ({
  song,
  hoverable = false,
  className,
  extra,
}) => {
  const { interpolated } = useTranslation("song-search");

  return (
    <div
      className={cn(
        "border rounded flex gap-2 transition-colors w-full",
        {
          "hover:bg-gray-100 cursor-pointer": hoverable,
        },
        className
      )}
    >
      <img
        className="h-18 w-18 rounded-l object-cover"
        alt={interpolated((t) => t.lists["song-results"].item["Cover-alt"], {
          title: song.metadata.name,
        })}
        src={song.metadata.coverUrl ?? defaultSongCover}
      />
      <div className="h-full w-full flex justify-between items-center pl-2">
        <div>
          <h3 className="text-lg font-semibold">{song.metadata.name}</h3>
          <p className="text-sm text-gray-600">{song.metadata.artist}</p>
        </div>
        {extra && <div className="mr-4">{extra}</div>}
      </div>
    </div>
  );
};
