import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import {
  SONG_INDEX_SCHEMA,
  SongIndex,
} from "@features/song/components/models/song-index.model";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";

export const SONG_INDEX_KEY = "song-index";

export const useSongIndex = () => {
  return useConnectorWatch<SongIndex>(
    WebWarehouse.getConnector(LOCAL_STORAGE_CONNECTOR_KEY),
    SONG_INDEX_KEY,
    SONG_INDEX_SCHEMA
  );
};
