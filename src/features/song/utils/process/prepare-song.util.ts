import { Song } from "@/shared/schemas/song/song.schema";
import { fillSongLyrics } from "@features/song/utils/process/fill-song-lyrics.util";

/**
 * Transform song so it is ready to be used in the player.
 *  */
export const prepareSong = (song: Song): Song => {
  return {
    ...song,
    lyrics: fillSongLyrics(song),
  };
};
