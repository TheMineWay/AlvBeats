import { cn } from "@/lib/utils";
import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
import { useScreen } from "@/utils/screen/use-screen";
import { SongItem } from "@features/song/components/list/song-item";
import { WakeLockError } from "@features/song/components/player/alerts/wake-lock-error";
import { LyricProgress } from "@features/song/components/player/lyric-progress";
import { Lyrics } from "@features/song/components/player/lyrics";
import { PlayerActions } from "@features/song/components/player/player-actions";
import { useSong } from "@features/song/hooks/player/use-song";

type Props = {
  song: Song;
};

export const Player: FC<Props> = ({ song }) => {
  const songManager = useSong(song);
  const { configuration } = useConfiguration();
  const screen = useScreen();

  return (
    <div className="flex flex-col justify-between items-center w-full min-w-12 h-full pt-6 pb-10">
      <div className="flex flex-col justify-center gap-1 w-full max-w-md">
        {!songManager.wakeLock.isWakeLockSupported && <WakeLockError />}
        <SongItem
          song={song}
          className={cn("max-w-md", {
            ["hidden"]: screen.height < 600,
          })}
        />
      </div>
      <div className="flex flex-col gap-2 w-full max-w-xl">
        {configuration.player.lyricsProgress.showIndicator && (
          <LyricProgress songManager={songManager} />
        )}
        <Lyrics songManager={songManager} />
      </div>
      <PlayerActions songManager={songManager} />
    </div>
  );
};
