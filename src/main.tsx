import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant.ts";
import {
  LocalStorageConnector,
  WebWarehouse,
} from "@themineway/smart-storage-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

WebWarehouse.setConnector(
  LOCAL_STORAGE_CONNECTOR_KEY,
  new LocalStorageConnector()
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
