import { Song, SONG_SCHEMA } from "@/shared/schemas/song/song.schema";
import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  LocalStorageConnector,
  WebWarehouse,
} from "@themineway/smart-storage-js";

export const Route = createFileRoute("/player/$song-id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { "song-id": songId } = useParams({
    from: "/player/$song-id",
  });

  const lsConnector: LocalStorageConnector = WebWarehouse.getConnector(
    LOCAL_STORAGE_CONNECTOR_KEY
  );
  const song = lsConnector.get<Song>(songId, SONG_SCHEMA);

  if (!song) {
    return <div>Song not found</div>;
  }

  return <div>{song?.metadata.name}</div>;
}
