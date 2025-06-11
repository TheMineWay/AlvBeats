import { SongItem } from "@features/song/components/list/song-item";
import { StoredSong } from "@features/song/components/models/stored-song.model";
import { Link } from "@tanstack/react-router";

type Props = {
  songs: StoredSong[];
};

export const SongList: FC<Props> = ({ songs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 h-18">
      {songs.map((song) => (
        <Link
          key={song.id}
          to="/player/$song-id"
          params={{ "song-id": song.id }}
        >
          <SongItem song={song} />
        </Link>
      ))}
    </div>
  );
};
