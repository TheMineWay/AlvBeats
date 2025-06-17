import { z } from "zod";

const LYRIC_SEGMENT = z.object({
  text: z.string().nonempty().max(128),
});

export enum LyricSegmentType {
  TEXT = "text",
  MUSIC = "music",
}

const BASE_SCHEMA = z.object({
  startTime: z.number().int().nonnegative(), // In milliseconds
  endTime: z.number().int().nullable().default(null), // In milliseconds, null if the lyric is ongoing
});

/* Types */

const LYRIC_TEXT = BASE_SCHEMA.extend({
  segments: z.array(LYRIC_SEGMENT).max(64).min(1).nonempty(),
  by: z.string().nullable().default(null),
  type: z.literal(LyricSegmentType.TEXT),
});

const LYRIC_MUSIC = BASE_SCHEMA.extend({
  type: z.literal(LyricSegmentType.MUSIC),
});

/* Schema */

export const LYRIC = z.discriminatedUnion("type", [LYRIC_TEXT, LYRIC_MUSIC]);

export type Lyric = z.infer<typeof LYRIC>;
