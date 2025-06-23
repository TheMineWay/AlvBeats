import {
  LyricsLineSegmentType,
  type LyricsLine,
} from "@/shared/schemas/song/lyrics/lyrics-line.schema";
import type { Song } from "@/shared/schemas/song/song.schema";

export const fillSongLyrics = (song: Song): LyricsLine[] => {
  const lyrics = [...song.lyrics].sort((a, b) => a.startTime - b.startTime);
  const toAppend: LyricsLine[] = [];

  let currentTime = 0;

  for (const line of lyrics) {
    if (line.startTime > currentTime) {
      toAppend.push({
        type: LyricsLineSegmentType.MUSIC,
        startTime: currentTime,
        endTime: line.startTime,
      });
    }

    currentTime = line.endTime ?? song.metadata.duration;
  }

  if (currentTime < song.metadata.duration) {
    toAppend.push({
      type: LyricsLineSegmentType.MUSIC,
      startTime: currentTime,
      endTime: song.metadata.duration,
    });
  }

  return [...lyrics, ...toAppend].sort((a, b) => a.startTime - b.startTime);
};
