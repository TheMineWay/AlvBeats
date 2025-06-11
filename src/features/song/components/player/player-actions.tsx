import { Button } from "@components/ui/button";
import { UseSong } from "@features/song/hooks/player/use-song";
import { useTranslation } from "@i18n/use-translation";

type Props = {
  songManager: UseSong;
};

export const PlayerActions: FC<Props> = ({ songManager }) => {
  const { timer } = songManager;
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="flex gap-2">
        {timer.isRunning ? (
          <Button aria-label={t().words.Pause} onClick={timer.pause}>
            Pause
          </Button>
        ) : (
          <Button aria-label={t().words.Play} onClick={timer.play}>
            Play
          </Button>
        )}
        <Button aria-label={t().words.Stop} onClick={timer.stop}>
          Stop
        </Button>
      </div>
      <small>{timer.time}</small>
    </div>
  );
};
