import { z } from "zod";

const LYRICS_LINE_SEGMENT = z.object({
  text: z.string().nonempty().max(128),
});

export enum LyricsLineSegmentType {
  TEXT = "text",
  MUSIC = "music",
}

const BASE_SCHEMA = z.object({
  startTime: z.number().int().nonnegative(), // In milliseconds
  endTime: z.number().int().nullable().default(null), // In milliseconds, null if the line is ongoing
});

/* Types */

const LYRICS_LINE_TEXT = BASE_SCHEMA.extend({
  segments: z.array(LYRICS_LINE_SEGMENT).max(64).min(1).nonempty(),
  by: z.string().nullable().default(null),
  type: z.literal(LyricsLineSegmentType.TEXT),
});

const LYRIC_MUSIC = BASE_SCHEMA.extend({
  type: z.literal(LyricsLineSegmentType.MUSIC),
});

/* Schema */

export const LYRICS_LINE = z.discriminatedUnion("type", [
  LYRICS_LINE_TEXT,
  LYRIC_MUSIC,
]);

export type LyricsLine = z.infer<typeof LYRICS_LINE>;
