import { z } from "zod";

export const LYRIC_SEGMENT_SCHEMA = z.object({
  text: z.string().nonempty().max(512),
  startTime: z.number().int().nonnegative(),
  endTime: z.number().int().nullable().default(null),
});

export type LyricSegment = z.infer<typeof LYRIC_SEGMENT_SCHEMA>;
