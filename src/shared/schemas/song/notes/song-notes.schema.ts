import { z } from "zod";

export const SONG_NOTES_SCHEMA = z.object({
  note: z.string().nonempty().max(16).min(1),
  startsAt: z.number().nonnegative(),
  endsAt: z.number().nonnegative(),
});

export type SongNotes = z.infer<typeof SONG_NOTES_SCHEMA>;
