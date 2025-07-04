import { STORED_SONG_SCHEMA } from "@features/song/components/models/stored-song.model";
import { z } from "zod";

export const SONG_INDEX_SCHEMA = z.object({
  songs: z.array(STORED_SONG_SCHEMA),
});

export type SongIndex = z.infer<typeof SONG_INDEX_SCHEMA>;
