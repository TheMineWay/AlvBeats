import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import {
  SONG_INDEX_SCHEMA,
  SongIndex,
} from "@features/song/models/song-index.model";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";

const KEY = "song-index";

export const useSongIndex = () => {
  return useConnectorWatch<SongIndex>(
    WebWarehouse.getConnector(LOCAL_STORAGE_CONNECTOR_KEY),
    KEY,
    SONG_INDEX_SCHEMA
  );
};
