import { z } from "zod";

const LYRIC_SEGMENT = z.object({
  text: z.string().nonempty().max(128),
});

export const LYRIC = z.object({
  segments: z.array(LYRIC_SEGMENT).max(64).min(1).nonempty(),
  startTime: z.number().int().nonnegative(), // In milliseconds
  endTime: z.number().int().nullable().default(null), // In milliseconds, null if the lyric is ongoing
  by: z.string().nullable().default(null),
});

export type Lyric = z.infer<typeof LYRIC>;
