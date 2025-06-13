import { Song } from "@/shared/schemas/song/song.schema";
import { SongItem } from "@features/song/components/list/song-item";
import { LyricProgress } from "@features/song/components/player/lyric-progress";
import { Lyrics } from "@features/song/components/player/lyrics";
import { PlayerActions } from "@features/song/components/player/player-actions";
import { useSong } from "@features/song/hooks/player/use-song";

type Props = {
  song: Song;
};

export const Player: FC<Props> = ({ song }) => {
  const songManager = useSong(song);

  return (
    <div className="flex flex-col justify-between items-center w-full min-w-12 h-full py-5">
      <SongItem song={song} />
      <div className="flex flex-col gap-2 w-full max-w-md">
        <LyricProgress songManager={songManager} />
        <Lyrics songManager={songManager} />
      </div>
      <PlayerActions songManager={songManager} />
    </div>
  );
};
