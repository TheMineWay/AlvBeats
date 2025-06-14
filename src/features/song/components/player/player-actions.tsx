import { formatDuration } from "@/shared/utils/time/format-duration";
import { Button } from "@components/ui/button";
import { Slider } from "@components/ui/slider";
import { UseSong } from "@features/song/hooks/player/use-song";
import { useTranslation } from "@i18n/use-translation";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

type Props = {
  songManager: UseSong;
};

export const PlayerActions: FC<Props> = ({ songManager }) => {
  const { timer } = songManager;
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full max-w-sm">
      <div className="flex gap-2">
        {timer.isRunning ? (
          <Button aria-label={t().words.Pause} onClick={timer.pause}>
            <PauseIcon />
          </Button>
        ) : (
          <Button aria-label={t().words.Play} onClick={timer.play}>
            <PlayArrowIcon />
          </Button>
        )}
        <Button aria-label={t().words.Stop} onClick={timer.stop}>
          <StopIcon />
        </Button>
      </div>
      <TimeBar songManager={songManager} />
    </div>
  );
};

type TimeBarProps = {
  songManager: UseSong;
};

const TimeBar: FC<TimeBarProps> = ({ songManager: { timer, song } }) => {
  return (
    <div className="flex gap-2 w-full">
      <Slider
        onValueChange={([v]) => timer.setTime(v)}
        value={[timer.time]}
        max={song.metadata.duration}
      />
      <p>{formatDuration(timer.time)}</p>
    </div>
  );
};
