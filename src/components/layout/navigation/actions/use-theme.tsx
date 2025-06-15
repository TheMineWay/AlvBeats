import { useConfiguration } from "@/providers/configuration/use-configuration";
import { THEMES } from "@constants/theme/themes.constant";
import { z } from "zod";

type Theme = z.infer<typeof THEME_SCHEMA>;

export const THEME_SCHEMA = z.object({
  theme: z.enum(THEMES).nullable().default(null),
  dark: z.boolean().default(false),
});

export const useTheme = () => {
  const {
    configuration: { theme, ...restConfig },
    setConfiguration,
  } = useConfiguration();

  const setTheme = (newTheme: Partial<Theme>) => {
    const newConfig = {
      ...restConfig,
      theme: {
        ...theme,
        ...newTheme,
      },
    };

    setConfiguration(newConfig);
  };

  return {
    theme,
    setTheme,
    applyTheme: () => applyTheme(theme ?? {}),
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
