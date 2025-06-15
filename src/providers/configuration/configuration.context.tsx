import { THEME_SCHEMA } from "@components/layout/navigation/actions/use-theme";
import { createContext } from "react";
import { z } from "zod";

export const CONFIGURATION_SCHEMA = z.object({
  player: z.object({
    wakeLock: z.boolean().default(true), // Enable wake lock to prevent screen from turning off during playback

    lyricsOffset: z.object({
      posterior: z.number().min(0).max(3).default(2), // Offset for lyrics after the current lyric
      anterior: z.number().min(0).max(3).default(0), // Offset for lyrics before the current lyric
    }),
    lyricsTimestamps: z.object({
      showStart: z.boolean().default(false), // Show start timestamps for lyrics
      showEnd: z.boolean().default(false), // Show end timestamps for lyrics
    }),
    lyricsProgress: z.object({
      showIndicator: z.boolean().default(true), // Show progress indicator for active lyrics
    }),
  }),
  theme: THEME_SCHEMA,
});

export type Configuration = z.infer<typeof CONFIGURATION_SCHEMA>;

export const DEFAULT_CONFIGURATION: Configuration = {
  player: {
    wakeLock: true,
    lyricsOffset: {
      posterior: 2,
      anterior: 0,
    },
    lyricsTimestamps: {
      showStart: false,
      showEnd: false,
    },
    lyricsProgress: {
      showIndicator: true,
    },
  },
  theme: {
    theme: null,
    dark: false,
  },
};

export const ConfigurationContext = createContext<{
  configuration: Configuration;
  setConfiguration: (configuration: Configuration) => void;
}>(null!);
