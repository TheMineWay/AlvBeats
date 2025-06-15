import { useConfiguration } from "@/providers/configuration/use-configuration";
import { Song } from "@/shared/schemas/song/song.schema";
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

  return (
    <div className="flex flex-col justify-between items-center w-full min-w-12 h-full py-5">
      <div className="flex flex-col justify-center gap-1 w-full max-w-md">
        {!songManager.wakeLock.isWakeLockSupported && <WakeLockError />}
        <SongItem song={song} className="max-w-md" />
      </div>
      <div className="flex flex-col gap-2 w-full max-w-md">
        {configuration.player.lyricsProgress.showIndicator && (
          <LyricProgress songManager={songManager} />
        )}
        <Lyrics songManager={songManager} />
      </div>
      <PlayerActions songManager={songManager} />
    </div>
  );
};
