import { Song } from "@/shared/schemas/song/song.schema";
import { useTimer } from "@/shared/utils/timer/use-timer";
import { useMemo } from "react";

export const useSong = (song: Song) => {
  const timer = useTimer();

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
  };
};

export type UseSong = ReturnType<typeof useSong>;
