import { LYRICS_LINE } from "@/shared/schemas/song/lyrics/lyrics-line.schema";
import { SONG_METADATA_SCHEMA } from "@/shared/schemas/song/metadata/song-metadata.schema";
import { SONG_NOTES_SCHEMA } from "@/shared/schemas/song/notes/song-notes.schema";
import { z } from "zod";

export const SONG_SCHEMA = z.object({
  version: z.literal(1).default(1),
  metadata: SONG_METADATA_SCHEMA,
  lyrics: z.array(LYRICS_LINE).default([]),
  notes: z.array(SONG_NOTES_SCHEMA).default([]),
});

export type Song = z.infer<typeof SONG_SCHEMA>;
