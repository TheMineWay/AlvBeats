import { Button } from "@components/ui/button";
import { SongItem } from "@features/song/components/list/song-item";
import { StoredSong } from "@features/song/components/models/stored-song.model";
import { Link } from "@tanstack/react-router";
import { Play, ScrollText } from "lucide-react";

type Props = {
  songs: StoredSong[];
};

export const SongList: FC<Props> = ({ songs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 h-18">
      {songs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          hoverable
          extra={
            <div className="flex gap-2">
              <ScriptPlayer song={song} />
              <Player song={song} />
            </div>
          }
        />
      ))}
    </div>
  );
};

/* Actions */

type PlayerProps = {
  song: StoredSong;
};

const Player: FC<PlayerProps> = ({ song }) => {
  return (
    <Link to="/players/player/$song-id" params={{ "song-id": song.id }}>
      <Button>
        <Play />
      </Button>
    </Link>
  );
};

type ScriptPlayerProps = {
  song: StoredSong;
};

const ScriptPlayer: FC<ScriptPlayerProps> = ({ song }) => {
  return (
    <Link to="/players/script/$song-id" params={{ "song-id": song.id }}>
      <Button variant="secondary">
        <ScrollText />
      </Button>
    </Link>
  );
};
