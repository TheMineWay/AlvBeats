import { Song } from "@/shared/schemas/song/song.schema";
import { useTimer } from "@/shared/utils/time/use-timer";
import { useWakeLock } from "@features/song/hooks/screen/use-wake-lock";
import { useMemo } from "react";

export const useSong = (song: Song) => {
  const timer = useTimer({ maxTime: song.metadata.duration });
  useWakeLock();

  const duration = useMemo(() => {
    const maxDuration = song.lyrics.reduce((max, lyric) => {
      const endTime = lyric.endTime ?? Infinity;
      return Math.max(max, endTime);
    }, 0);
    return maxDuration > 0 ? maxDuration : 0;
  }, [song.lyrics]);

  const activeLyric = useMemo(() => {
    if (!song.lyrics || song.lyrics.length === 0)
      return {
        index: -1,
      };

    const currentTime = timer.time;
    const index = song.lyrics.findIndex((lyric) => {
      const startTime = lyric.startTime ?? 0;
      const endTime = lyric.endTime ?? Infinity;
      return currentTime >= startTime && currentTime <= endTime;
    });

    return {
      index,
      data: index !== -1 ? song.lyrics[index] : undefined,
    };
  }, [song, timer.time]);

  const lyrics = useMemo(() => {
    if (activeLyric.index === -1) return [];

    return song.lyrics.map((lyric, index) => ({
      data: lyric,
      isActive: index === activeLyric.index,
    }));
  }, [activeLyric, song.lyrics]);

  return {
    timer,
    lyrics,
    activeLyric,
    duration,
    song,
  };
};

export type UseSong = ReturnType<typeof useSong>;
