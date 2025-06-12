import { Song } from "@/shared/schemas/song/song.schema";
import { useTimer } from "@/shared/utils/time/use-timer";
import { useMemo } from "react";

export const useSong = (song: Song) => {
  const timer = useTimer({ maxTime: song.metadata.duration });

  const duration = useMemo(() => {
    const maxDuration = song.lyrics.reduce((max, lyric) => {
      const endTime = lyric.endTime ?? Infinity;
      return Math.max(max, endTime);
    }, 0);
    return maxDuration > 0 ? maxDuration : 0;
  }, [song.lyrics]);

  const activeLyricIndex = useMemo(() => {
    if (!song.lyrics || song.lyrics.length === 0) return -1;

    const currentTime = timer.time;
    return song.lyrics.findIndex((lyric) => {
      const startTime = lyric.startTime ?? 0;
      const endTime = lyric.endTime ?? Infinity;
      return currentTime >= startTime && currentTime <= endTime;
    });
  }, [song, timer.time]);

  const lyrics = useMemo(() => {
    if (activeLyricIndex === -1) return [];

    return song.lyrics.map((lyric, index) => ({
      data: lyric,
      isActive: index === activeLyricIndex,
    }));
  }, [activeLyricIndex, song.lyrics]);

  return {
    timer,
    lyrics,
    activeLyricIndex,
    duration,
    song,
  };
};

export type UseSong = ReturnType<typeof useSong>;
