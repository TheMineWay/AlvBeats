import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import {
  LocalStorageConnector,
  WebWarehouse,
} from "@themineway/smart-storage-js";

export const mainStorage: LocalStorageConnector = WebWarehouse.getConnector(
  LOCAL_STORAGE_CONNECTOR_KEY
);
