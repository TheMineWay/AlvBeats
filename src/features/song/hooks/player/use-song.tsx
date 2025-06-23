import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
import { useTimer } from "@/shared/utils/time/use-timer";
import { useWakeLock } from "@features/song/hooks/screen/use-wake-lock";
import { prepareSong } from "@features/song/utils/process/prepare-song.util";
import { useMemo } from "react";

export const useSong = (song: Song) => {
  const { lyrics: songLyrics } = useMemo(() => prepareSong(song), [song]);

  const timer = useTimer({ maxTime: song.metadata.duration });
  const {
    configuration: { player: playerConfig },
  } = useConfiguration();
  const wakeLock = useWakeLock({ disabled: !playerConfig.wakeLock });

  const duration = useMemo(() => {
    const maxDuration = songLyrics.reduce((max, lyric) => {
      const endTime = lyric.endTime ?? Infinity;
      return Math.max(max, endTime);
    }, 0);
    return maxDuration > 0 ? maxDuration : 0;
  }, [songLyrics]);

  const activeLine = useMemo(() => {
    if (!songLyrics || songLyrics.length === 0)
      return {
        index: -1,
      };

    const currentTime = timer.time;
    const index = songLyrics.findIndex((lyric) => {
      const startTime = lyric.startTime ?? 0;
      const endTime = lyric.endTime ?? Infinity;
      return currentTime >= startTime && currentTime <= endTime;
    });

    return {
      index,
      data: index !== -1 ? songLyrics[index] : undefined,
    };
  }, [song, timer.time]);

  const lyrics = useMemo(() => {
    if (activeLine.index === -1) return [];

    return songLyrics.map((lyric, index) => ({
      data: lyric,
      isActive: index === activeLine.index,
    }));
  }, [activeLine, songLyrics]);

  return {
    timer,
    lyrics,
    activeLine,
    duration,
    song,
    wakeLock,
  };
};

export type UseSong = ReturnType<typeof useSong>;
