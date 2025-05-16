import { z } from "zod";

export const SONG_METADATA_SCHEMA = z.object({
  name: z.string().nonempty().max(128),
  artist: z.string().max(128).nullable().default(null),
  album: z.string().max(128).nullable().default(null),
  duration: z.number().nonnegative(),
  genre: z.string().max(32).nullable().default(null),
  coverUrl: z.string().url().max(256).nullable().default(null),
});

export type SongMetadata = z.infer<typeof SONG_METADATA_SCHEMA>;
