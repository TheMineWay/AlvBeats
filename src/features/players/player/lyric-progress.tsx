import { Progress } from "@components/ui/progress";
import { UseSong } from "@features/song/hooks/player/use-song";
import { useMemo } from "react";

type Props = {
  songManager: UseSong;
};

export const LyricsLineProgress: FC<Props> = ({ songManager }) => {
  const line = songManager.activeLine.data;

  const progress = useMemo(() => {
    if (!line) return 0;

    const { startTime, endTime } = line;
    const max = (endTime ?? songManager.song.metadata.duration) - startTime;

    const progress = songManager.timer.time - startTime;

    return (progress * 100) / max;
  }, [line, songManager.song.metadata.duration, songManager.timer.time]);

  return <Progress value={progress} className="w-full h-2 rounded" />;
};
