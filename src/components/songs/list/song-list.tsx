import { StoredSong } from "@/models/song/stored-song.model";

type Props = {
  songs: StoredSong[];
};

export const SongList: FC<Props> = ({ songs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {songs.map((song) => (
        <div
          key={song.id}
          className="p-2 border rounded hover:bg-gray-100 flex gap-2 cursor-pointer transition-colors"
        >
          <img
            className="w-12"
            alt="cover"
            src={song.metadata.coverUrl ?? ""}
          />
          <div className="h-full flex flex-col">
            <h3 className="text-lg font-semibold">{song.metadata.name}</h3>
            <p className="text-sm text-gray-600">{song.metadata.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
