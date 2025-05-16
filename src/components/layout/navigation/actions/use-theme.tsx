import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import { THEMES } from "@constants/theme/themes.constant";
import {
  type LocalStorageConnector,
  WebWarehouse,
} from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";
import { useEffect } from "react";
import { z } from "zod";

const C: LocalStorageConnector = WebWarehouse.getConnector(
  LOCAL_STORAGE_CONNECTOR_KEY
);

export const useTheme = () => {
  const { value: theme } = useConnectorWatch(C, "theme", {
    schema: THEME_SCHEMA,
  });

  useEffect(() => {
    applyTheme(theme?.theme);
  }, [theme]);

  const setTheme = (value: string) => {
    C.set("theme", { theme: value }, THEME_SCHEMA);
    applyTheme(value as (typeof THEMES)[number]);
  };

  return {
    theme,
    setTheme,
  };
};

/* Internal */

const THEME_SCHEMA = z.object({
  theme: z.enum(THEMES).nullable().default(null),
});

const applyTheme = (theme?: (typeof THEMES)[number] | null) => {
  if (theme) {
    if (theme === "default") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", theme);
    }
  }
};
