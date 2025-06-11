import defaultSongCover from "@assets/song/default-song-cover.png";
import { StoredSong } from "@features/song/models/stored-song.model";
import { useTranslation } from "@i18n/use-translation";
import { Link } from "@tanstack/react-router";

type Props = {
  songs: StoredSong[];
};

export const SongList: FC<Props> = ({ songs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 h-18">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
};

type SongItemProps = {
  song: StoredSong;
};

const SongItem: FC<SongItemProps> = ({ song }) => {
  const { interpolated } = useTranslation("song-search");

  return (
    <Link
      to="/player/$song-id"
      params={{ "song-id": song.id }}
      className="border rounded hover:bg-gray-100 flex gap-2 cursor-pointer transition-colors"
    >
      <img
        className="h-18 w-18 rounded-l object-cover"
        alt={interpolated((t) => t.lists["song-results"].item["Cover-alt"], {
          title: song.metadata.name,
        })}
        src={song.metadata.coverUrl ?? defaultSongCover}
      />
      <div className="h-full flex flex-col justify-center pl-2">
        <h3 className="text-lg font-semibold">{song.metadata.name}</h3>
        <p className="text-sm text-gray-600">{song.metadata.artist}</p>
      </div>
    </Link>
  );
};
