import { Button } from "@components/ui/button";
import { UseScriptPlayer } from "@features/players/lyrics-script/hooks/use-script-player";
import { Pause, Play } from "lucide-react";

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
    </div>
  );
};
