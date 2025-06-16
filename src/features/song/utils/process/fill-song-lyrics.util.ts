import {
  LyricSegmentType,
  type Lyric,
} from "@/shared/schemas/song/lyrics/lyric.schema";
import type { Song } from "@/shared/schemas/song/song.schema";

export const fillSongLyrics = (song: Song): Lyric[] => {
  const lyrics = [...song.lyrics].sort((a, b) => a.startTime - b.startTime);
  const toAppend: Lyric[] = [];

  let currentTime = 0;

  for (const lyric of lyrics) {
    if (lyric.startTime > currentTime) {
      toAppend.push({
        type: LyricSegmentType.MUSIC,
        startTime: currentTime,
        endTime: lyric.startTime,
      });
    }

    currentTime = lyric.endTime ?? song.metadata.duration;
  }

  return [...lyrics, ...toAppend].sort((a, b) => a.startTime - b.startTime);
};
