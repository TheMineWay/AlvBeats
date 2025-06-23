import { THEME_SCHEMA } from "@components/layout/navigation/actions/use-theme";
import { createContext } from "react";
import { z } from "zod";

export enum TextAlign {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export enum TextFont {
  ARIAL = "Arial",
  VERDANA = "Verdana",
  TIMES_NEW_ROMAN = "Times New Roman",
}

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
  lyrics: z.object({
    fontSize: z.number().min(10).max(32).default(8),
    fontFamily: z
      .enum([TextFont.ARIAL, TextFont.TIMES_NEW_ROMAN, TextFont.VERDANA])
      .default(TextFont.ARIAL),
    align: z
      .enum([TextAlign.LEFT, TextAlign.CENTER, TextAlign.RIGHT])
      .default(TextAlign.CENTER),
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
  lyrics: {
    fontSize: 15,
    fontFamily: TextFont.ARIAL,
    align: TextAlign.CENTER,
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
