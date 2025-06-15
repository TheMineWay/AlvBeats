import { Song, SONG_SCHEMA } from "@/shared/schemas/song/song.schema";
import { FileUpload } from "@components/form/file-upload/file-upload";
import { useFileUpload } from "@components/form/file-upload/use-file-upload";
import { SongImportPreview } from "@features/song/components/import/song-import-preview";
import { useTranslation } from "@i18n/use-translation";
import { useEffect, useState } from "react";

const ACCEPTED_FORMATS: string[] = ["ab-song"];

enum State {
  ERROR = "error",
  OK = "ok",
  PROCESSING = "processing",
}

type Props = {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  onImported: CallableFunction;
};

export const SongUploadImport: FC<Props> = ({
  songs,
  setSongs,
  onImported,
}) => {
  const fileManager = useFileUpload({ acceptedFormats: ACCEPTED_FORMATS });

  const [state, setState] = useState<State>();
  const { t } = useTranslation("song-import");

  useEffect(() => {
    if (fileManager.files.length > 0) setState(State.PROCESSING);
    Promise.all(
      fileManager.files.map(async (file) => {
        const content = await file.text();
        const parsedSong = SONG_SCHEMA.safeParse(JSON.parse(content));
        if (parsedSong.success) {
          return parsedSong.data;
        } else throw new Error("Invalid song format");
      })
    )
      .then((results) => {
        const validSongs = results.filter(Boolean);
        setSongs(validSongs);
        setState(State.OK);
      })
      .catch(() => {
        setState(State.ERROR);
      });
  }, [fileManager.files]);

  if (songs.length > 0) {
    return <SongImportPreview songs={songs} onImported={onImported} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <FileUpload loading={state === State.PROCESSING} manager={fileManager} />
      {state === State.ERROR && (
        <p className="text-red-500">{t().importer.Error}</p>
      )}
    </div>
  );
};
