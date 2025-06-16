import { Lyric } from "@/shared/schemas/song/lyrics/lyric.schema";
import { Song } from "@/shared/schemas/song/song.schema";

export const fillSongLyrics = (song: Song): Lyric[] => song.lyrics;
