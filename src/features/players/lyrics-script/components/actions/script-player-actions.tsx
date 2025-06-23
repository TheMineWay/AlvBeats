import { Button } from "@components/ui/button";
import { UseScriptPlayer } from "@features/players/lyrics-script/hooks/use-script-player";
import { Play } from "lucide-react";

type Props = {
  manager: UseScriptPlayer;
};

export const ScriptPlayerActions: FC<Props> = ({ manager }) => {
  return (
    <div className="flex gap-2 items-center justify-center w-full">
      <Button>
        <Play />
      </Button>
    </div>
  );
};
