import { storedSongSearcher } from "@/utils/search/strategies/song-metadata-searcher.util";
import { useSearch } from "@/utils/search/use-search";
import { useSongIndex } from "@/utils/storage/use-song-index";
import { SongList } from "@features/song/components/list/song-list";
import { SongSearch } from "@features/song/components/search/song-search";

export const StoredSongSearch: FC = () => {
  const { value: indexData } = useSongIndex();

  const { results, setQuery, query } = useSearch(indexData?.songs ?? [], {
    searchMethod: storedSongSearcher,
  });

  return (
    <div className="flex flex-col gap-4">
      <SongSearch search={query} setSearch={setQuery} />
      <SongList songs={results} />
    </div>
  );
};
