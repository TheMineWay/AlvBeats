import { Song } from "@/shared/schemas/song/song.schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { SongUploadImport } from "@features/song/components/import/modes/song-upload-import";
import { useTranslation } from "@i18n/use-translation";
import { useState } from "react";

const TABS = {
  upload: "upload",
  url: "url",
} satisfies Record<string, string>;

type Props = {
  onImported: CallableFunction;
};

export const SongImport: FC<Props> = ({ onImported }) => {
  const { t } = useTranslation("song-import");
  const [songs, setSongs] = useState<Song[]>([]);

  return (
    <Tabs defaultValue={TABS.upload} className="w-full">
      <TabsList>
        <TabsTrigger value={TABS.upload} disabled={songs.length > 0}>
          {t().importer.modes.upload.Title}
        </TabsTrigger>
        <TabsTrigger value={TABS.url} disabled={songs.length > 0}>
          {t().importer.modes.url.Title}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TABS.upload}>
        <SongUploadImport
          songs={songs}
          setSongs={setSongs}
          onImported={onImported}
        />
      </TabsContent>
      <TabsContent value={TABS.url}>
        <p>Import from URL is not yet implemented.</p>
      </TabsContent>
    </Tabs>
  );
};
