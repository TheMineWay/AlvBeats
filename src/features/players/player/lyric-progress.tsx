import { Progress } from "@components/ui/progress";
import { UseSong } from "@features/song/hooks/player/use-song";
import { useMemo } from "react";

type Props = {
  songManager: UseSong;
};

export const LyricProgress: FC<Props> = ({ songManager }) => {
  const lyric = songManager.activeLyric.data;

  const progress = useMemo(() => {
    if (!lyric) return 0;

    const { startTime, endTime } = lyric;
    const max = (endTime ?? songManager.song.metadata.duration) - startTime;

    const progress = songManager.timer.time - startTime;

    return (progress * 100) / max;
  }, [lyric, songManager.song.metadata.duration, songManager.timer.time]);

  return <Progress value={progress} className="w-full h-2 rounded" />;
};
