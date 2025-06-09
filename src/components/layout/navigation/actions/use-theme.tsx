import { LOCAL_STORAGE_CONNECTOR_KEY } from "@constants/storage/storage-services.constant";
import { THEMES } from "@constants/theme/themes.constant";
import { WebWarehouse } from "@themineway/smart-storage-js";
import { useConnectorWatch } from "@themineway/smart-storage-react";
import { z } from "zod";

type Theme = z.infer<typeof THEME_SCHEMA>;

const THEME_SCHEMA = z.object({
  theme: z.enum(THEMES).nullable().default(null),
  dark: z.boolean().default(false),
});

export const useTheme = () => {
  const { value: theme, connector } = useConnectorWatch<Theme>(
    WebWarehouse.getConnector(LOCAL_STORAGE_CONNECTOR_KEY),
    "theme",
    THEME_SCHEMA,
    {
      onChange: (theme) => {
        if (theme) applyTheme(theme);
      },
    }
  );

  const setTheme = (newTheme: Partial<Theme>) => {
    connector.set("theme", { ...theme, ...newTheme }, THEME_SCHEMA);
  };

  return {
    theme,
    setTheme,
  };
};

/* Internal */

const applyTheme = (theme: Partial<Theme>) => {
  if (theme.theme) {
    if (theme.theme === "default") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", theme.theme);
    }
  }

  if (theme.dark) {
    document.body.setAttribute("data-dark", "true");
  } else {
    document.body.removeAttribute("data-dark");
  }
};
