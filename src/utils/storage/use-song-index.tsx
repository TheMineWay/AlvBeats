import { SONG_INDEX_SCHEMA } from "@/models/song/song-index.model";
import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";

const KEY = "song-index";

export const useSongIndex = () => {
  return useConnectorWatch(
    WebWarehouse.getConnector(LOCAL_STORAGE_CONNECTOR_KEY),
    KEY,
    { schema: SONG_INDEX_SCHEMA }
  );
};
