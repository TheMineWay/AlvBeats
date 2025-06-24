import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { UseScriptPlayer } from "@features/players/lyrics-script/hooks/use-script-player";
import { useTranslation } from "@i18n/use-translation";
import { Pause, Play } from "lucide-react";
import { useId } from "react";

type Props = {
  manager: UseScriptPlayer;
};

export const ScriptPlayerActions: FC<Props> = ({ manager }) => {
  const { isPlaying, play, pause } = manager;

  return (
    <div className="flex gap-4 items-center justify-center w-full">
      {isPlaying ? (
        <Button onClick={pause}>
          <Pause />
        </Button>
      ) : (
        <Button onClick={play}>
          <Play />
        </Button>
      )}
      <SpeedInput manager={manager} />
    </div>
  );
};

type SpeedInputProps = {
  manager: UseScriptPlayer;
};

const SpeedInput: FC<SpeedInputProps> = ({ manager }) => {
  const { t } = useTranslation("song-script-player");
  const id = useId();

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor={id}>{t().actions.speed.Label}</label>
      <Input
        value={manager.speed}
        onChange={(v) => {
          const val = v.target.valueAsNumber;
          if (!isNaN(val) && val > 0) {
            manager.setSpeed(val);
          } else {
            manager.setSpeed(0);
          }
        }}
        type="number"
        id={id}
        className="w-20 text-center"
      />
    </div>
  );
};
