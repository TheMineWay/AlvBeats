import { SONG_METADATA_SCHEMA } from "@/shared/schemas/song/metadata/song-metadata.schema";
import { isDate } from "lodash";
import { z } from "zod";

export const STORED_SONG_SCHEMA = z.object({
  id: z.string(),
  metadata: SONG_METADATA_SCHEMA,
  addedAt: z
    .string()
    .or(z.date())
    .refine((val) => (isDate(val) ? val : !isNaN(Date.parse(val))))
    .transform((val) => new Date(val))
    .default(new Date().toString()),
});

export type StoredSong = z.infer<typeof STORED_SONG_SCHEMA>;
