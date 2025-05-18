import { storedSongSearcher } from "@/utils/search/strategies/song-metadata-searcher.util";
import { useSearch } from "@/utils/search/use-search";
import { useSongIndex } from "@/utils/storage/use-song-index";
import { SongList } from "@components/songs/list/song-list";
import { SongSearch } from "@components/songs/search/song-search";

export const StoredSongSearch: FC = () => {
  const { value: indexData } = useSongIndex();
  const max = indexData?.songs ?? [];

  const { results, setQuery, query } = useSearch(max, {
    searchMethod: storedSongSearcher,
  });

  return (
    <div className="flex flex-col gap-2">
      <SongSearch search={query} setSearch={setQuery} />
      <SongList />
    </div>
  );
};
