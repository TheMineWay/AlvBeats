import { Song, SONG_SCHEMA } from "@/shared/schemas/song/song.schema";
import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import { LyricsScriptPlayer } from "@features/lyrics-script/components/lyrics-script-player";
import { getStoredSongId } from "@features/song/utils/stored/get-stored-song-id";
import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  LocalStorageConnector,
  WebWarehouse,
} from "@themineway/smart-storage-js";

export const Route = createFileRoute("/players/script/$song-id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { "song-id": songId } = useParams({
    from: "/players/script/$song-id",
  });

  const lsConnector: LocalStorageConnector = WebWarehouse.getConnector(
    LOCAL_STORAGE_CONNECTOR_KEY
  );
  const song = lsConnector.get<Song>(getStoredSongId(songId), SONG_SCHEMA);

  if (!song) return "ERR";

  return <LyricsScriptPlayer song={song} />;
}
