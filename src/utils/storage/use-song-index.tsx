import { SONG_INDEX_SCHEMA, SongIndex } from "@/models/song/song-index.model";
import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";
import { ZodSchema } from "zod";

const KEY = "song-index";

const schema: ZodSchema = SONG_INDEX_SCHEMA;

export const useSongIndex = () => {
  return useConnectorWatch<SongIndex>(
    WebWarehouse.getConnector(LOCAL_STORAGE_CONNECTOR_KEY),
    KEY,
    { schema }
  );
};
