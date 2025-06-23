import { Song, SONG_SCHEMA } from "@/shared/schemas/song/song.schema";
import { Button } from "@components/ui/button";
import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import { Player } from "@features/players/player/player";
import { getStoredSongId } from "@features/song/utils/stored/get-stored-song-id";
import { useTranslation } from "@i18n/use-translation";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  LocalStorageConnector,
  WebWarehouse,
} from "@themineway/smart-storage-js";

export const Route = createFileRoute("/players/player/$song-id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation("song-player");
  const { t: commonT } = useTranslation("common");

  const { "song-id": songId } = useParams({
    from: "/players/player/$song-id",
  });

  const lsConnector: LocalStorageConnector = WebWarehouse.getConnector(
    LOCAL_STORAGE_CONNECTOR_KEY
  );
  const song = lsConnector.get<Song>(getStoredSongId(songId), SONG_SCHEMA);

  if (!song) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl">{t().states["not-found"].Title}</h1>
          <Link to="/">
            <Button>{commonT().sentences["Back-home"]}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-4">
      <Player song={song} />
    </div>
  );
}
