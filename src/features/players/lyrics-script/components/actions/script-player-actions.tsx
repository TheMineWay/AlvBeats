import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { UseScriptPlayer } from "@features/players/lyrics-script/hooks/use-script-player";
import { Pause, Play } from "lucide-react";
import { useId } from "react";

type Props = {
  manager: UseScriptPlayer;
};

export const ScriptPlayerActions: FC<Props> = ({ manager }) => {
  const { isPlaying, play, pause } = manager;

  return (
    <div className="flex gap-2 items-center justify-center w-full">
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
  const id = useId();

  return (
    <div>
      <label htmlFor={id}></label>
      <Input
        value={manager.speedMultiplier}
        onChange={(v) => manager.setSpeedMultiplier(+v)}
        type="number"
        id={id}
      />
    </div>
  );
};
