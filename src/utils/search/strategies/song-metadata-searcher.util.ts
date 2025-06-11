import { SearchMethod } from "@/utils/search/use-search";
import { StoredSong } from "@features/song/models/stored-song.model";

export const storedSongSearcher: SearchMethod<StoredSong> = (
  query,
  original
) => {
  return original.filter((song) =>
    song.metadata.name.toLowerCase().includes(query.toLowerCase())
  );
};
