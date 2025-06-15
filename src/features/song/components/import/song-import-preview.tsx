import { Song, SONG_SCHEMA } from "@/shared/schemas/song/song.schema";
import { SONG_INDEX_KEY, useSongIndex } from "@/utils/storage/use-song-index";
import { Button } from "@components/ui/button";
import { SongItem } from "@features/song/components/list/song-item";
import { SONG_INDEX_SCHEMA } from "@features/song/components/models/song-index.model";
import { getStoredSongId } from "@features/song/utils/stored/get-stored-song-id";
import { useTranslation } from "@i18n/use-translation";

type Props = {
  songs: Song[];
  onImported: CallableFunction;
};

export const SongImportPreview: FC<Props> = ({ songs, onImported }) => {
  const { t } = useTranslation("song-import");
  const { value: songIndexValue, connector: songIndexConnector } =
    useSongIndex();

  const onImport = () => {
    const existingSongs = [...(songIndexValue?.songs ?? [])];

    for (const song of songs) {
      const existingCount = existingSongs.filter(
        (s) => s.metadata.name === song.metadata.name
      ).length;

      const id = crypto.randomUUID();

      // Build index object
      const newName =
        song.metadata.name + (existingCount > 0 ? ` (${existingCount})` : "");
      existingSongs.push({
        id,
        metadata: {
          ...song.metadata,
          name: newName,
        },
        addedAt: new Date(),
      });

      // Add song to LS
      const storedSongId = getStoredSongId(id);
      songIndexConnector.set(storedSongId, song, SONG_SCHEMA);
    }

    // Push data to index
    songIndexConnector.set(
      SONG_INDEX_KEY,
      {
        songs: existingSongs,
      },
      SONG_INDEX_SCHEMA
    );

    onImported();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold">{t().importer.preview.Title}</h2>
      <div className="flex flex-col gap-2">
        {songs.map((song) => (
          <SongItem key={song.metadata.name} song={song} />
        ))}
      </div>
      <Button onClick={onImport}>{t().importer.preview.Import}</Button>
    </div>
  );
};
