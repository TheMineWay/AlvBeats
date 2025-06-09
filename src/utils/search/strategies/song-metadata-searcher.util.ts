import { StoredSong } from "@/models/song/stored-song.model";
import { SearchMethod } from "@/utils/search/use-search";

export const storedSongSearcher: SearchMethod<StoredSong> = (
  query,
  original
) => {
  return original.filter((song) =>
    song.metadata.name.toLowerCase().includes(query.toLowerCase())
  );
};
