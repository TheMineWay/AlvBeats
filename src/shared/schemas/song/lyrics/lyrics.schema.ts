import { z } from "zod";

export const LYRICS_SCHEMA = z.object({});

export type Lyrics = z.infer<typeof LYRICS_SCHEMA>;
